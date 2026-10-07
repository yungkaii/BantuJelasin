import React from 'react'
import {
  Type,
  MessageSquare,
  ListChecks,
  CopyCheck,
  Lock,
  Volume2,
} from 'lucide-react'

export default function WhySection() {
  const features = [
    {
      icon: <Type className="h-6 w-6 text-orange-600" />,
      title: 'Huruf besar dan lega',
      desc: 'Ukuran tulisan 18 sampai 20 piksel dengan jarak baris renggang. Tidak perlu memaksakan mata atau memakai kaca pembesar.',
    },
    {
      icon: <MessageSquare className="h-6 w-6 text-blue-600" />,
      title: 'Bahasa sehari-hari',
      desc: 'Istilah panjang seperti "pemutakhiran data" atau "rentang rujukan" diganti dengan kalimat yang biasa kamu dengar setiap hari.',
    },
    {
      icon: <ListChecks className="h-6 w-6 text-emerald-600" />,
      title: 'Langkah yang harus dilakukan',
      desc: 'Setiap penjelasan ditutup dengan daftar hal yang perlu kamu lakukan, supaya tidak ada yang terlewat.',
    },
    {
      icon: <CopyCheck className="h-6 w-6 text-amber-600" />,
      title: 'Tulisan asli tetap ada',
      desc: 'Kamu bisa berpindah antara versi sederhana dan teks aslinya kapan saja, untuk memastikan tidak ada yang berubah artinya.',
    },
    {
      icon: <Lock className="h-6 w-6 text-purple-600" />,
      title: 'Tidak perlu mendaftar',
      desc: 'Tanpa akun, tanpa kata sandi, tanpa email. Tempel teksnya, tekan tombol, lalu selesai.',
    },
    {
      icon: <Volume2 className="h-6 w-6 text-teal-600" />,
      title: 'Bisa dibacakan',
      desc: 'Kalau membaca masih terasa berat, kamu bisa mendengarkan suaranya langsung. Semua tombol dan tulisan sudah besar, jadi mudah dinavigasi.',
    },
  ]

  return (
    <section className="bg-[var(--bj-card-muted)] px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10">
          <h2 className="text-2xl font-bold tracking-tight text-[var(--bj-text-main)] sm:text-3xl">
            Kenapa dibuat begini
          </h2>
          <p className="mt-1 text-base text-[var(--bj-text-muted)]">
            Dirancang khusus dengan prinsip kejelasan, keramahan, dan kemudahan akses bagi semua kalangan.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((item, index) => (
            <div
              key={index}
              className="bj-card flex flex-col justify-between rounded-3xl p-6 shadow-xs transition hover:shadow-md"
            >
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-stone-100 p-2.5 dark:bg-stone-800">
                  {item.icon}
                </div>
                <h3 className="mt-4 text-lg font-bold text-[var(--bj-text-main)]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--bj-text-muted)]">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
