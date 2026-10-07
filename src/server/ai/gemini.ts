import type {
  KeyPoint,
  SimplificationLevel,
  SimplifyResult,
  TermExplanation,
} from '../../types'
import { calculateTextDifficulty } from './heuristics'

interface GeminiResponseShape {
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
    category: 'obligation' | 'prohibition' | 'date' | 'cost' | 'requirement' | 'risk'
    label: string
    text: string
    severity?: 'info' | 'warning' | 'alert' | 'success'
  }>
  terms?: Array<{
    term: string
    explanation: string
    context?: string
  }>
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

export async function geminiSimplify(
  text: string,
  level: SimplificationLevel,
  apiKey: string
): Promise<SimplifyResult> {
  const gayaMap: Record<SimplificationLevel, string> = {
    very_simple: 'Sangat sederhana',
    simple: 'Sederhana',
    detailed: 'Detail',
  }
  const gaya = gayaMap[level] || 'Sederhana'

  const userPrompt = `Gaya: ${gaya}\nTeks:\n"""\n${text}\n"""`

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [
        {
          role: 'user',
          parts: [{ text: `${SYSTEM_PROMPT}\n\n${userPrompt}` }],
        },
      ],
      generationConfig: {
        responseMimeType: 'application/json',
        temperature: 0.2,
      },
    }),
  })

  if (!response.ok) {
    const errorBody = await response.text()
    throw new Error(`Gemini API error (${response.status}): ${errorBody}`)
  }

  const data = await response.json()
  const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text
  if (!rawText) {
    throw new Error('Respon Gemini API kosong')
  }

  const parsed: GeminiResponseShape = JSON.parse(rawText)

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
    id: `gemini-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    originalText: text,
    level,
    title: parsed.title || 'Penjelasan Sederhana',
    summary,
    simplifiedText: parsed.simplifiedParagraph || bullets.join(' '),
    simplifiedBullets: bullets,
    actionSteps,
    keyPoints: (parsed.keyPoints || []) as KeyPoint[],
    terms: (parsed.terms || []) as TermExplanation[],
    ambiguousParts: parsed.ambiguousParts || [],
    disclaimer:
      parsed.disclaimer ||
      'Hasil ini dibuat otomatis sebagai bantuan membaca, bukan nasihat medis atau nasihat hukum.',
    difficulty,
    provider: 'gemini_ai',
    createdAt: Date.now(),
  }
}

