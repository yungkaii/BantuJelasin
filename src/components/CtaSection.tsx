import React from 'react'
import { ArrowUp } from 'lucide-react'

interface CtaSectionProps {
  onScrollToInput: () => void
}

export default function CtaSection({ onScrollToInput }: CtaSectionProps) {
  return (
    <section className="border-t border-[var(--bj-card-border)] bg-[var(--bj-card)] px-4 py-16 text-center sm:px-6 sm:py-24">
      <div className="mx-auto max-w-2xl">
        <h2 className="text-3xl font-extrabold tracking-tight text-[var(--bj-text-main)] sm:text-4xl">
          Siap mencoba sekarang?
        </h2>
        <p className="mt-3 text-base text-[var(--bj-text-muted)] sm:text-lg">
          Tidak ada biaya dan tidak perlu mendaftar. Punya surat yang masih
          membingungkan? Mari kita baca bersama.
        </p>

        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={onScrollToInput}
            className="elderly-scale-btn inline-flex items-center gap-2 rounded-2xl bg-orange-600 px-8 py-4 text-lg font-bold text-white shadow-md transition hover:bg-orange-700 active:scale-[0.98]"
          >
            <ArrowUp className="h-5 w-5" />
            <span>Tempel teks sekarang</span>
          </button>
        </div>
      </div>
    </section>
  )
}
