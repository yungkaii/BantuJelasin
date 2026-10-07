import type {
  KeyPoint,
  SimplificationLevel,
  SimplifyResult,
  TermExplanation,
} from '../../types'
import { calculateTextDifficulty } from './heuristics'

interface FreeAiResponseShape {
  tingkat_teks_asli?: 'Mudah' | 'Sedang' | 'Rumit' | 'Sangat Rumit'
  estimasi_baca?: string
  ringkasan_cepat?: string
  versi_mudah?: string[]
  langkah_tindakan?: string[]
  // Legacy / fallback support
  title?: string
  summary?: string
  simplifiedBullets?: string[]
  simplifiedParagraph?: string
  actionSteps?: string[]
  keyPoints?: Array<{
    category?: 'obligation' | 'prohibition' | 'date' | 'cost' | 'requirement' | 'risk'
    label: string
    text: string
    severity?: 'info' | 'warning' | 'alert' | 'success'
  }>
  terms?:
    | Array<{
        term: string
        explanation: string
        context?: string
      }>
    | Record<string, string>
  ambiguousParts?: string[]
  disclaimer?: string
}

const SYSTEM_PROMPT = `Kamu adalah mesin penyederhana teks cerdas untuk aplikasi "Bantu Jelasin". Tugasmu adalah menganalisis teks yang diberikan, mengukur tingkat kerumitannya, lalu menyederhanakannya ke dalam bahasa Indonesia yang alami, luwes, dan akurat.

### PANDUAN GAYA ([GAYA_PENJELASAN]):
- "Sangat sederhana": Kalimat pendek, santai, tanpa istilah teknis, sangat ramah lansia dan orang awam.
- "Sederhana": Bahasa sehari-hari yang rapi, komunikatif, dan teratur (standar).
- "Detail": Rapi dan jelas dengan konteks latar belakang serta penjabaran istilah penting tetap disertakan.

### ATURAN UTAMA:
1. Keaslian Frasa: DILARANG membuat terjemahan harfiah yang kaku (misalnya jangan gunakan "buat soal perubahan iklim", gunakan "mengatasi masalah perubahan iklim").
2. Filter Tindakan (PENTING):
   - Klasifikasikan teks: Apakah ini teks administratif/instruksional yang menuntut pembaca bertindak (seperti tagihan, kontrak, surat edaran, hasil lab)? ATAU teks informatif/naratif (berita, opini, edukasi, cerita)?
   - Field \`langkah_tindakan\` HANYA diisi jika teks asli secara eksplisit menuntut tindakan nyata dari pembaca.
   - JIKA teks murni berita atau narasi, kembalikan array kosong \`[]\`. JANGAN PERNAH berasumsi atau mengarang instruksi untuk pembaca.

### FORMAT OUTPUT:
Kembalikan HANYA format valid JSON murni tanpa pembuka/penutup markdown:
{
  "tingkat_teks_asli": "Mudah" | "Sedang" | "Rumit" | "Sangat Rumit",
  "estimasi_baca": "~1 menit",
  "ringkasan_cepat": "1-2 kalimat ringkasan inti pesan",
  "versi_mudah": [
    "Poin penyederhanaan 1",
    "Poin penyederhanaan 2",
    "Poin penyederhanaan 3"
  ],
  "langkah_tindakan": [
    "Langkah aksi konkret pembaca jika ada (atau biarkan kosong [] jika teks hanya narasi/berita)"
  ]
}`

export async function freeAiSimplify(
  text: string,
  level: SimplificationLevel
): Promise<SimplifyResult> {
  const gayaMap: Record<SimplificationLevel, string> = {
    very_simple: 'Sangat sederhana',
    simple: 'Sederhana',
    detailed: 'Detail',
  }
  const gaya = gayaMap[level] || 'Sederhana'

  const userMessage = `Gaya: ${gaya}\nTeks:\n"""\n${text}\n"""`

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 20000)

  try {
    const response = await fetch('https://text.pollinations.ai/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
      body: JSON.stringify({
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userMessage },
        ],
      }),
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(`AI Gateway responded with status: ${response.status}`)
    }

    const raw = await response.text()
    if (!raw || !raw.trim()) {
      throw new Error('Respon AI kosong')
    }

    // Clean markdown fences
    let cleanJson = raw.trim()
    if (cleanJson.startsWith('```json')) {
      cleanJson = cleanJson.replace(/^```json\s*/i, '').replace(/\s*```$/, '')
    } else if (cleanJson.startsWith('```')) {
      cleanJson = cleanJson.replace(/^```\s*/, '').replace(/\s*```$/, '')
    }

    const parsed: FreeAiResponseShape = JSON.parse(cleanJson)

    // Normalize terms format (if present)
    let normalizedTerms: TermExplanation[] = []
    if (Array.isArray(parsed.terms)) {
      normalizedTerms = parsed.terms.map((t) => ({
        term: t.term || '',
        explanation: t.explanation || '',
        context: t.context || 'Umum',
      }))
    } else if (parsed.terms && typeof parsed.terms === 'object') {
      normalizedTerms = Object.entries(parsed.terms).map(([k, v]) => ({
        term: k,
        explanation: typeof v === 'string' ? v : JSON.stringify(v),
        context: 'Istilah',
      }))
    }

    // Normalize key points (if present)
    let normalizedKeyPoints: KeyPoint[] = []
    if (Array.isArray(parsed.keyPoints)) {
      normalizedKeyPoints = parsed.keyPoints.map((kp) => {
        if (typeof kp === 'string') {
          return {
            category: 'requirement',
            label: 'Poin Penting',
            text: kp,
            severity: 'info',
          }
        }
        return {
          category: kp.category || 'requirement',
          label: kp.label || 'Poin Penting',
          text: kp.text || '',
          severity: kp.severity || 'info',
        }
      })
    }

    const bullets =
      Array.isArray(parsed.versi_mudah) && parsed.versi_mudah.length > 0
        ? parsed.versi_mudah
        : Array.isArray(parsed.simplifiedBullets) && parsed.simplifiedBullets.length > 0
        ? parsed.simplifiedBullets
        : [parsed.ringkasan_cepat || parsed.summary || 'Teks telah disederhanakan.']

    const summary =
      parsed.ringkasan_cepat || parsed.summary || bullets[0] || 'Ringkasan teks'

    const actionSteps = Array.isArray(parsed.langkah_tindakan)
      ? parsed.langkah_tindakan
      : Array.isArray(parsed.actionSteps)
      ? parsed.actionSteps
      : []

    // Calculate difficulty
    const defaultDiff = calculateTextDifficulty(text)
    const levelMap: Record<
      string,
      { label: string; score: number; color: 'green' | 'amber' | 'orange' | 'red' }
    > = {
      Mudah: { label: 'Mudah Dipahami', score: 25, color: 'green' },
      Sedang: { label: 'Tingkat Sedang', score: 55, color: 'amber' },
      Rumit: { label: 'Cukup Rumit', score: 80, color: 'orange' },
      'Sangat Rumit': { label: 'Sangat Rumit', score: 95, color: 'red' },
    }

    const difficulty =
      parsed.tingkat_teks_asli && levelMap[parsed.tingkat_teks_asli]
        ? {
            score: levelMap[parsed.tingkat_teks_asli].score,
            label: levelMap[parsed.tingkat_teks_asli].label,
            color: levelMap[parsed.tingkat_teks_asli].color,
            readingTimeMinutes: defaultDiff.readingTimeMinutes,
            sentenceCount: defaultDiff.sentenceCount,
            wordCount: defaultDiff.wordCount,
            difficultTermsCount: defaultDiff.difficultTermsCount,
          }
        : defaultDiff

    return {
      id: `ai-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      originalText: text,
      level,
      title: parsed.title || 'Penjelasan Sederhana Dokumen',
      summary,
      simplifiedText: parsed.simplifiedParagraph || bullets.join(' '),
      simplifiedBullets: bullets,
      actionSteps,
      keyPoints: normalizedKeyPoints,
      terms: normalizedTerms,
      ambiguousParts: parsed.ambiguousParts || [],
      disclaimer:
        parsed.disclaimer ||
        'Hasil ini dibuat otomatis sebagai bantuan membaca, bukan nasihat medis atau nasihat hukum resmi.',
      difficulty,
      provider: 'gemini_ai',
      createdAt: Date.now(),
    }
  } catch (err) {
    clearTimeout(timeoutId)
    throw err
  }
}

