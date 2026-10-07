import React, { useState } from 'react'
import { Plus, Minus } from 'lucide-react'

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      q: 'Apakah perlu membuat akun?',
      a: 'Tidak perlu. Kamu bisa langsung menempel teks dan membaca hasilnya secara gratis tanpa harus memasukkan email, nomor telepon, atau kata sandi.',
    },
    {
      q: 'Teks apa saja yang bisa dijelaskan?',
      a: 'Hampir semua dokumen: surat edaran kelurahan/RT, surat pemutakhiran data bank, tagihan listrik dan air, surat perjanjian kerja/sewa, hasil tes darah laboratorium, hingga syarat dan ketentuan aplikasi ponsel.',
    },
    {
      q: 'Apakah hasilnya bisa langsung dipercaya?',
      a: 'Hasil Bantu Jelasin dibuat sebagai alat bantu membaca agar kalimat yang berbelit-belit jadi ramah dan jelas. Namun, untuk keputusan tindakan medis atau masalah hukum resmi, selalu bicarakan lagi dengan dokter atau petugas berwenang.',
    },
    {
      q: 'Tulisan saya panjang sekali, apakah tetap bisa?',
      a: 'Tentu bisa, hingga 6.000 karakter dalam sekali proses. Bila dokumenmu sangat tebal, kamu bisa menyalin bagian atau pasal yang paling membingungkan terlebih dahulu.',
    },
    {
      q: 'Apakah data surat saya aman dan dirahasiakan?',
      a: 'Sangat aman. Kami tidak menjual data Anda ke pihak ketiga. Catatan riwayat hanya disimpan secara lokal di browser ponsel atau komputer Anda sendiri, dan bisa Anda hapus kapan saja.',
    },
  ]

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx)
  }

  return (
    <section id="tanya-jawab" className="px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-[var(--bj-text-main)] sm:text-3xl">
            Tanya jawab
          </h2>
          <p className="mt-2 text-base text-[var(--bj-text-muted)]">
            Pertanyaan yang sering ditanyakan seputar penggunaan Bantu Jelasin.
          </p>
        </div>

        <div className="mt-10 space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div
                key={index}
                className="bj-card overflow-hidden rounded-2xl shadow-xs transition hover:border-orange-300"
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="flex w-full items-center justify-between p-5 text-left text-base font-bold text-[var(--bj-text-main)] sm:text-lg"
                  aria-expanded={isOpen}
                >
                  <span className="pr-4">{faq.q}</span>
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-stone-100 text-orange-600 dark:bg-stone-800">
                    {isOpen ? (
                      <Minus className="h-4 w-4" />
                    ) : (
                      <Plus className="h-4 w-4" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="border-t border-stone-100 px-5 pb-5 pt-3 text-sm leading-relaxed text-[var(--bj-text-muted)] dark:border-stone-800 sm:text-base">
                    {faq.a}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
