import React, { useState, useEffect } from 'react'
import TextInput from './TextInput'
import ResultPanel from './ResultPanel'
import type { HistoryItem, SimplificationLevel, SimplifyResult } from '../types'
import { PREDEFINED_EXAMPLES } from '../utils/examples'
import { saveToHistory, getApiKey } from '../utils/storage'
import { simplifyTextServerFn } from '../server/simplify'

interface WorkspaceProps {
  onToast: (msg: string) => void
  onHistoryUpdated: (newHistory: HistoryItem[]) => void
  externalSetText?: string
  externalResult?: SimplifyResult | null
}

export default function Workspace({
  onToast,
  onHistoryUpdated,
  externalSetText,
  externalResult,
}: WorkspaceProps) {
  const [inputText, setInputText] = useState('')
  const [level, setLevel] = useState<SimplificationLevel>('simple')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<SimplifyResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Sync external text trigger (from clicking example or history item)
  useEffect(() => {
    if (externalSetText) {
      setInputText(externalSetText)
      setError(null)
    }
  }, [externalSetText])

  useEffect(() => {
    if (externalResult) {
      setResult(externalResult)
      setInputText(externalResult.originalText)
      setLevel(externalResult.level)
      setError(null)
    }
  }, [externalResult])

  const handleSimplify = async () => {
    const textToProcess = inputText.trim()
    if (!textToProcess) {
      setError('Silakan tulis atau tempel teks terlebih dahulu.')
      return
    }

    if (textToProcess.length > 6000) {
      setError('Teks terlalu panjang. Maksimal 6.000 karakter.')
      return
    }

    setError(null)
    setIsLoading(true)

    try {
      const clientApiKey = typeof window !== 'undefined' ? getApiKey() : ''
      // Call TanStack Start Server Function
      const data = await simplifyTextServerFn({
        data: {
          text: textToProcess,
          level,
          apiKey: clientApiKey || undefined,
        },
      })

      setResult(data)
      setIsLoading(false)

      // Save to localStorage history
      const updatedHistory = saveToHistory(data)
      onHistoryUpdated(updatedHistory)
      onToast('Teks berhasil disederhanakan!')
    } catch (err) {
      setIsLoading(false)
      const message =
        err instanceof Error
          ? err.message
          : 'Terjadi kesalahan saat memproses teks. Silakan coba lagi.'
      setError(message)
      onToast('Gagal memproses teks. Coba lagi.')
    }
  }

  const handleClear = () => {
    setInputText('')
    setResult(null)
    setError(null)
    onToast('Kotak teks telah dikosongkan.')
  }

  const handleSelectExample = (exampleId: string) => {
    const found = PREDEFINED_EXAMPLES.find((e) => e.id === exampleId)
    if (found) {
      setInputText(found.originalText)
      setError(null)
      onToast(`Contoh "${found.title}" dimuat.`)
    }
  }

  const handlePaste = async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        const text = await navigator.clipboard.readText()
        if (text && text.trim()) {
          setInputText(text.trim())
          setError(null)
          onToast('Teks berhasil ditempel dari papan klip!')
        } else {
          onToast('Papan klip (clipboard) Anda kosong.')
        }
      }
    } catch {
      onToast('Izin akses papan klip tidak diberikan oleh browser.')
    }
  }

  return (
    <section id="workspace-section" className="px-4 py-6 sm:px-6 sm:py-8">
      <div className="mx-auto max-w-6xl">
        {/* Two Panel Workspace Grid */}
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Panel Kiri: Teks Rumit */}
          <div className="w-full">
            <TextInput
              value={inputText}
              onChange={(val) => {
                setInputText(val)
                if (error) setError(null)
              }}
              onSimplify={handleSimplify}
              onClear={handleClear}
              onSelectExample={handleSelectExample}
              onPaste={handlePaste}
              level={level}
              onChangeLevel={(lvl) => setLevel(lvl)}
              isLoading={isLoading}
              error={error}
            />
          </div>

          {/* Panel Kanan: Versi Mudah Dipahami */}
          <div className="w-full">
            <ResultPanel
              result={result}
              isLoading={isLoading}
              error={error}
              onRetry={handleSimplify}
              onToast={onToast}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

