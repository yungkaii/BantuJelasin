import React, { useRef } from 'react'
import {
  Sparkles,
  RotateCcw,
  ClipboardPaste,
  AlertCircle,
  FileText,
} from 'lucide-react'
import type { SimplificationLevel } from '../types'
import DifficultySelector from './DifficultySelector'

interface TextInputProps {
  value: string
  onChange: (val: string) => void
  onSimplify: () => void
  onClear: () => void
  onSelectExample: (exampleId: string) => void
  onPaste: () => void
  level: SimplificationLevel
  onChangeLevel: (level: SimplificationLevel) => void
  isLoading: boolean
  error?: string | null
}

const MAX_CHARS = 6000

export default function TextInput({
  value,
  onChange,
  onSimplify,
  onClear,
  onSelectExample,
  onPaste,
  level,
  onChangeLevel,
  isLoading,
  error,
}: TextInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const charCount = value.length
  const isOverLimit = charCount > MAX_CHARS
  const isNearLimit = charCount > MAX_CHARS - 500

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Ctrl+Enter or Cmd+Enter to simplify
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault()
      if (value.trim() && !isLoading && !isOverLimit) {
        onSimplify()
      }
    }
  }

  return (
    <div className="bj-card flex flex-col rounded-3xl p-5 sm:p-7 shadow-xs">
      {/* Panel Header */}
      <div>
        <h2 className="text-xl font-bold tracking-tight text-[var(--bj-text-main)] sm:text-2xl">
          Tempel atau tulis teks yang ingin dijelaskan
        </h2>
        <p className="mt-1 text-sm text-[var(--bj-text-muted)]">
          Contoh: surat dari bank, tagihan listrik, pengumuman dari kantor
          desa, atau hasil laboratorium.
        </p>
      </div>

      {/* Style / Difficulty Selector */}
      <div className="mt-4">
        <DifficultySelector
          value={level}
          onChange={onChangeLevel}
          disabled={isLoading}
        />
      </div>

      {/* Textarea Wrapper */}
      <div className="relative mt-4">
        <label htmlFor="input-raw-text" className="sr-only">
          Teks yang ingin disederhanakan
        </label>
        <textarea
          id="input-raw-text"
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          rows={9}
          placeholder="Tulis atau tempel teksnya di sini..."
          className="w-full resize-y rounded-2xl border border-[var(--bj-card-border)] bg-[var(--bj-card)] p-4 text-base leading-relaxed text-[var(--bj-text-main)] placeholder-[var(--bj-text-soft)] transition focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 focus:outline-hidden disabled:bg-stone-100 disabled:opacity-70 dark:disabled:bg-stone-900 sm:text-lg"
          aria-invalid={isOverLimit || !!error}
          aria-describedby="char-counter error-text"
        />

        {/* Floating Quick Paste button when textarea is empty */}
        {value.length === 0 && !isLoading && (
          <button
            type="button"
            onClick={onPaste}
            className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-xl border border-stone-200 bg-white/90 px-3 py-1.5 text-xs font-semibold text-stone-700 shadow-xs backdrop-blur-xs transition hover:bg-stone-50 dark:border-stone-700 dark:bg-stone-800/90 dark:text-stone-200"
            title="Tempel dari papan klip (clipboard)"
          >
            <ClipboardPaste className="h-3.5 w-3.5 text-orange-600" />
            <span>Tempel teks</span>
          </button>
        )}
      </div>

      {/* Character Counter & Warnings */}
      <div className="mt-2 flex items-center justify-between text-xs text-[var(--bj-text-soft)]">
        <div className="flex items-center gap-1.5">
          <span className="hidden sm:inline">Tips: Tekan</span>
          <kbd className="hidden rounded bg-stone-100 px-1.5 py-0.5 font-mono text-[10px] text-stone-700 dark:bg-stone-800 dark:text-stone-300 sm:inline">
            Ctrl + Enter
          </kbd>
          <span className="hidden sm:inline">untuk langsung memproses</span>
        </div>

        <div
          id="char-counter"
          className={`font-medium ${
            isOverLimit
              ? 'font-bold text-red-600'
              : isNearLimit
              ? 'text-amber-600'
              : 'text-[var(--bj-text-soft)]'
          }`}
        >
          {charCount.toLocaleString('id-ID')} / {MAX_CHARS.toLocaleString('id-ID')} karakter
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div
          id="error-text"
          className="mt-3 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300"
          role="alert"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
          <span>{error}</span>
        </div>
      )}

      {/* Quick Example Pills matching mockup */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-[var(--bj-text-soft)]">
          Coba contoh:
        </span>
        <button
          type="button"
          onClick={() => onSelectExample('tagihan-listrik')}
          disabled={isLoading}
          className="rounded-xl border border-stone-200 bg-[var(--bj-card-muted)] px-3 py-1.5 text-xs font-medium text-[var(--bj-text-main)] transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-900 dark:border-stone-700 dark:hover:bg-orange-950/30 dark:hover:text-orange-200"
        >
          Tagihan listrik
        </button>
        <button
          type="button"
          onClick={() => onSelectExample('surat-bank')}
          disabled={isLoading}
          className="rounded-xl border border-stone-200 bg-[var(--bj-card-muted)] px-3 py-1.5 text-xs font-medium text-[var(--bj-text-main)] transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-900 dark:border-stone-700 dark:hover:bg-orange-950/30 dark:hover:text-orange-200"
        >
          Surat bank
        </button>
        <button
          type="button"
          onClick={() => onSelectExample('hasil-lab')}
          disabled={isLoading}
          className="rounded-xl border border-stone-200 bg-[var(--bj-card-muted)] px-3 py-1.5 text-xs font-medium text-[var(--bj-text-main)] transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-900 dark:border-stone-700 dark:hover:bg-orange-950/30 dark:hover:text-orange-200"
        >
          Hasil lab
        </button>
        <button
          type="button"
          onClick={() => onSelectExample('kontrak-hukum')}
          disabled={isLoading}
          className="rounded-xl border border-stone-200 bg-[var(--bj-card-muted)] px-3 py-1.5 text-xs font-medium text-[var(--bj-text-main)] transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-900 dark:border-stone-700 dark:hover:bg-orange-950/30 dark:hover:text-orange-200"
        >
          Kontrak kerja
        </button>
      </div>

      {/* Main Action Buttons */}
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        {/* Sederhanakan Button (Orange Primary matching mockup) */}
        <button
          type="button"
          onClick={onSimplify}
          disabled={!value.trim() || isLoading || isOverLimit}
          className="elderly-scale-btn flex flex-1 items-center justify-center gap-2 rounded-2xl bg-orange-600 px-6 py-3.5 text-base font-bold text-white shadow-md transition hover:bg-orange-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-stone-300 disabled:text-stone-500 disabled:shadow-none dark:disabled:bg-stone-800 dark:disabled:text-stone-600"
        >
          <Sparkles className="h-5 w-5" />
          <span>{isLoading ? 'Sedang Menyederhanakan...' : 'Sederhanakan'}</span>
        </button>

        {/* Kosongkan Button */}
        <button
          type="button"
          onClick={onClear}
          disabled={!value.trim() || isLoading}
          className="elderly-scale-btn flex items-center justify-center gap-2 rounded-2xl border border-[var(--bj-card-border)] bg-[var(--bj-card)] px-5 py-3.5 text-base font-semibold text-[var(--bj-text-muted)] transition hover:border-stone-400 hover:bg-[var(--bj-card-muted)] hover:text-[var(--bj-text-main)] disabled:cursor-not-allowed disabled:opacity-40"
          title="Kosongkan teks di dalam kotak"
        >
          <RotateCcw className="h-4 w-4" />
          <span>Kosongkan</span>
        </button>
      </div>
    </div>
  )
}
