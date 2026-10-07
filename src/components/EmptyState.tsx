import React from 'react'
import { Info, ShieldAlert, FileText } from 'lucide-react'

export default function EmptyState() {
  return (
    <div className="space-y-5 animate-fade-in">
      {/* Notice box */}
      <div className="flex items-start gap-3 rounded-2xl border border-stone-200 bg-[var(--bj-card-muted)] p-4 text-sm text-[var(--bj-text-muted)] dark:border-stone-800">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-orange-500" />
        <p className="leading-relaxed">
          Belum ada teks. Tempel teksnya lebih dulu di kotak sebelah kiri, lalu tekan tombol{' '}
          <span className="font-bold text-orange-600">Sederhanakan</span>.
        </p>
      </div>

      {/* Soft Green Reassurance Box matching mockup */}
      <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/80 p-4 text-xs leading-relaxed text-emerald-900 dark:border-emerald-900/60 dark:bg-emerald-950/30 dark:text-emerald-300 sm:text-sm">
        <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
        <p>
          Hasil ini dibuat otomatis sebagai bantuan membaca, bukan nasihat medis atau
          nasihat hukum. Untuk keputusan penting, tanyakan lagi kepada dokter,
          petugas bank, atau petugas desa.
        </p>
      </div>

      {/* Guide description */}
      <div className="rounded-2xl border border-dashed border-stone-200 p-6 text-center dark:border-stone-800">
        <FileText className="mx-auto h-8 w-8 text-stone-300 dark:text-stone-700" />
        <p className="mt-3 text-sm text-[var(--bj-text-soft)]">
          Di sini nanti muncul penjelasan sederhananya, lengkap dengan daftar hal yang
          perlu kamu lakukan.
        </p>

        {/* Decorative skeleton preview matching mockup */}
        <div className="mx-auto mt-5 max-w-sm space-y-2.5 opacity-40">
          <div className="h-3.5 w-full rounded-full bg-stone-200 dark:bg-stone-800" />
          <div className="h-3.5 w-5/6 rounded-full bg-stone-200 dark:bg-stone-800" />
          <div className="h-3.5 w-2/3 rounded-full bg-stone-200 dark:bg-stone-800" />
        </div>
      </div>
    </div>
  )
}
