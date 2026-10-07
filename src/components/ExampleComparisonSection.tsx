import React from 'react'
import { PREDEFINED_EXAMPLES } from '../utils/examples'
import { FileText, CheckCircle2, ArrowUpRight } from 'lucide-react'

interface ExampleComparisonSectionProps {
  onSelectExample: (text: string) => void
}

export default function ExampleComparisonSection({
  onSelectExample,
}: ExampleComparisonSectionProps) {
  return (
    <section id="contoh-hasil" className="px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-5xl">
        {/* Section Header matching mockup */}
        <div className="mb-8 sm:mb-10">
          <h2 className="text-2xl font-bold tracking-tight text-[var(--bj-text-main)] sm:text-3xl">
            Contoh hasil
          </h2>
          <p className="mt-1 text-base text-[var(--bj-text-muted)]">
            Lihat perbedaannya. Tulisan aslinya tetap ada, jadi kamu bisa
            membandingkan sendiri.
          </p>
        </div>

        {/* List of Example Cards */}
        <div className="space-y-8">
          {PREDEFINED_EXAMPLES.map((example) => (
            <div
              key={example.id}
              className="bj-card rounded-3xl p-5 sm:p-7 shadow-xs transition hover:shadow-md"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <span className="text-xs font-bold tracking-wider text-orange-600 uppercase">
                    {example.categoryLabel}
                  </span>
                  <h3 className="text-xl font-bold text-[var(--bj-text-main)] sm:text-2xl">
                    {example.title}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectExample(example.originalText)}
                  className="inline-flex items-center gap-1.5 self-start rounded-xl border border-stone-200 bg-[var(--bj-card-muted)] px-3.5 py-2 text-xs font-bold text-[var(--bj-text-main)] transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-900 dark:border-stone-700 dark:hover:bg-orange-950/40 dark:hover:text-orange-200 sm:self-auto sm:text-sm"
                >
                  <span>Coba contoh ini</span>
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>

              {/* Two Column Comparison matching mockup screenshot 2 & 3 */}
              <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
                {/* Panel Tulisan Asli */}
                <div className="rounded-2xl border border-stone-200 bg-stone-50/70 p-4 sm:p-5 dark:border-stone-800 dark:bg-stone-900/40">
                  <div className="flex items-center gap-1.5 text-xs font-bold tracking-wider text-stone-500 uppercase">
                    <FileText className="h-4 w-4 text-stone-400" />
                    <span>Tulisan Asli</span>
                  </div>
                  <p className="mt-2.5 text-sm leading-relaxed text-stone-700 dark:text-stone-300 sm:text-base">
                    {example.originalText}
                  </p>
                </div>

                {/* Panel Versi Sederhana */}
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 sm:p-5 dark:border-emerald-950 dark:bg-emerald-950/20">
                  <div className="flex items-center gap-1.5 text-xs font-bold tracking-wider text-emerald-800 uppercase dark:text-emerald-300">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Versi Sederhana</span>
                  </div>
                  <ul className="mt-2.5 space-y-2">
                    {example.simplifiedBullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-600 dark:bg-emerald-400" />
                        <span className="text-sm font-semibold leading-relaxed text-stone-900 dark:text-stone-100 sm:text-base">
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
