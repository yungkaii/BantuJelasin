import React from 'react'
import { Sparkles, Heart } from 'lucide-react'

export default function Footer() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="border-t border-[var(--bj-card-border)] bg-[var(--bj-card-muted)] px-4 py-10 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        {/* Brand statement matching mockup */}
        <div className="flex items-center gap-2 text-sm text-[var(--bj-text-muted)]">
          <Sparkles className="h-4 w-4 text-orange-600" />
          <span className="font-semibold text-[var(--bj-text-main)]">
            Bantu Jelasin
          </span>
          <span>—</span>
          <span>dibuat ramah untuk lansia dan semua warga.</span>
        </div>

        {/* Navigation links matching mockup */}
        <div className="flex flex-wrap items-center gap-6 text-sm font-semibold text-[var(--bj-text-muted)]">
          <button
            type="button"
            onClick={() => scrollTo('contoh-hasil')}
            className="hover:text-orange-600 hover:underline"
          >
            Contoh hasil
          </button>
          <button
            type="button"
            onClick={() => scrollTo('cara-pakai')}
            className="hover:text-orange-600 hover:underline"
          >
            Cara pakai
          </button>
          <button
            type="button"
            onClick={() => scrollTo('tanya-jawab')}
            className="hover:text-orange-600 hover:underline"
          >
            Tanya jawab
          </button>
        </div>
      </div>

      <div className="mx-auto mt-6 max-w-6xl text-center text-xs text-[var(--bj-text-soft)]">
        &copy; {new Date().getFullYear()} Bantu Jelasin. Bukan pengganti nasihat medis, diagnosis dokter, atau konsultasi hukum resmi.
      </div>
    </footer>
  )
}
