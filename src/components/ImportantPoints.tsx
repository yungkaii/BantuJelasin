import React from 'react'
import type { KeyPoint } from '../types'
import {
  Calendar,
  Coins,
  CheckCircle,
  AlertOctagon,
  FileCheck,
  AlertTriangle,
} from 'lucide-react'

interface ImportantPointsProps {
  points: KeyPoint[]
}

export default function ImportantPoints({ points }: ImportantPointsProps) {
  if (!points || points.length === 0) return null

  const getCategoryConfig = (category: KeyPoint['category']) => {
    switch (category) {
      case 'date':
        return {
          icon: <Calendar className="h-4 w-4 text-amber-600 dark:text-amber-400" />,
          bg: 'bg-amber-50 dark:bg-amber-950/30',
          border: 'border-amber-200 dark:border-amber-900/60',
          badgeText: 'Batas Tanggal',
        }
      case 'cost':
        return {
          icon: <Coins className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />,
          bg: 'bg-emerald-50 dark:bg-emerald-950/30',
          border: 'border-emerald-200 dark:border-emerald-900/60',
          badgeText: 'Biaya / Uang',
        }
      case 'obligation':
        return {
          icon: <CheckCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />,
          bg: 'bg-blue-50 dark:bg-blue-950/30',
          border: 'border-blue-200 dark:border-blue-900/60',
          badgeText: 'Hal yang Harus Dilakukan',
        }
      case 'prohibition':
        return {
          icon: <AlertOctagon className="h-4 w-4 text-red-600 dark:text-red-400" />,
          bg: 'bg-red-50 dark:bg-red-950/30',
          border: 'border-red-200 dark:border-red-900/60',
          badgeText: 'Hal yang Dilarang / Dihindari',
        }
      case 'requirement':
        return {
          icon: <FileCheck className="h-4 w-4 text-purple-600 dark:text-purple-400" />,
          bg: 'bg-purple-50 dark:bg-purple-950/30',
          border: 'border-purple-200 dark:border-purple-900/60',
          badgeText: 'Syarat & Berkas',
        }
      case 'risk':
        return {
          icon: <AlertTriangle className="h-4 w-4 text-rose-600 dark:text-rose-400" />,
          bg: 'bg-rose-50 dark:bg-rose-950/30',
          border: 'border-rose-200 dark:border-rose-900/60',
          badgeText: 'Risiko Bila Terlambat',
        }
      default:
        return {
          icon: <CheckCircle className="h-4 w-4 text-stone-600" />,
          bg: 'bg-stone-50 dark:bg-stone-900',
          border: 'border-stone-200 dark:border-stone-800',
          badgeText: 'Poin Penting',
        }
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold tracking-wider text-[var(--bj-text-muted)] uppercase">
          Poin-Poin Penting Dokumen:
        </h4>
        <span className="text-xs text-[var(--bj-text-soft)]">
          {points.length} informasi penting terdeteksi
        </span>
      </div>

      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {points.map((point, index) => {
          const config = getCategoryConfig(point.category)
          return (
            <div
              key={index}
              className={`flex items-start gap-3 rounded-xl border ${config.border} ${config.bg} p-3.5 transition`}
            >
              <div className="mt-0.5 shrink-0">{config.icon}</div>
              <div className="min-w-0 flex-1">
                <span className="text-[11px] font-bold tracking-wide text-[var(--bj-text-muted)] uppercase">
                  {point.label || config.badgeText}
                </span>
                <p className="mt-0.5 text-sm font-semibold leading-snug text-[var(--bj-text-main)]">
                  {point.text}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
