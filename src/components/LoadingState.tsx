import React, { useState, useEffect } from 'react'
import { Sparkles, BookOpen, CheckCircle2 } from 'lucide-react'

export default function LoadingState() {
  const [stepIndex, setStepIndex] = useState(0)

  const steps = [
    { label: 'Membaca kalimat dan struktur dokumen...', icon: <BookOpen className="h-4 w-4" /> },
    { label: 'Mendeteksi istilah sulit dan tanggal penting...', icon: <Sparkles className="h-4 w-4" /> },
    { label: 'Menyusun kalimat ramah dan mudah dimengerti...', icon: <CheckCircle2 className="h-4 w-4" /> },
  ]

  useEffect(() => {
    const timer1 = setTimeout(() => setStepIndex(1), 700)
    const timer2 = setTimeout(() => setStepIndex(2), 1500)
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  return (
    <div
      className="bj-card flex flex-col items-center justify-center rounded-3xl p-8 text-center sm:p-12 animate-fade-in"
      role="status"
      aria-live="polite"
    >
      {/* Animated glowing spinner */}
      <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 text-orange-600 dark:bg-orange-950/60 dark:text-orange-400">
        <div className="absolute inset-0 rounded-2xl border-2 border-orange-500 border-t-transparent animate-spin" />
        <Sparkles className="h-8 w-8 animate-pulse text-orange-600 dark:text-orange-400" />
      </div>

      <h3 className="mt-5 text-xl font-bold text-[var(--bj-text-main)] sm:text-2xl">
        Sedang Bantu Jelasin...
      </h3>
      <p className="mt-1 text-sm text-[var(--bj-text-muted)]">
        Mohon tunggu sebentar, kami sedang merapikan bahasanya.
      </p>

      {/* Steps indicator */}
      <div className="mt-6 w-full max-w-sm space-y-2.5 text-left">
        {steps.map((s, idx) => {
          const isDone = idx < stepIndex
          const isCurrent = idx === stepIndex
          return (
            <div
              key={idx}
              className={`flex items-center gap-3 rounded-xl border p-2.5 text-xs transition ${
                isCurrent
                  ? 'border-orange-300 bg-orange-50 font-bold text-orange-900 dark:border-orange-900/60 dark:bg-orange-950/30 dark:text-orange-200'
                  : isDone
                  ? 'border-emerald-200 bg-emerald-50/50 text-emerald-800 dark:border-emerald-950 dark:bg-emerald-950/20 dark:text-emerald-400'
                  : 'border-stone-100 bg-stone-50/50 text-stone-400 dark:border-stone-800 dark:bg-stone-900/20'
              }`}
            >
              <div
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] ${
                  isDone
                    ? 'bg-emerald-600 text-white'
                    : isCurrent
                    ? 'bg-orange-600 text-white'
                    : 'bg-stone-200 text-stone-600 dark:bg-stone-800 dark:text-stone-400'
                }`}
              >
                {idx + 1}
              </div>
              <span className="truncate">{s.label}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
