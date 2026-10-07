import React from 'react'
import { ArrowDown } from 'lucide-react'

interface HeroProps {
  onScrollToWorkspace: () => void
}

export default function Hero({ onScrollToWorkspace }: HeroProps) {
  return (
    <section className="relative px-4 pb-6 pt-10 text-center sm:px-6 sm:pb-8 sm:pt-14">
      <div className="mx-auto max-w-3xl">
        {/* Big Headline */}
        <h1 className="text-3xl font-extrabold tracking-tight text-[var(--bj-text-main)] sm:text-5xl sm:leading-[1.18] lg:text-[3.25rem]">
          Bingung dengan surat, tagihan, atau hasil pemeriksaan yang panjang?
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-5 max-w-2xl text-base text-[var(--bj-text-muted)] sm:text-lg sm:leading-relaxed">
          Tempel saja tulisannya di bawah. Bantu Jelasin akan menuliskannya
          kembali dengan bahasa sehari-hari, huruf besar, dan langkah-langkah
          yang mudah diikuti.
        </p>

        {/* Quick CTA */}
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={onScrollToWorkspace}
            className="inline-flex items-center gap-2 rounded-full border border-orange-300 bg-orange-100/60 px-5 py-2 text-sm font-semibold text-orange-900 transition hover:bg-orange-200/80 dark:border-orange-800 dark:bg-orange-950/50 dark:text-orange-200"
          >
            <span>Mulai tulis atau tempel teks</span>
            <ArrowDown className="h-4 w-4 animate-bounce text-orange-600" />
          </button>
        </div>
      </div>
    </section>
  )
}
