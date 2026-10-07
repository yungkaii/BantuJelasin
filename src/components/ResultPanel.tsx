import React, { useState, useEffect } from 'react'
import type { SimplifyResult } from '../types'
import {
  Copy,
  Check,
  Volume2,
  VolumeX,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Layers,
  FileText,
  AlertTriangle,
  Clock,
  Gauge,
  ListOrdered,
} from 'lucide-react'
import EmptyState from './EmptyState'
import LoadingState from './LoadingState'
import SummaryCard from './SummaryCard'
import ImportantPoints from './ImportantPoints'
import TermExplanation from './TermExplanation'
import { speakText, stopSpeech, isSpeaking } from '../utils/speech'

interface ResultPanelProps {
  result: SimplifyResult | null
  isLoading: boolean
  error: string | null
  onRetry?: () => void
  onToast: (msg: string) => void
}

export default function ResultPanel({
  result,
  isLoading,
  error,
  onRetry,
  onToast,
}: ResultPanelProps) {
  const [activeTab, setActiveTab] = useState<'simplified' | 'original'>('simplified')
  const [copied, setCopied] = useState(false)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)

  // Reset tab and audio when result changes
  useEffect(() => {
    setActiveTab('simplified')
    stopSpeech()
    setIsPlayingAudio(false)
  }, [result])

  const handleCopy = async () => {
    if (!result) return
    const textToCopy =
      activeTab === 'simplified'
        ? `${result.summary}\n\n${result.simplifiedBullets.join('\n')}`
        : result.originalText

    try {
      await navigator.clipboard.writeText(textToCopy)
      setCopied(true)
      onToast('Teks berhasil disalin ke papan klip!')
      setTimeout(() => setCopied(false), 2000)
    } catch {
      onToast('Gagal menyalin teks ke papan klip.')
    }
  }

  const handleToggleSpeech = () => {
    if (!result) return

    if (isPlayingAudio || isSpeaking()) {
      stopSpeech()
      setIsPlayingAudio(false)
      onToast('Pembacaan suara dihentikan.')
    } else {
      const speechScript = `Penjelasan sederhana. ${result.summary}. Poin-poin penting: ${result.simplifiedBullets.join('. ')}. ${
        result.actionSteps.length > 0
          ? 'Langkah yang perlu dilakukan: ' + result.actionSteps.join('. ')
          : ''
      }`

      setIsPlayingAudio(true)
      onToast('Mulai membacakan teks...')
      speakText(speechScript, {
        onStart: () => setIsPlayingAudio(true),
        onEnd: () => setIsPlayingAudio(false),
        onError: () => {
          setIsPlayingAudio(false)
          onToast('Terjadi kendala saat membacakan suara.')
        },
      })
    }
  }

  return (
    <div className="bj-card flex flex-col rounded-3xl p-5 sm:p-7 shadow-xs">
      {/* Top Header & Tab Switcher matching mockup */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-[var(--bj-text-main)] sm:text-2xl">
            Penjelasan sederhana
          </h2>
          <p className="mt-0.5 text-xs text-[var(--bj-text-soft)]">
            {result ? 'Bahasa sehari-hari yang mudah dipahami' : 'Hasil proses teks'}
          </p>
        </div>

        {/* View Switcher: [Versi sederhana] [Teks asli] */}
        <div className="flex items-center gap-1.5 self-start rounded-xl border border-stone-200 bg-stone-100/80 p-1 dark:border-stone-800 dark:bg-stone-900 sm:self-auto">
          <span className="sr-only">Tampilkan pilihan versi:</span>
          <button
            type="button"
            onClick={() => setActiveTab('simplified')}
            className={`rounded-lg px-3 py-1.5 text-xs font-bold transition sm:text-sm ${
              activeTab === 'simplified'
                ? 'bg-black text-white shadow-xs dark:bg-white dark:text-black'
                : 'text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100'
            }`}
          >
            Versi sederhana
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('original')}
            className={`rounded-lg px-3 py-1.5 text-xs font-bold transition sm:text-sm ${
              activeTab === 'original'
                ? 'bg-black text-white shadow-xs dark:bg-white dark:text-black'
                : 'text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100'
            }`}
          >
            Teks asli
          </button>
        </div>
      </div>

      <div className="mt-5 flex-1">
        {/* Loading State */}
        {isLoading && <LoadingState />}

        {/* Error State */}
        {!isLoading && error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center dark:border-red-900/50 dark:bg-red-950/40">
            <AlertTriangle className="mx-auto h-8 w-8 text-red-600" />
            <h3 className="mt-3 text-lg font-bold text-red-900 dark:text-red-200">
              Gagal Memproses Teks
            </h3>
            <p className="mt-1 text-sm text-red-700 dark:text-red-300">{error}</p>
            {onRetry && (
              <button
                type="button"
                onClick={onRetry}
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Coba Lagi</span>
              </button>
            )}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && !result && <EmptyState />}

        {/* Success State */}
        {!isLoading && !error && result && (
          <div className="space-y-6 animate-fade-in">
            {/* Disclaimer Box matching mockup */}
            <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/80 p-4 text-xs leading-relaxed text-emerald-950 dark:border-emerald-900/60 dark:bg-emerald-950/30 dark:text-emerald-300 sm:text-sm">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
              <p>{result.disclaimer}</p>
            </div>

            {/* If tab is 'simplified' */}
            {activeTab === 'simplified' && (
              <>
                {/* Meta Indicators: Difficulty badge, reading time, level */}
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="inline-flex items-center gap-1 rounded-full border border-stone-200 bg-[var(--bj-card-muted)] px-3 py-1 font-semibold text-[var(--bj-text-main)] dark:border-stone-800">
                    <Gauge className="h-3.5 w-3.5 text-orange-600" />
                    <span>Tingkat teks asli: {result.difficulty.label}</span>
                  </span>

                  <span className="inline-flex items-center gap-1 rounded-full border border-stone-200 bg-[var(--bj-card-muted)] px-3 py-1 font-semibold text-[var(--bj-text-main)] dark:border-stone-800">
                    <Clock className="h-3.5 w-3.5 text-blue-600" />
                    <span>Baca ~{result.difficulty.readingTimeMinutes} menit</span>
                  </span>

                  <span className="inline-flex items-center gap-1 rounded-full border border-stone-200 bg-[var(--bj-card-muted)] px-3 py-1 font-semibold text-[var(--bj-text-main)] dark:border-stone-800">
                    <Sparkles className="h-3.5 w-3.5 text-amber-600" />
                    <span>
                      Gaya:{' '}
                      {result.level === 'very_simple'
                        ? 'Sangat Santai'
                        : result.level === 'detailed'
                        ? 'Detail Lengkap'
                        : 'Bahasa Sehari-hari'}
                    </span>
                  </span>
                </div>

                {/* Summary Card */}
                <SummaryCard
                  summary={result.summary}
                  title="Ringkasan Cepat Dokumen:"
                />

                {/* Main Simplified Explanation Bullets */}
                <div className="rounded-2xl border border-[var(--bj-card-border)] bg-[var(--bj-card)] p-5 dark:border-stone-800">
                  <h3 className="text-xs font-bold tracking-wider text-[var(--bj-text-muted)] uppercase">
                    Versi Bahasa Mudah:
                  </h3>
                  <ul className="mt-3 space-y-3.5">
                    {result.simplifiedBullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-orange-600" />
                        <span className="elderly-text-boost text-base leading-relaxed font-medium text-[var(--bj-text-main)] sm:text-lg">
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Checklist for Reader / Elderly */}
                {result.actionSteps && result.actionSteps.length > 0 && (
                  <div className="rounded-2xl border border-stone-200 bg-stone-50/70 p-5 dark:border-stone-800 dark:bg-stone-900/40">
                    <h4 className="flex items-center gap-1.5 text-xs font-bold tracking-wider text-[var(--bj-text-muted)] uppercase">
                      <ListOrdered className="h-4 w-4 text-orange-600" />
                      <span>Langkah Yang Perlu Kamu Lakukan:</span>
                    </h4>
                    <ol className="mt-3 space-y-2">
                      {result.actionSteps.map((step, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 text-sm font-semibold text-[var(--bj-text-main)] sm:text-base"
                        >
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-600 text-xs font-bold text-white">
                            {idx + 1}
                          </span>
                          <span className="leading-snug">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                {/* Important Points (Kewajiban, Larangan, Tanggal, Biaya, Syarat, Risiko) */}
                <ImportantPoints points={result.keyPoints} />

                {/* Jargon / Term Explanation */}
                <TermExplanation terms={result.terms} />

                {/* Ambiguity Flag Alert if present */}
                {result.ambiguousParts && result.ambiguousParts.length > 0 && (
                  <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-4 text-xs text-amber-900 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-200 sm:text-sm">
                    <span className="font-bold">⚠️ Perhatian Khusus: </span>
                    {result.ambiguousParts.join(' ')}
                  </div>
                )}
              </>
            )}

            {/* If tab is 'original' */}
            {activeTab === 'original' && (
              <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5 dark:border-stone-800 dark:bg-stone-900/50">
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <span className="font-bold tracking-wider uppercase">
                    Tulisan Asli Dari Dokumen:
                  </span>
                  <span>{result.difficulty.wordCount} kata</span>
                </div>
                <div className="mt-3 font-mono text-sm leading-relaxed whitespace-pre-wrap text-stone-800 dark:text-stone-200 sm:text-base">
                  {result.originalText}
                </div>
              </div>
            )}

            {/* Bottom Action Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--bj-card-border)] pt-4">
              <div className="flex flex-wrap items-center gap-2">
                {/* Audio Text-to-Speech Button */}
                <button
                  type="button"
                  onClick={handleToggleSpeech}
                  className={`elderly-scale-btn flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-bold transition shadow-xs ${
                    isPlayingAudio
                      ? 'border-orange-500 bg-orange-600 text-white animate-pulse'
                      : 'border-stone-200 bg-[var(--bj-card)] text-[var(--bj-text-main)] hover:border-orange-300 hover:bg-orange-50/50 dark:border-stone-700 dark:hover:bg-orange-950/20'
                  }`}
                  title={
                    isPlayingAudio
                      ? 'Hentikan pembacaan suara'
                      : 'Dengarkan hasil penjelasan dibacakan'
                  }
                  aria-pressed={isPlayingAudio}
                >
                  {isPlayingAudio ? (
                    <>
                      <VolumeX className="h-4 w-4" />
                      <span>Hentikan Suara</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="h-4 w-4 text-orange-600" />
                      <span>Dengarkan Hasil</span>
                    </>
                  )}
                </button>

                {/* Copy Button */}
                <button
                  type="button"
                  onClick={handleCopy}
                  className="elderly-scale-btn flex items-center gap-2 rounded-xl border border-stone-200 bg-[var(--bj-card)] px-4 py-2.5 text-sm font-semibold text-[var(--bj-text-main)] shadow-xs transition hover:border-stone-400 hover:bg-[var(--bj-card-muted)] dark:border-stone-700"
                  title="Salin hasil ke papan klip"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 text-emerald-600" />
                      <span>Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 text-stone-600 dark:text-stone-300" />
                      <span>Salin Hasil</span>
                    </>
                  )}
                </button>
              </div>

              <div className="text-xs text-[var(--bj-text-soft)]">
                Diproses dengan aman di Bantu Jelasin
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
