import React from 'react'
import { Lightbulb } from 'lucide-react'

interface SummaryCardProps {
  summary: string
  title?: string
}

export default function SummaryCard({ summary, title }: SummaryCardProps) {
  if (!summary) return null

  return (
    <div className="rounded-2xl border border-orange-200 bg-orange-50/70 p-4 dark:border-orange-900/60 dark:bg-orange-950/20 sm:p-5">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-orange-600 text-white shadow-xs">
          <Lightbulb className="h-4 w-4" />
        </div>
        <div>
          <h4 className="text-xs font-bold tracking-wider text-orange-900 uppercase dark:text-orange-300">
            {title ? title : 'Inti Pesan Dokumen:'}
          </h4>
          <p className="mt-1 text-base font-semibold leading-relaxed text-[var(--bj-text-main)] sm:text-lg">
            {summary}
          </p>
        </div>
      </div>
    </div>
  )
}
