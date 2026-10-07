import React, { useState, useEffect } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import Hero from '../components/Hero'
import Workspace from '../components/Workspace'
import ExampleComparisonSection from '../components/ExampleComparisonSection'
import WhySection from '../components/WhySection'
import HowToUseSection from '../components/HowToUseSection'
import FaqSection from '../components/FaqSection'
import CtaSection from '../components/CtaSection'
import HistoryDrawer from '../components/HistoryDrawer'
import Toast from '../components/Toast'
import type { HistoryItem, SimplifyResult } from '../types'
import {
  getHistory,
  removeHistoryItem,
  clearAllHistory,
} from '../utils/storage'

export const Route = createFileRoute('/')({ component: BantuJelasinApp })

function BantuJelasinApp() {
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([])
  const [isHistoryOpen, setIsHistoryOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [selectedText, setSelectedText] = useState<string>('')
  const [selectedResult, setSelectedResult] = useState<SimplifyResult | null>(
    null
  )

  useEffect(() => {
    // Load local history on mount
    setHistoryItems(getHistory())

    const handleOpenHistoryEvent = () => setIsHistoryOpen(true)
    window.addEventListener('open-bj-history', handleOpenHistoryEvent)
    return () => window.removeEventListener('open-bj-history', handleOpenHistoryEvent)
  }, [])

  const handleToast = (msg: string) => {
    setToastMessage(msg)
  }

  const handleScrollToWorkspace = () => {
    const el = document.getElementById('workspace-section')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      const textarea = document.getElementById('input-raw-text')
      if (textarea) {
        setTimeout(() => textarea.focus(), 300)
      }
    }
  }

  const handleSelectExampleText = (text: string) => {
    setSelectedText(text)
    setSelectedResult(null)
    handleScrollToWorkspace()
    handleToast('Teks contoh telah dimuat ke dalam kotak input.')
  }

  const handleSelectHistoryItem = (item: HistoryItem) => {
    setSelectedResult(item.result)
    setSelectedText(item.originalText)
    handleScrollToWorkspace()
    handleToast(`Riwayat "${item.title}" dibuka kembali.`)
  }

  const handleDeleteHistory = (id: string) => {
    const updated = removeHistoryItem(id)
    setHistoryItems(updated)
    handleToast('Riwayat berhasil dihapus.')
  }

  const handleClearAllHistory = () => {
    clearAllHistory()
    setHistoryItems([])
    handleToast('Semua riwayat telah dihapus.')
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <Hero onScrollToWorkspace={handleScrollToWorkspace} />

      {/* Main Two-Panel Workspace */}
      <Workspace
        onToast={handleToast}
        onHistoryUpdated={(newItems) => setHistoryItems(newItems)}
        externalSetText={selectedText}
        externalResult={selectedResult}
      />

      {/* Example Comparison Section ("Contoh hasil") */}
      <ExampleComparisonSection onSelectExample={handleSelectExampleText} />

      {/* Why Section ("Kenapa dibuat begini") */}
      <WhySection />

      {/* How To Use Section ("Cara pakai") */}
      <HowToUseSection />

      {/* FAQ Section ("Tanya jawab") */}
      <FaqSection />

      {/* Bottom CTA Section ("Siap mencoba sekarang?") */}
      <CtaSection onScrollToInput={handleScrollToWorkspace} />

      {/* History Slide-over Drawer */}
      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        items={historyItems}
        onSelect={handleSelectHistoryItem}
        onDelete={handleDeleteHistory}
        onClearAll={handleClearAllHistory}
      />

      {/* Floating Action Button to quickly open History on mobile/desktop if needed */}
      <button
        type="button"
        onClick={() => setIsHistoryOpen(true)}
        className="fixed bottom-6 left-6 z-30 hidden items-center gap-2 rounded-2xl border border-[var(--bj-card-border)] bg-[var(--bj-card)] px-4 py-3 text-xs font-bold text-[var(--bj-text-main)] shadow-lg transition hover:border-orange-300 hover:bg-orange-50/50 dark:hover:bg-stone-800 lg:flex"
        title="Lihat riwayat tersimpan"
      >
        <span className="h-2 w-2 rounded-full bg-orange-600" />
        <span>Buka Riwayat ({historyItems.length})</span>
      </button>

      {/* Toast Feedback */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </main>
  )
}
