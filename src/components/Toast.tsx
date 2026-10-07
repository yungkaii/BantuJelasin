import React, { useEffect } from 'react'
import { CheckCircle2, X } from 'lucide-react'

interface ToastProps {
  message: string | null
  onClose: () => void
}

export default function Toast({ message, onClose }: ToastProps) {
  useEffect(() => {
    if (!message) return
    const timer = setTimeout(() => {
      onClose()
    }, 3500)
    return () => clearTimeout(timer)
  }, [message, onClose])

  if (!message) return null

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl border border-stone-800 bg-stone-900 px-4 py-3 text-sm font-medium text-white shadow-xl animate-fade-in dark:border-stone-700 dark:bg-stone-800"
    >
      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
      <span>{message}</span>
      <button
        type="button"
        onClick={onClose}
        className="ml-2 rounded-lg p-1 text-stone-400 hover:text-white"
        aria-label="Tutup pemberitahuan"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}
