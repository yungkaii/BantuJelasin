import React, { useState } from 'react'
import type { TermExplanation as TermType } from '../types'
import { BookMarked, ChevronDown, ChevronUp } from 'lucide-react'

interface TermExplanationProps {
  terms: TermType[]
}

export default function TermExplanation({ terms }: TermExplanationProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  if (!terms || terms.length === 0) return null

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="flex items-center gap-1.5 text-xs font-bold tracking-wider text-[var(--bj-text-muted)] uppercase">
          <BookMarked className="h-4 w-4 text-orange-600" />
          <span>Istilah Rumit Yang Ditemukan ({terms.length}):</span>
        </h4>
        <span className="text-xs text-[var(--bj-text-soft)]">
          Klik untuk baca arti
        </span>
      </div>

      <div className="space-y-2">
        {terms.map((item, index) => {
          const isExpanded = expandedIndex === index
          return (
            <div
              key={index}
              className="overflow-hidden rounded-xl border border-[var(--bj-card-border)] bg-[var(--bj-card)] transition hover:border-orange-300"
            >
              <button
                type="button"
                onClick={() =>
                  setExpandedIndex(isExpanded ? null : index)
                }
                className="flex w-full items-center justify-between p-3.5 text-left transition hover:bg-[var(--bj-card-muted)]"
                aria-expanded={isExpanded}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-bold text-orange-700 dark:text-orange-400">
                    "{item.term}"
                  </span>
                  {item.context && (
                    <span className="rounded-md bg-stone-100 px-2 py-0.5 text-[11px] font-medium text-stone-600 dark:bg-stone-800 dark:text-stone-300">
                      {item.context}
                    </span>
                  )}
                </div>

                <div className="text-stone-400">
                  {isExpanded ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </div>
              </button>

              {/* Term explanation content */}
              <div
                className={`border-t border-stone-100 bg-orange-50/30 px-3.5 py-3 text-sm leading-relaxed text-[var(--bj-text-main)] dark:border-stone-800 dark:bg-stone-900/40 ${
                  isExpanded ? 'block' : 'hidden sm:block'
                }`}
              >
                <span className="font-semibold text-stone-700 dark:text-stone-300">
                  Arti sederhananya:{' '}
                </span>
                <span>{item.explanation}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
