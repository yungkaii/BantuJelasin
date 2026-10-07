import React from 'react'
import type { SimplificationLevel } from '../types'
import { Sparkles, Smile, FileText } from 'lucide-react'

interface DifficultySelectorProps {
  value: SimplificationLevel
  onChange: (level: SimplificationLevel) => void
  disabled?: boolean
}

export default function DifficultySelector({
  value,
  onChange,
  disabled = false,
}: DifficultySelectorProps) {
  const options: Array<{
    id: SimplificationLevel
    label: string
    sublabel: string
    icon: React.ReactNode
  }> = [
    {
      id: 'very_simple',
      label: 'Sangat sederhana',
      sublabel: 'Kalimat paling santai, cocok untuk orang tua & lansia',
      icon: <Smile className="h-4 w-4 text-amber-600" />,
    },
    {
      id: 'simple',
      label: 'Sederhana',
      sublabel: 'Bahasa sehari-hari yang rapi dan teratur (standar)',
      icon: <Sparkles className="h-4 w-4 text-orange-600" />,
    },
    {
      id: 'detailed',
      label: 'Detail',
      sublabel: 'Lengkap beserta penjelasan konteks dan rincian dokumen',
      icon: <FileText className="h-4 w-4 text-blue-600" />,
    },
  ]

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold tracking-wide text-[var(--bj-text-muted)] uppercase">
          Gaya Penjelasan:
        </label>
        <span className="text-xs text-[var(--bj-text-soft)]">
          {value === 'very_simple'
            ? 'Paling santai & ringkas'
            : value === 'simple'
            ? 'Standar seimbang'
            : 'Lengkap dan mendalam'}
        </span>
      </div>

      <div
        className="grid grid-cols-1 gap-2 sm:grid-cols-3"
        role="radiogroup"
        aria-label="Pilihan Tingkat Penyederhanaan"
      >
        {options.map((option) => {
          const isSelected = value === option.id
          return (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              disabled={disabled}
              onClick={() => onChange(option.id)}
              className={`flex flex-col items-start rounded-xl border p-2.5 text-left transition ${
                isSelected
                  ? 'border-orange-500 bg-orange-50/80 ring-2 ring-orange-500/20 dark:bg-orange-950/30'
                  : 'border-[var(--bj-card-border)] bg-[var(--bj-card)] hover:border-orange-200 hover:bg-[var(--bj-card-muted)]'
              } ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
            >
              <div className="flex w-full items-center justify-between gap-1">
                <span className="flex items-center gap-1.5 text-xs font-bold text-[var(--bj-text-main)] sm:text-sm">
                  {option.icon}
                  {option.label}
                </span>
                {isSelected && (
                  <span className="h-2 w-2 rounded-full bg-orange-600" />
                )}
              </div>
              <span className="mt-1 text-[11px] leading-snug text-[var(--bj-text-soft)]">
                {option.sublabel}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
