import type { PredefinedExample } from '../types'

export const PREDEFINED_EXAMPLES: PredefinedExample[] = [
  {
    id: 'tagihan-listrik',
    title: 'Tagihan listrik',
    category: 'tagihan',
    categoryLabel: 'Tagihan & Utilitas',
    iconName: 'Zap',
    originalText:
      'Diberitahukan bahwa berdasarkan hasil pencatatan meteran periode berjalan, terdapat penyesuaian tarif dasar dan biaya pemakaian yang mengakibatkan saldo tagihan Anda mengalami penunggakan. Mohon pelunasan sebelum tanggal jatuh tempo untuk menghindari pemutusan sementara.',
    simplifiedBullets: [
      'Tagihan listrikmu naik bulan ini. Penyebabnya biaya dasar listrik berubah dan pemakaianmu lebih banyak dari bulan lalu.',
      'Masih ada sisa tagihan lama yang belum dibayar.',
      'Bayar sebelum tanggal jatuh tempo, supaya listrik tidak dimatikan sementara.',
    ],
    keyPointsPreview: [
      'Kewajiban: Bayar tagihan sebelum tanggal jatuh tempo',
      'Risiko: Listrik diputus sementara jika menunggak',
    ],
  },
  {
    id: 'surat-bank',
    title: 'Surat bank',
    category: 'bank',
    categoryLabel: 'Surat Bank & Keuangan',
    iconName: 'Building2',
    originalText:
      'Sehubungan dengan kebijakan internal kami, kartu ATM Anda akan diblokir sementara apabila tidak dilakukan pemutakhiran data nasabah paling lambat 30 hari sejak surat ini diterbitkan. Silakan hadir di kantor cabang terdekat dengan membawa dokumen kependudukan yang masih berlaku.',
    simplifiedBullets: [
      'Kartu ATM-mu bisa diblokir kalau data tidak diperbarui dalam 30 hari.',
      'Datang ke kantor cabang bank terdekat, tidak perlu ke kantor pusat.',
      'Bawa KTP dan kartu keluarga yang masih berlaku.',
      'Bila ragu, tanyakan ke petugas bank atau telepon nomor resmi yang ada di surat.',
    ],
    keyPointsPreview: [
      'Tenggat Waktu: Maksimal 30 hari sejak surat diterima',
      'Syarat: Bawa KTP & Kartu Keluarga asli ke kantor cabang',
      'Risiko: Kartu ATM dinonaktifkan sementara',
    ],
  },
  {
    id: 'hasil-lab',
    title: 'Hasil laboratorium',
    category: 'medis',
    categoryLabel: 'Kesehatan & Lab',
    iconName: 'Activity',
    originalText:
      'Hasil pemeriksaan gula darah puasa menunjukkan nilai 142 mg/dL dengan keterangan di atas rentang rujukan. Disarankan melakukan pemeriksaan ulang serta konsultasi lanjutan untuk evaluasi kemungkinan gangguan metabolisme glukosa.',
    simplifiedBullets: [
      'Angka gula darahmu 142, sedangkan angka normalnya di bawah 100.',
      'Artinya kadar gulamu sedang tinggi.',
      'Dokter biasanya minta periksa ulang dan menyarankan atur makanan serta olahraga.',
      'Bicarakan hasil ini dengan dokter sebelum mengambil keputusan apa pun.',
    ],
    keyPointsPreview: [
      'Nilai Tes: 142 mg/dL (lebih tinggi dari batas normal)',
      'Langkah Lanjutan: Konsultasikan ke dokter untuk pemeriksaan lanjutan',
      'Peringatan: Bukan vonis penyakit, perlu evaluasi medis resmi',
    ],
  },
  {
    id: 'kontrak-hukum',
    title: 'Surat perjanjian / Kontrak',
    category: 'kontrak',
    categoryLabel: 'Hukum & Perjanjian',
    iconName: 'FileText',
    originalText:
      'Pihak kedua berkewajiban melaksanakan pembayaran selambat-lambatnya 14 hari kalender sejak tanggal diterbitkannya invoice, dan kegagalan pemenuhan klausul ini akan mengakibatkan pengenaan denda wanprestasi sebesar 1% per hari keterlambatan.',
    simplifiedBullets: [
      'Kamu (Pihak kedua) harus membayar tagihan paling lambat 14 hari setelah surat tagihan keluar.',
      'Kalau terlambat bayar, kamu akan dikenakan denda tambahan 1% untuk setiap hari keterlambatan.',
      'Hitungan 14 hari memakai hari kalender (termasuk hari Sabtu dan Minggu).',
      'Segera bayar tepat waktu agar tidak menumpuk denda.',
    ],
    keyPointsPreview: [
      'Kewajiban: Membayar tagihan',
      'Tenggat Waktu: 14 hari kalender sejak invoice terbit',
      'Biaya/Denda: Denda keterlambatan 1% per hari',
    ],
  },
  {
    id: 'surat-desa',
    title: 'Pengumuman pemerintah / Desa',
    category: 'pemerintah',
    categoryLabel: 'Administrasi Warga',
    iconName: 'Landmark',
    originalText:
      'Diberitahukan kepada seluruh warga penerima bantuan sosial terpadu agar segera melakukan verifikasi faktual dan validasi berkas administrasi kependudukan di balai pertemuan pada jam operasional kedinasan dengan melampirkan fotokopi kartu identitas guna menghindari diskualifikasi alokasi.',
    simplifiedBullets: [
      'Warga penerima bansos diminta datang ke balai pertemuan desa.',
      'Tujuannya mencocokkan data agar bantuan tetap bisa dicairkan.',
      'Wajib membawa fotokopi KTP dan Kartu Keluarga.',
      'Datang saat jam kerja kantor (pagi sampai sore) agar nama kamu tidak dicoret dari daftar bantuan.',
    ],
    keyPointsPreview: [
      'Lokasi: Balai pertemuan desa pada jam kerja',
      'Syarat: Membawa fotokopi KTP / KK',
      'Risiko: Bantuan sosial bisa dibatalkan jika tidak verifikasi',
    ],
  },
]
