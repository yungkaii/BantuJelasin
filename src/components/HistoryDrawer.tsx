import React, { useState } from 'react'
import type { HistoryItem, SimplifyResult } from '../types'
import {
  X,
  Trash2,
  Clock,
  Search,
  ExternalLink,
  History,
  FileText,
  AlertCircle,
} from 'lucide-react'

interface HistoryDrawerProps {
  isOpen: boolean
  onClose: () => void
  items: HistoryItem[]
  onSelect: (item: HistoryItem) => void
  onDelete: (id: string) => void
  onClearAll: () => void
}

export default function HistoryDrawer({
  isOpen,
  onClose,
  items,
  onSelect,
  onDelete,
  onClearAll,
}: HistoryDrawerProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [confirmClear, setConfirmClear] = useState(false)

  if (!isOpen) return null

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.originalText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.preview.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const formatTime = (ts: number) => {
    const diffSec = Math.floor((Date.now() - ts) / 1000)
    if (diffSec < 60) return 'Baru saja'
    const diffMin = Math.floor(diffSec / 60)
    if (diffMin < 60) return `${diffMin} menit yang lalu`
    const diffHour = Math.floor(diffMin / 60)
    if (diffHour < 24) return `${diffHour} jam yang lalu`
    const diffDays = Math.floor(diffHour / 24)
    return `${diffDays} hari yang lalu`
  }

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-label="Riwayat Teks yang Disederhanakan"
    >
      {/* Background click */}
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Container */}
      <div className="relative z-10 flex h-full w-full max-w-md flex-col bg-[var(--bj-card)] p-5 shadow-2xl transition-transform dark:border-l dark:border-stone-800 sm:p-6 animate-fade-in">
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-[var(--bj-card-border)] pb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-950/50">
              <History className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[var(--bj-text-main)]">
                Riwayat Tersimpan
              </h3>
              <p className="text-xs text-[var(--bj-text-soft)]">
                {items.length} teks tersimpan di browser Anda
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-stone-200 p-2 text-stone-500 hover:bg-stone-100 hover:text-stone-800 dark:border-stone-800 dark:hover:bg-stone-800"
            aria-label="Tutup riwayat"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Search input if items exist */}
        {items.length > 0 && (
          <div className="relative mt-4">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari teks di riwayat..."
              className="w-full rounded-xl border border-[var(--bj-card-border)] bg-[var(--bj-card-muted)] py-2.5 pl-10 pr-4 text-sm text-[var(--bj-text-main)] placeholder-stone-400 focus:border-orange-500 focus:outline-hidden"
            />
          </div>
        )}

        {/* Items List */}
        <div className="mt-4 flex-1 overflow-y-auto space-y-3">
          {/* Empty state if no items at all */}
          {items.length === 0 && (
            <div className="flex h-full flex-col items-center justify-center py-12 text-center">
              <FileText className="h-12 w-12 text-stone-300 dark:text-stone-700" />
              <h4 className="mt-3 text-base font-bold text-[var(--bj-text-main)]">
                Riwayat Masih Kosong
              </h4>
              <p className="mt-1 max-w-xs text-xs leading-relaxed text-[var(--bj-text-muted)]">
                Setiap kali Anda menekan tombol Sederhanakan, teks dan hasilnya akan otomatis tersimpan di sini.
              </p>
            </div>
          )}

          {/* Empty search results */}
          {items.length > 0 && filteredItems.length === 0 && (
            <div className="py-10 text-center text-sm text-stone-500">
              Tidak ada riwayat yang cocok dengan "{searchQuery}".
            </div>
          )}

          {/* Render list of items */}
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group rounded-2xl border border-[var(--bj-card-border)] bg-[var(--bj-card)] p-4 shadow-xs transition hover:border-orange-300 hover:shadow-sm"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-xs font-bold text-orange-600">
                  {item.result.title || 'Dokumen'}
                </span>
                <span className="flex items-center gap-1 text-[11px] text-[var(--bj-text-soft)]">
                  <Clock className="h-3 w-3" />
                  {formatTime(item.timestamp)}
                </span>
              </div>

              <p className="mt-1 text-sm font-semibold line-clamp-2 text-[var(--bj-text-main)]">
                {item.preview}
              </p>

              <p className="mt-1 font-mono text-xs text-stone-400 line-clamp-1">
                "{item.originalText.slice(0, 70)}..."
              </p>

              <div className="mt-3 flex items-center justify-between border-t border-stone-100 pt-2.5 dark:border-stone-800">
                <button
                  type="button"
                  onClick={() => {
                    onSelect(item)
                    onClose()
                  }}
                  className="inline-flex items-center gap-1 text-xs font-bold text-orange-600 hover:underline"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span>Buka kembali</span>
                </button>

                <button
                  type="button"
                  onClick={() => onDelete(item.id)}
                  className="rounded-lg p-1 text-stone-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40"
                  title="Hapus item ini dari riwayat"
                  aria-label="Hapus dari riwayat"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Drawer Footer Actions */}
        {items.length > 0 && (
          <div className="border-t border-[var(--bj-card-border)] pt-4">
            {!confirmClear ? (
              <button
                type="button"
                onClick={() => setConfirmClear(true)}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-stone-200 py-2.5 text-xs font-semibold text-stone-600 hover:border-red-300 hover:bg-red-50 hover:text-red-700 dark:border-stone-800 dark:text-stone-400 dark:hover:bg-red-950/30"
              >
                <Trash2 className="h-4 w-4" />
                <span>Kosongkan Seluruh Riwayat</span>
              </button>
            ) : (
              <div className="space-y-2 rounded-xl bg-red-50 p-3 text-center dark:bg-red-950/30">
                <p className="text-xs font-bold text-red-800 dark:text-red-200">
                  Hapus semua riwayat tersimpan?
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      onClearAll()
                      setConfirmClear(false)
                    }}
                    className="flex-1 rounded-lg bg-red-600 py-1.5 text-xs font-bold text-white hover:bg-red-700"
                  >
                    Ya, Hapus
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmClear(false)}
                    className="flex-1 rounded-lg border border-stone-300 py-1.5 text-xs font-semibold text-stone-700 hover:bg-stone-100 dark:border-stone-700 dark:text-stone-300"
                  >
                    Batal
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
