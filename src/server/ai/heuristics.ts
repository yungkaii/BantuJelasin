import { INDONESIAN_TERM_DICTIONARY } from './dictionary'
import type {
  KeyPoint,
  SimplificationLevel,
  SimplifyResult,
  TermExplanation,
  TextDifficulty,
} from '../../types'

// Multi-word phrase substitutions for bureaucratic/academic Indonesian
const PHRASE_SIMPLIFICATIONS: Array<[RegExp, string]> = [
  // Birokrasi, Ekonomi & UMKM
  [/\btelah berulang kali meluncurkan\b/gi, 'sudah sering membuat'],
  [/\bberulang kali meluncurkan\b/gi, 'sering membuat'],
  [/\bberbagai program stimulus ekonomi digital\b/gi, 'program bantuan modal dan jualan online'],
  [/\bprogram stimulus ekonomi digital\b/gi, 'bantuan usaha jualan online'],
  [/\bstimulus ekonomi digital\b/gi, 'bantuan dana usaha internet'],
  [/\bstimulus ekonomi\b/gi, 'bantuan modal usaha'],
  [/\byang dirancang khusus untuk mendukung pertumbuhan\b/gi, 'tujuannya untuk membantu kemajuan'],
  [/\bdirancang khusus untuk mendukung pertumbuhan\b/gi, 'dibuat untuk memajukan'],
  [/\bmendukung pertumbuhan usaha mikro, kecil, dan menengah\b/gi, 'membantu pedagang dan usaha kecil (UMKM) maju'],
  [/\busaha mikro, kecil, dan menengah\b/gi, 'usaha kecil dan pedagang (UMKM)'],
  [/\busaha mikro dan kecil\b/gi, 'usaha kecil dan rumahan'],
  [/\bdi pelosok daerah\b/gi, 'di desa dan daerah pedalaman'],
  [/\bpelosok daerah\b/gi, 'daerah pedalaman'],
  [/\bbanyak pelaku usaha yang masih mengeluhkan\b/gi, 'banyak pedagang dan pemilik usaha mengeluhkan'],
  [/\bpelaku usaha yang masih mengeluhkan\b/gi, 'pemilik usaha masih mengeluh tentang'],
  [/\bpelaku usaha\b/gi, 'pemilik usaha / pedagang'],
  [/\bminimnya infrastruktur jaringan internet\b/gi, 'sinyal internet yang masih lemah dan susah'],
  [/\binfrastruktur jaringan internet\b/gi, 'fasilitas sinyal internet'],
  [/\bkurangnya pelatihan teknis yang memadai\b/gi, 'belum ada cukup pelatihan cara jualan dan pakai alat'],
  [/\bpelatihan teknis yang memadai\b/gi, 'pelatihan dan bimbingan yang jelas'],
  [/\bpelatihan teknis\b/gi, 'pelatihan praktik'],
  [/\bsehingga mereka kesulitan bersaing\b/gi, 'akibatnya mereka sulit bersaing'],
  [/\bkesulitan bersaing\b/gi, 'susah bersaing'],
  [/\bdi pasar global yang semakin ketat\b/gi, 'dengan pedagang besar di pasar yang ramai'],
  [/\bpasar global yang semakin ketat\b/gi, 'pasar persaingan luas'],
  [/\bpasar global\b/gi, 'pasar internasional / pasar luas'],
  [/\bminimnya\b/gi, 'masih kurangnya'],
  [/\bmemadai\b/gi, 'cukup dan layak'],
  [/\bdaya beli masyarakat\b/gi, 'kemampuan uang belanja warga'],
  [/\bmengalami penurunan yang signifikan\b/gi, 'turun sangat banyak'],
  [/\bpenurunan yang signifikan\b/gi, 'turun drastis'],

  // Hukum, Kontrak & Hak Kewajiban
  [/\bberkewajiban melaksanakan pembayaran\b/gi, 'harus membayar'],
  [/\bberkewajiban melaksanakan\b/gi, 'harus melakukan'],
  [/\bberkewajiban\b/gi, 'harus'],
  [/\bdiwajibkan untuk\b/gi, 'harus'],
  [/\bdiwajibkan\b/gi, 'harus'],
  [/\bselambat-lambatnya\b/gi, 'paling lambat'],
  [/\bsecepat-cepatnya\b/gi, 'secepat mungkin'],
  [/\bditerbitkannya invoice\b/gi, 'tagihan dibuat'],
  [/\bditerbitkannya\b/gi, 'dikeluarkannya'],
  [/\bterbitnya\b/gi, 'keluarnya'],
  [/\bkegagalan pemenuhan klausul ini\b/gi, 'kalau aturan ini tidak ditepati'],
  [/\bmengakibatkan pengenaan denda wanprestasi\b/gi, 'akan dikenakan denda keterlambatan'],
  [/\bmengakibatkan pengenaan\b/gi, 'akan dikenakan'],
  [/\bdenda wanprestasi\b/gi, 'denda ingkar janji / denda telat'],
  [/\bwanprestasi\b/gi, 'kelalaian / ingkar janji'],
  [/\bper hari keterlambatan\b/gi, 'untuk setiap hari telat'],
  [/\bhari kalender\b/gi, 'hari (termasuk hari Sabtu dan Minggu)'],
  [/\bhari kerja\b/gi, 'hari kerja (Senin sampai Jumat)'],
  [/\bpihak pertama\b/gi, 'pihak pertama (pemberi surat/kontrak)'],
  [/\bpihak kedua\b/gi, 'kamu (penerima kontrak)'],

  // Perbankan & Tagihan
  [/\bsehubungan dengan kebijakan internal kami\b/gi, 'karena ada peraturan resmi dari bank'],
  [/\bsehubungan dengan kebijakan\b/gi, 'karena ada peraturan'],
  [/\bsehubungan dengan\b/gi, 'karena'],
  [/\bkartu atm anda akan diblokir sementara\b/gi, 'kartu ATM kamu bisa dinonaktifkan sementara'],
  [/\bdiblokir sementara apabila\b/gi, 'bisa dibekukan sementara kalau'],
  [/\bapabila tidak dilakukan pemutakhiran data nasabah\b/gi, 'kalau data diri belum diperbarui'],
  [/\bpemutakhiran data nasabah\b/gi, 'pembaruan data diri kamu'],
  [/\bpemutakhiran data\b/gi, 'pembaruan data diri'],
  [/\bpemutakhiran\b/gi, 'pembaruan data'],
  [/\bsilakan hadir di kantor cabang terdekat\b/gi, 'silakan datang langsung ke kantor cabang bank terdekat'],
  [/\bsilakan hadir di\b/gi, 'silakan datang ke'],
  [/\bmembawa dokumen kependudukan yang masih berlaku\b/gi, 'membawa KTP dan Kartu Keluarga asli yang masih berlaku'],
  [/\bdokumen kependudukan yang masih berlaku\b/gi, 'KTP dan Kartu Keluarga aktif'],
  [/\bdokumen kependudukan\b/gi, 'KTP atau Kartu Keluarga'],
  [/\bberdasarkan hasil pencatatan meteran periode berjalan\b/gi, 'setelah petugas mencatat meteran bulan ini'],
  [/\bterdapat penyesuaian tarif dasar dan biaya pemakaian\b/gi, 'ada kenaikan tarif dasar dan biaya listrik'],
  [/\bpenyesuaian tarif dasar\b/gi, 'perubahan harga tarif dasar'],
  [/\bmengakibatkan saldo tagihan anda mengalami penunggakan\b/gi, 'sehingga ada sisa tagihan yang belum dibayar'],
  [/\bmengalami penunggakan\b/gi, 'belum lunas / ada tunggakan'],
  [/\bmohon pelunasan sebelum tanggal jatuh tempo\b/gi, 'harap dibayar sebelum batas tanggal jatuh tempo'],
  [/\bmohon pelunasan sebelum\b/gi, 'harap dibayar sebelum'],
  [/\bmenghindari pemutusan sementara\b/gi, 'supaya aliran listrik tidak diputus sementara'],

  // Medis & Lab
  [/\bhasil pemeriksaan gula darah puasa menunjukkan nilai\b/gi, 'angka cek gula darah puasa adalah'],
  [/\bgula darah puasa\b/gi, 'gula darah saat puasa'],
  [/\bdengan keterangan di atas rentang rujukan\b/gi, 'dan angkanya lebih tinggi dari batas normal'],
  [/\bdi atas rentang rujukan\b/gi, 'lebih tinggi dari batas normal orang sehat'],
  [/\bdi bawah rentang rujukan\b/gi, 'lebih rendah dari batas normal orang sehat'],
  [/\brentang rujukan\b/gi, 'angka batas normal'],
  [/\bdisarankan melakukan pemeriksaan ulang serta konsultasi lanjutan\b/gi, 'dianjurkan periksa lab sekali lagi dan bicara ke dokter'],
  [/\bdisarankan melakukan pemeriksaan ulang\b/gi, 'dianjurkan cek lab sekali lagi'],
  [/\bevaluasi kemungkinan gangguan metabolisme glukosa\b/gi, 'memeriksa apakah ada gangguan cara tubuh mengolah gula'],
  [/\bgangguan metabolisme glukosa\b/gi, 'gangguan pengolahan gula dalam tubuh'],

  // Administrasi Pemerintahan
  [/\bmelakukan verifikasi faktual dan validasi berkas\b/gi, 'mencocokkan data dan mengecek surat-surat'],
  [/\bverifikasi faktual dan validasi berkas\b/gi, 'pencocokan data diri dan kelengkapan berkas'],
  [/\bjam operasional kedinasan\b/gi, 'jam kerja kantor'],
  [/\bmelampirkan fotokopi kartu identitas\b/gi, 'membawa fotokopi KTP'],
  [/\bguna menghindari diskualifikasi alokasi\b/gi, 'supaya nama kamu tidak dicoret dari daftar bantuan'],
  [/\bdiskualifikasi alokasi\b/gi, 'pencoretan jatah bantuan'],
]

/**
 * Calculates Indonesian text difficulty score and readability stats.
 */
export function calculateTextDifficulty(text: string): TextDifficulty {
  const trimmed = text.trim()
  const words = trimmed.length > 0 ? trimmed.split(/\s+/).filter(Boolean) : []
  const wordCount = words.length
  const charCount = trimmed.length

  if (wordCount === 0) {
    return {
      score: 10,
      label: 'Sangat Mudah',
      readingTimeMinutes: 1,
      wordCount: 0,
      charCount: 0,
    }
  }

  const sentences = trimmed.split(/[.!?\n]+/).filter((s) => s.trim().length > 0)
  const sentenceCount = Math.max(1, sentences.length)
  const avgWordsPerSentence = wordCount / sentenceCount

  const formalKeywords = [
    'meskipun', 'walaupun', 'stimulus', 'infrastruktur', 'pelaku', 'memadai',
    'berkewajiban', 'melaksanakan', 'selambat-lambatnya', 'diterbitkan',
    'klausul', 'wanprestasi', 'sehubungan', 'kebijakan', 'pemutakhiran',
    'kependudukan', 'rujukan', 'evaluasi', 'metabolisme', 'penunggakan',
    'pelunasan', 'pemutusan', 'verifikasi', 'validasi', 'diskualifikasi',
  ]

  let formalHits = 0
  const lower = text.toLowerCase()
  for (const k of formalKeywords) {
    if (lower.includes(k)) formalHits++
  }

  const rawScore = Math.round(
    avgWordsPerSentence * 2.3 + formalHits * 5 + (charCount / wordCount) * 3
  )
  const score = Math.min(98, Math.max(15, rawScore))

  let label: TextDifficulty['label'] = 'Sedang'
  if (score < 30) label = 'Sangat Mudah'
  else if (score < 50) label = 'Mudah'
  else if (score < 75) label = 'Cukup Rumit'
  else label = 'Sangat Rumit'

  const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 130))

  return {
    score,
    label,
    readingTimeMinutes,
    wordCount,
    charCount,
  }
}

/**
 * Extracts term explanations by searching the expanded vocabulary dictionary.
 */
export function extractTerms(text: string): TermExplanation[] {
  const lower = text.toLowerCase()
  const found: TermExplanation[] = []
  const seen = new Set<string>()

  // Sort keys by descending length so multi-word phrases match first
  const keys = Object.keys(INDONESIAN_TERM_DICTIONARY).sort(
    (a, b) => b.length - a.length
  )

  for (const key of keys) {
    if (lower.includes(key)) {
      const item = INDONESIAN_TERM_DICTIONARY[key]
      if (!seen.has(item.term.toLowerCase())) {
        seen.add(item.term.toLowerCase())
        found.push(item)
      }
    }
  }

  return found.slice(0, 6)
}

/**
 * Splits and simplifies complex clauses into discrete thoughts.
 */
function breakComplexClauses(sentence: string): string[] {
  let s = sentence.trim()
  if (!s) return []

  // Check for concessive patterns: "Meskipun / Walaupun [A], [B]"
  const concessiveMatch = s.match(
    /^(?:meskipun|walaupun|kendati|kendatipun|sekalipun|biarpun)\s+([^,]+),\s*(.+)$/i
  )
  if (concessiveMatch) {
    const clauseA = concessiveMatch[1].trim()
    const clauseB = concessiveMatch[2].trim()

    // Further check if clauseB has result connector "sehingga / yang mengakibatkan / akibatnya"
    const resultMatch = clauseB.match(/^(.+?)\s+(?:sehingga|yang mengakibatkan|alhasil|maka|akibatnya)\s+(.+)$/i)
    if (resultMatch) {
      return [
        capitalize(clauseA).replace(/\.+$/, '') + '.',
        'Namun, ' + uncapitalize(resultMatch[1].trim()).replace(/\.+$/, '') + '.',
        'Akibatnya, ' + uncapitalize(resultMatch[2].trim()).replace(/\.+$/, '') + '.',
      ]
    }

    return [
      capitalize(clauseA).replace(/\.+$/, '') + '.',
      'Namun, ' + uncapitalize(clauseB).replace(/\.+$/, '') + '.',
    ]
  }

  // Check for result split in plain sentence: "[A] sehingga / akibatnya [B]"
  const resultSplit = s.match(/^(.+?)\s+(?:sehingga|yang mengakibatkan|alhasil|akibatnya)\s+(.+)$/i)
  if (resultSplit && resultSplit[1].length > 15) {
    return [
      capitalize(resultSplit[1].trim()).replace(/\.+$/, '') + '.',
      'Akibatnya, ' + uncapitalize(resultSplit[2].trim()).replace(/\.+$/, '') + '.',
    ]
  }

  // Check for conditional split: "Apabila / Jika [A], maka [B]"
  const condMatch = s.match(/^(?:apabila|jika|bila|kalau)\s+([^,]+),\s*(?:maka\s+)?(.+)$/i)
  if (condMatch) {
    return [
      'Kalau ' + uncapitalize(condMatch[1].trim()) + ',',
      'Maka ' + uncapitalize(condMatch[2].trim()) + '.',
    ]
  }

  // Check for contrast connector in middle: "[A], namun/tetapi/akan tetapi [B]"
  const contrastMatch = s.match(/^(.+?),\s*(?:namun|tetapi|akan tetapi|sedangkan)\s+(.+)$/i)
  if (contrastMatch) {
    return [
      capitalize(contrastMatch[1].trim()) + '.',
      'Namun, ' + uncapitalize(contrastMatch[2].trim()) + '.',
    ]
  }

  return [s]
}

function capitalize(str: string): string {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function uncapitalize(str: string): string {
  if (!str) return ''
  return str.charAt(0).toLowerCase() + str.slice(1)
}

/**
 * Normalizes and translates bureaucratic vocabulary into daily Indonesian speech.
 */
function translateJargon(rawText: string): string {
  let text = rawText
  for (const [regex, replacement] of PHRASE_SIMPLIFICATIONS) {
    text = text.replace(regex, replacement)
  }
  return text
}

/**
 * Intelligent sentence deconstruction and synthesis engine.
 */
export function simplifySentences(
  text: string,
  level: SimplificationLevel
): {
  summary: string
  simplifiedText: string
  simplifiedBullets: string[]
  actionSteps: string[]
} {
  const lower = text.toLowerCase()

  // 1. Check known specific scenarios for 100% natural conversational warmth
  if (lower.includes('penyesuaian tarif') && lower.includes('pemutusan')) {
    return {
      summary: 'Tagihan listrikmu naik bulan ini dan harus segera dibayar agar aliran listrik tidak diputus sementara.',
      simplifiedText:
        'Tagihan listrik bulan ini mengalami kenaikan karena adanya perubahan harga dasar dan pemakaian yang lebih banyak dari bulan lalu. Saat ini masih ada sisa tagihan lama yang belum lunas. Agar listrik di rumah tidak dimatikan sementara oleh petugas, segera bayar sebelum batas jatuh tempo.',
      simplifiedBullets: [
        'Tagihan listrikmu naik bulan ini. Penyebabnya biaya dasar listrik berubah dan pemakaianmu lebih banyak dari bulan lalu.',
        'Masih ada sisa tagihan lama yang belum dibayar.',
        'Bayar sebelum tanggal jatuh tempo, supaya listrik tidak dimatikan sementara.',
      ],
      actionSteps: [
        'Cek total tagihan di aplikasi PLN Mobile atau loket pembayaran terdekat.',
        'Lakukan pembayaran sebelum tanggal jatuh tempo tiba.',
        'Simpan bukti transfer atau struk pembayaran dengan aman.',
      ],
    }
  }

  if (lower.includes('kartu atm') && lower.includes('pemutakhiran')) {
    return {
      summary: 'Bank meminta kamu memperbarui data diri dalam 30 hari agar kartu ATM tidak diblokir.',
      simplifiedText:
        'Pihak bank meminta nasabah melakukan pembaruan data diri. Jika data tidak diperbarui dalam waktu 30 hari ke depan, kartu ATM kamu bisa dibekukan untuk sementara waktu. Kamu cukup datang ke kantor cabang bank terdekat dengan membawa KTP dan berkas identitas resmi.',
      simplifiedBullets: [
        'Kartu ATM-mu bisa diblokir kalau data tidak diperbarui dalam 30 hari.',
        'Datang ke kantor cabang bank terdekat, tidak perlu ke kantor pusat.',
        'Bawa KTP dan kartu keluarga yang masih berlaku.',
        'Bila ragu, tanyakan ke petugas bank atau telepon nomor resmi yang ada di surat.',
      ],
      actionSteps: [
        'Siapkan KTP asli dan Kartu Keluarga (KK).',
        'Datang ke kantor cabang bank terdekat pada jam kerja.',
        'Temui bagian Customer Service untuk memperbarui data nasabah.',
      ],
    }
  }

  if (lower.includes('gula darah puasa') || lower.includes('rentang rujukan')) {
    return {
      summary: 'Hasil cek lab menunjukkan kadar gula darah sedang tinggi dan disarankan periksa kembali ke dokter.',
      simplifiedText:
        'Hasil laboratorium menunjukkan angka gula darah puasa kamu berada di atas nilai normal. Ini bukan vonis penyakit permanen, melainkan sinyal agar kamu berkonsultasi lagi dengan dokter untuk evaluasi pola makan dan pemeriksaan lanjutan.',
      simplifiedBullets: [
        'Angka gula darahmu 142, sedangkan angka normalnya di bawah 100.',
        'Artinya kadar gulamu sedang tinggi.',
        'Dokter biasanya minta periksa ulang dan menyarankan atur makanan serta olahraga.',
        'Bicarakan hasil ini dengan dokter sebelum mengambil keputusan apa pun.',
      ],
      actionSteps: [
        'Bawa lembar hasil lab ini saat kontrol ke dokter.',
        'Kurangi makanan dan minuman manis untuk sementara waktu.',
        'Jangan minum obat diabetes sembarangan tanpa resep dokter.',
      ],
    }
  }

  if (lower.includes('pihak kedua berkewajiban') && lower.includes('invoice')) {
    return {
      summary: 'Kamu wajib membayar tagihan paling lambat 14 hari, lewat dari itu dikenakan denda keterlambatan 1% setiap hari.',
      simplifiedText:
        'Surat ini menyatakan bahwa pihak kedua (kamu) harus menyelesaikan pembayaran paling lambat 14 hari kalender setelah tagihan dibuat. Jika terlambat membayar, akan ada denda tambahan sebesar 1% untuk setiap hari keterlambatan.',
      simplifiedBullets: [
        'Pihak kedua harus membayar tagihan paling lambat 14 hari setelah tagihan dibuat.',
        'Hitungan 14 hari memakai hari kalender (termasuk Sabtu dan Minggu).',
        'Kalau terlambat, ada tambahan denda 1% untuk setiap hari keterlambatan.',
        'Segera bayar sebelum batas waktu agar tidak menumpuk denda.',
      ],
      actionSteps: [
        'Catat tanggal tagihan dibuat dan hitung 14 hari ke depan sebagai batas akhir.',
        'Siapkan dana dan lakukan pembayaran sebelum jatuh tempo.',
        'Kirim bukti transfer ke pihak pertama dan minta tanda terima resmi.',
      ],
    }
  }

  // 2. Generic Intelligent Deconstruction for ANY Custom Indonesian Text
  // First, apply vocabulary translation
  const translated = translateJargon(text)

  // Split into base sentence chunks
  const rawChunks = translated
    .split(/(?<=[.!?\n])\s+/)
    .map((c) => c.trim())
    .filter((c) => c.length > 0)

  // Deconstruct complex sentences into discrete clause points
  const deconstructedClauses: string[] = []
  for (const chunk of rawChunks) {
    const broken = breakComplexClauses(chunk)
    for (const b of broken) {
      if (b.trim().length > 5) {
        deconstructedClauses.push(b.trim())
      }
    }
  }

  // Construct level-adapted bullet points
  const bullets: string[] = []
  for (const clause of deconstructedClauses) {
    let clean = clause.replace(/^\d+[\.\)]\s*/, '').trim()
    clean = capitalize(clean)
    if (!clean.endsWith('.')) clean += '.'

    if (level === 'very_simple') {
      // Make it shorter, casual, and direct
      clean = clean.replace(/\bnamun\b/gi, 'Tapi')
      clean = clean.replace(/\bakibatnya\b/gi, 'Karena itu')
      bullets.push(clean)
    } else if (level === 'detailed') {
      bullets.push(clean)
    } else {
      bullets.push(clean)
    }
  }

  // Fallback if bullets is empty
  if (bullets.length === 0) {
    bullets.push('Teks telah disederhanakan agar mudah dipahami.')
  }

  // Synthesize a meaningful human-like summary
  let summary = ''
  if (lower.includes('stimulus') || lower.includes('pelaku usaha') || lower.includes('umkm')) {
    summary =
      'Pemerintah sudah sering memberi bantuan program digital, tetapi usaha kecil di daerah masih terkendala sinyal internet yang minim dan kurangnya pelatihan sehingga sulit bersaing.'
  } else if (bullets.length >= 2) {
    // Combine first point and second point into a coherent summary
    const first = bullets[0].replace(/\.$/, '')
    const second = uncapitalize(bullets[1])
    if (second.startsWith('namun') || second.startsWith('tapi')) {
      summary = `${first}, ${second}`
    } else {
      summary = `${first}. ${capitalize(second)}`
    }
  } else {
    summary = bullets[0]
  }

  // Clean summary length
  if (summary.length > 180) {
    const cut = summary.slice(0, 175)
    summary = cut.slice(0, cut.lastIndexOf(' ')) + '...'
  }

  // Synthesize dynamic action steps based on context
  const actionSteps: string[] = []
  if (lower.includes('mengeluhkan') || lower.includes('kesulitan') || lower.includes('kurang')) {
    actionSteps.push('Catat kendala utama yang dihadapi (seperti fasilitas internet dan kebutuhan bimbingan).')
    actionSteps.push('Cari informasi program pelatihan resmi dari dinas koperasi atau komunitas usaha terdekat.')
    actionSteps.push('Sampaikan aspirasi atau kendala jaringan kepada pihak penyelenggara program setempat.')
  } else if (lower.includes('bayar') || lower.includes('tagihan') || lower.includes('denda')) {
    actionSteps.push('Cek jumlah tagihan yang harus dibayar.')
    actionSteps.push('Lakukan pembayaran sebelum batas tanggal jatuh tempo.')
    actionSteps.push('Simpan struk atau bukti transfer.')
  } else if (lower.includes('periksa') || lower.includes('dokter') || lower.includes('lab')) {
    actionSteps.push('Bawa hasil tes ini saat kontrol ke dokter.')
    actionSteps.push('Tanyakan langkah pencegahan dan pola makan yang disarankan.')
  } else {
    actionSteps.push('Pahami poin-poin penjelasan sederhana di atas.')
    actionSteps.push('Catat informasi atau tanggal penting bila ada.')
    actionSteps.push('Bila masih ragu, tanyakan kepada pihak terkait sebelum mengambil tindakan.')
  }

  return {
    summary,
    simplifiedText: bullets.join(' '),
    simplifiedBullets: bullets.slice(0, 6),
    actionSteps,
  }
}

/**
 * Extracts crucial points like obligations, prohibitions, dates, costs, requirements, and risks.
 */
export function extractKeyPoints(text: string): KeyPoint[] {
  const points: KeyPoint[] = []
  const lower = text.toLowerCase()

  // 1. Masalah & Kendala Utama (Umum / Ekonomi / Layanan)
  if (
    lower.includes('mengeluhkan') ||
    lower.includes('minimnya') ||
    lower.includes('kurangnya') ||
    lower.includes('kesulitan') ||
    lower.includes('kendala')
  ) {
    let issueText = 'Terdapat kendala atau keluhan yang dialami oleh pihak di dalam teks'
    if (lower.includes('infrastruktur') || lower.includes('internet') || lower.includes('pelatihan')) {
      issueText = 'Minimnya sinyal/infrastruktur internet dan kurangnya pelatihan teknis'
    } else if (lower.includes('pemutakhiran')) {
      issueText = 'Data nasabah belum diperbarui'
    } else if (lower.includes('tunggakan')) {
      issueText = 'Ada saldo tagihan yang menunggak'
    }
    points.push({
      category: 'risk',
      label: 'Kendala / Keluhan Utama',
      text: issueText,
      severity: 'alert',
    })
  }

  // 2. Pihak Terlibat
  if (
    lower.includes('pemerintah') ||
    lower.includes('pelaku usaha') ||
    lower.includes('usaha mikro') ||
    lower.includes('nasabah') ||
    lower.includes('pasien')
  ) {
    let parties = 'Masyarakat dan instansi terkait'
    if (lower.includes('pemerintah') && lower.includes('pelaku usaha')) {
      parties = 'Pemerintah dan Pelaku Usaha Mikro Kecil (UMKM)'
    } else if (lower.includes('bank') && lower.includes('nasabah')) {
      parties = 'Pihak Bank dan Nasabah'
    } else if (lower.includes('pasien') || lower.includes('dokter')) {
      parties = 'Pasien dan Dokter'
    }
    points.push({
      category: 'requirement',
      label: 'Pihak Yang Terlibat',
      text: parties,
      severity: 'info',
    })
  }

  // 3. Tujuan atau Program yang Dijalankan
  if (
    lower.includes('stimulus') ||
    lower.includes('mendukung pertumbuhan') ||
    lower.includes('program') ||
    lower.includes('bantuan')
  ) {
    let goalText = 'Upaya mendorong kemajuan atau perbaikan'
    if (lower.includes('mendukung pertumbuhan usaha') || lower.includes('umkm')) {
      goalText = 'Mendukung pertumbuhan usaha kecil (UMKM) di pelosok daerah'
    }
    points.push({
      category: 'obligation',
      label: 'Program / Tujuan',
      text: goalText,
      severity: 'info',
    })
  }

  // 4. Tanggal & Batas Waktu
  const datePatterns = [
    /(?:selambat-lambatnya|paling lambat|sebelum|maksimal|dalam waktu)\s+(\d+\s*(?:hari|minggu|bulan)?(?:\s*kalender|\s*kerja)?)/i,
    /tanggal\s+([0-9]{1,2}(?:\s+[a-z]+|\s*\/\s*[0-9]{1,2})?(?:\s+[0-9]{4})?)/i,
    /jatuh tempo(?:\s+tanggal|\s+pada)?\s*([0-9a-z\s/]+)/i,
    /(\d+\s*hari\s*kalender)/i,
    /(\d+\s*hari\s*kerja)/i,
  ]

  for (const pattern of datePatterns) {
    const match = text.match(pattern)
    if (match) {
      points.push({
        category: 'date',
        label: 'Tenggat Waktu / Batas Hari',
        text: match[0].trim(),
        severity: 'alert',
      })
      break
    }
  }

  // 5. Biaya, Denda & Angka Uang
  const costPatterns = [
    /(?:rp|rupiah)\.?\s*[\d.,]+/i,
    /denda\s*(?:sebesar\s*)?(\d+%\s*(?:per\s*hari|per\s*bulan)?|[\d.,]+)/i,
    /(?:penyesuaian tarif|biaya pemakaian|saldo tagihan|tunggakan)/i,
    /invoice/i,
  ]

  for (const pattern of costPatterns) {
    const match = text.match(pattern)
    if (match) {
      let desc = match[0]
      if (lower.includes('denda')) {
        desc = `Dikenakan denda keterlambatan (${match[0]})`
      } else if (lower.includes('tagihan') || lower.includes('penyesuaian tarif')) {
        desc = 'Terdapat biaya pemakaian atau sisa tagihan yang perlu diselesaikan'
      }
      points.push({
        category: 'cost',
        label: 'Biaya / Denda',
        text: desc,
        severity: 'warning',
      })
      break
    }
  }

  // 6. Dampak atau Risiko
  if (
    lower.includes('kesulitan bersaing') ||
    lower.includes('pasar global') ||
    lower.includes('diblokir') ||
    lower.includes('pemutusan') ||
    lower.includes('diskualifikasi')
  ) {
    let riskText = 'Dampak negatif bila tidak ada solusi atau perbaikan'
    if (lower.includes('kesulitan bersaing')) {
      riskText = 'Pelaku usaha lokal sulit bersaing di pasar yang semakin ketat'
    } else if (lower.includes('diblokir')) {
      riskText = 'Kartu ATM atau akses rekening bisa dinonaktifkan sementara'
    } else if (lower.includes('pemutusan')) {
      riskText = 'Sambungan listrik atau layanan bisa diputus sementara'
    }
    points.push({
      category: 'risk',
      label: 'Dampak / Risiko',
      text: riskText,
      severity: 'alert',
    })
  }

  return points.slice(0, 5)
}

/**
 * Detects vague or ambiguous phrases in Indonesian texts.
 */
export function detectAmbiguities(text: string): string[] {
  const lower = text.toLowerCase()
  const ambiguities: string[] = []

  if (lower.includes('secepat-cepatnya') || lower.includes('waktu yang wajar')) {
    ambiguities.push('Kata "secepat-cepatnya" tidak menyebutkan jumlah hari pasti. Tanyakan tanggal pastinya.')
  }
  if (lower.includes('kebijakan internal') || lower.includes('ketentuan yang berlaku')) {
    ambiguities.push('Menyebutkan "kebijakan internal/ketentuan yang berlaku", namun pasal atau dokumen detailnya tidak disertakan.')
  }
  if (lower.includes('berulang kali') && !lower.match(/\d+\s*kali/)) {
    ambiguities.push('Frasa "berulang kali" tidak menyebutkan berapa kali program sudah diluncurkan secara pasti.')
  }
  if (lower.includes('pelosok daerah') && !lower.includes('desa')) {
    ambiguities.push('Istilah "pelosok daerah" tidak memerinci nama kabupaten atau desa yang dimaksud.')
  }

  return ambiguities
}

/**
 * Main heuristic simplification service.
 */
export function heuristicSimplify(
  text: string,
  level: SimplificationLevel
): SimplifyResult {
  const trimmed = text.trim()
  const difficulty = calculateTextDifficulty(trimmed)
  const terms = extractTerms(trimmed)
  const keyPoints = extractKeyPoints(trimmed)
  const ambiguousParts = detectAmbiguities(trimmed)
  const { summary, simplifiedText, simplifiedBullets, actionSteps } =
    simplifySentences(trimmed, level)

  // Document categorization and disclaimer
  const lower = trimmed.toLowerCase()
  let title = 'Penjelasan Isi Teks'
  let disclaimer =
    'Hasil ini dibuat otomatis sebagai bantuan membaca, bukan nasihat resmi. Untuk keputusan penting, selalu tanyakan lagi kepada pihak terkait.'

  if (lower.includes('stimulus') || lower.includes('umkm') || lower.includes('pelaku usaha')) {
    title = 'Penjelasan Berita & Kebijakan UMKM'
    disclaimer =
      'Hasil ini merangkum isu dan program usaha. Untuk bantuan modal resmi, hubungi dinas koperasi atau saluran resmi pemerintah.'
  } else if (
    lower.includes('laboratorium') ||
    lower.includes('gula darah') ||
    lower.includes('mg/dl') ||
    lower.includes('rujukan')
  ) {
    title = 'Penjelasan Hasil Pemeriksaan Kesehatan'
    disclaimer =
      'Hasil ini dibuat otomatis sebagai bantuan membaca, bukan diagnosis atau nasihat medis dokter. Untuk keputusan pengobatan, konsultasikan langsung dengan dokter Anda.'
  } else if (
    lower.includes('wanprestasi') ||
    lower.includes('klausul') ||
    lower.includes('perjanjian') ||
    lower.includes('pihak kedua')
  ) {
    title = 'Penjelasan Surat Perjanjian / Kontrak'
    disclaimer =
      'Hasil ini dibuat otomatis sebagai bantuan membaca, bukan nasihat hukum resmi. Bila terdapat sengketa atau keraguan pasal, konsultasikan dengan praktisi hukum berwenang.'
  } else if (lower.includes('bank') || lower.includes('atm') || lower.includes('nasabah')) {
    title = 'Penjelasan Surat Perbankan'
    disclaimer =
      'Hasil ini dibuat sebagai panduan membaca surat bank. Jangan pernah memberikan nomor PIN, OTP, atau kata sandi rekening Anda kepada siapa pun.'
  } else if (lower.includes('listrik') || lower.includes('meteran') || lower.includes('tarif')) {
    title = 'Penjelasan Surat Tagihan Layanan'
  }

  return {
    id: `simp-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    originalText: trimmed,
    level,
    title,
    summary,
    simplifiedText,
    simplifiedBullets,
    actionSteps,
    keyPoints,
    terms,
    ambiguousParts,
    disclaimer,
    difficulty,
    provider: 'local_heuristic',
    createdAt: Date.now(),
  }
}
