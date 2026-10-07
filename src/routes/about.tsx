import React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Sparkles, Heart, ShieldCheck, Glasses, ArrowLeft } from 'lucide-react'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="mb-6">
        <a
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-orange-600 hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Kembali ke Beranda</span>
        </a>
      </div>

      <div className="bj-card rounded-3xl p-6 sm:p-10 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-600 text-white shadow-sm">
            <Sparkles className="h-6 w-6" />
          </div>
          <div>
            <span className="text-xs font-bold tracking-wider text-orange-600 uppercase">
              Misi Kami
            </span>
            <h1 className="text-2xl font-extrabold text-[var(--bj-text-main)] sm:text-3xl">
              Tentang Bantu Jelasin
            </h1>
          </div>
        </div>

        <div className="mt-6 space-y-4 text-base leading-relaxed text-[var(--bj-text-muted)] sm:text-lg">
          <p>
            Di Indonesia, jutaan orang tua, lansia, dan warga awam setiap hari
            harus berhadapan dengan surat-surat resmi: surat edaran kelurahan,
            tagihan listrik yang tiba-tiba membengkak, hasil pemeriksaan darah
            laboratorium, hingga kontrak kerja dan pinjaman bank.
          </p>

          <p>
            Sayangnya, dokumen-dokumen tersebut sering kali ditulis dengan
            istilah birokrasi yang kaku, kalimat majemuk yang berputar-putar,
            serta jargon hukum dan medis yang membingungkan. Akibatnya, banyak
            orang merasa cemas, salah paham, atau bahkan dirugikan secara
            keuangan dan kesehatan.
          </p>

          <p className="font-semibold text-[var(--bj-text-main)]">
            <strong>Bantu Jelasin</strong> hadir sebagai jembatan: mengubah
            kalimat rumit menjadi bahasa Indonesia sehari-hari yang hangat,
            jujur, dan mudah dicerna oleh siapa saja.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-stone-200 bg-[var(--bj-card-muted)] p-5 dark:border-stone-800">
            <Glasses className="h-6 w-6 text-orange-600" />
            <h2 className="mt-3 text-base font-bold text-[var(--bj-text-main)]">
              Ramah Penglihatan
            </h2>
            <p className="mt-1 text-xs text-[var(--bj-text-muted)]">
              Ukuran huruf besar, kontras tinggi, dan tombol lega yang nyaman
              ditekan tanpa perlu kacamata pembesar.
            </p>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-[var(--bj-card-muted)] p-5 dark:border-stone-800">
            <ShieldCheck className="h-6 w-6 text-emerald-600" />
            <h2 className="mt-3 text-base font-bold text-[var(--bj-text-main)]">
              Privasi Aman
            </h2>
            <p className="mt-1 text-xs text-[var(--bj-text-muted)]">
              Tanpa perlu mendaftar atau login. Teks riwayat Anda hanya tersimpan
              di perangkat Anda sendiri.
            </p>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-[var(--bj-card-muted)] p-5 dark:border-stone-800">
            <Heart className="h-6 w-6 text-rose-600" />
            <h2 className="mt-3 text-base font-bold text-[var(--bj-text-main)]">
              Peduli Lansia
            </h2>
            <p className="mt-1 text-xs text-[var(--bj-text-muted)]">
              Disediakan pembacaan suara (Text-to-Speech) agar keluarga dan orang
              tua dapat mendengarkan bersama.
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-5 text-xs text-emerald-900 dark:border-emerald-900/60 dark:bg-emerald-950/30 dark:text-emerald-300 sm:text-sm">
          <strong>Catatan Etika & Keselamatan:</strong> Bantu Jelasin
          dimaksudkan sebagai sarana bantu membaca. Bantu Jelasin tidak
          memberikan diagnosis penyakit, resep obat medis, atau advis hukum
          resmi. Untuk pengambilan keputusan penting, selalu konfirmasi kembali
          dengan dokter, petugas bank, atau penasihat hukum Anda.
        </div>
      </div>
    </main>
  )
}
