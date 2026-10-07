import React from 'react'

export default function HowToUseSection() {
  const steps = [
    {
      number: '1',
      title: 'Salin tulisan yang membingungkan',
      desc: 'Tekan lama pada tulisan di surat, foto, atau pesan, lalu pilih Salin. Belum bisa menyalin? Minta bantuan keluarga atau petugas.',
    },
    {
      number: '2',
      title: 'Tempel di kotak besar',
      desc: 'Tekan kotak besar di bagian atas halaman ini, lalu pilih Tempel. Kalau perlu, tulisan bisa diperbaiki dulu dengan papan ketik.',
    },
    {
      number: '3',
      title: 'Tekan tombol Sederhanakan',
      desc: 'Penjelasan sederhana langsung muncul di samping kotak teks, lengkap dengan daftar hal yang harus dilakukan.',
    },
  ]

  return (
    <section id="cara-pakai" className="px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10">
          <h2 className="text-2xl font-bold tracking-tight text-[var(--bj-text-main)] sm:text-3xl">
            Cara pakai
          </h2>
          <p className="mt-1 text-base text-[var(--bj-text-muted)]">
            Hanya tiga langkah, tidak ada yang perlu dihafal.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bj-card relative rounded-3xl p-6 shadow-xs transition hover:shadow-md"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-black text-lg font-extrabold text-white dark:bg-white dark:text-black">
                {step.number}
              </div>
              <h3 className="mt-5 text-lg font-bold text-[var(--bj-text-main)]">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--bj-text-muted)]">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
