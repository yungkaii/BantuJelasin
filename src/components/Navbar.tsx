import React, { useState, useEffect } from 'react'
import {
  Sparkles,
  Sun,
  Moon,
  Glasses,
  History,
  Menu,
  X,
  BookOpen,
  HelpCircle,
  CheckCircle2,
} from 'lucide-react'
import { getElderlyMode, setElderlyMode, getHistory } from '../utils/storage'

interface NavbarProps {
  onOpenHistory?: () => void
  historyCount?: number
}

export default function Navbar({ onOpenHistory, historyCount }: NavbarProps) {
  const [isDark, setIsDark] = useState(false)
  const [isElderly, setIsElderly] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [localCount, setLocalCount] = useState(0)

  useEffect(() => {
    // Sync theme
    const theme = document.documentElement.getAttribute('data-theme')
    setIsDark(theme === 'dark')

    // Sync elderly mode
    setIsElderly(getElderlyMode())

    // Sync history count
    setLocalCount(getHistory().length)

    const handleStorage = () => {
      setLocalCount(getHistory().length)
    }
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  useEffect(() => {
    if (typeof historyCount === 'number') {
      setLocalCount(historyCount)
    }
  }, [historyCount])

  const toggleTheme = () => {
    const nextDark = !isDark
    setIsDark(nextDark)
    const root = document.documentElement
    const themeStr = nextDark ? 'dark' : 'light'
    root.classList.remove('light', 'dark')
    root.classList.add(themeStr)
    root.setAttribute('data-theme', themeStr)
    try {
      localStorage.setItem('theme', themeStr)
    } catch {
      // Ignore
    }
  }

  const toggleElderly = () => {
    const next = !isElderly
    setIsElderly(next)
    setElderlyMode(next)
  }

  const handleOpenHistory = () => {
    if (onOpenHistory) {
      onOpenHistory()
    } else if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-bj-history'))
    }
  }

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--bj-card-border)] bg-[var(--bj-header-bg)] backdrop-blur-md transition-colors">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand Logo */}
        <a
          href="/"
          className="flex items-center gap-3 no-underline group"
          aria-label="Beranda Bantu Jelasin"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-600 text-white shadow-sm transition-transform group-hover:scale-105">
            <Sparkles className="h-6 w-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-[var(--bj-text-main)]">
                Bantu Jelasin
              </span>
            </div>
            <p className="hidden text-xs text-[var(--bj-text-soft)] sm:block">
              Mengubah teks rumit jadi bahasa yang mudah
            </p>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Navigasi Utama"
        >
          <button
            type="button"
            onClick={() => scrollToSection('contoh-hasil')}
            className="rounded-lg px-3.5 py-2 text-sm font-medium text-[var(--bj-text-muted)] transition hover:bg-[var(--bj-card-muted)] hover:text-[var(--bj-text-main)]"
          >
            Lihat contoh
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('cara-pakai')}
            className="rounded-lg px-3.5 py-2 text-sm font-medium text-[var(--bj-text-muted)] transition hover:bg-[var(--bj-card-muted)] hover:text-[var(--bj-text-main)]"
          >
            Cara pakai
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('tanya-jawab')}
            className="rounded-lg px-3.5 py-2 text-sm font-medium text-[var(--bj-text-muted)] transition hover:bg-[var(--bj-card-muted)] hover:text-[var(--bj-text-main)]"
          >
            Tanya jawab
          </button>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* History Button */}
          <button
            type="button"
            onClick={handleOpenHistory}
            className="relative flex items-center gap-1.5 rounded-xl border border-[var(--bj-card-border)] bg-[var(--bj-card)] px-3 py-2 text-xs font-semibold text-[var(--bj-text-main)] shadow-xs transition hover:border-orange-300 hover:bg-orange-50/50 dark:hover:bg-orange-950/20 sm:text-sm"
            title="Lihat riwayat teks yang pernah dijelaskan"
            aria-label="Buka riwayat penyederhanaan"
          >
            <History className="h-4 w-4 text-orange-600" />
            <span className="hidden sm:inline">Riwayat</span>
            {localCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-600 px-1 text-[11px] font-bold text-white">
                {localCount}
              </span>
            )}
          </button>

          {/* Elderly Mode Toggle */}
          <button
            type="button"
            onClick={toggleElderly}
            className={`flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold transition sm:text-sm ${
              isElderly
                ? 'border-orange-500 bg-orange-600 text-white shadow-sm'
                : 'border-[var(--bj-card-border)] bg-[var(--bj-card)] text-[var(--bj-text-main)] hover:border-orange-300 hover:bg-orange-50/40 dark:hover:bg-stone-800'
            }`}
            title="Perbesar huruf dan jarak baca agar lebih ramah lansia"
            aria-pressed={isElderly}
          >
            <Glasses className="h-4 w-4" />
            <span className="hidden sm:inline">
              {isElderly ? 'Huruf Besar: Aktif' : 'Huruf Besar'}
            </span>
            <span className="sm:hidden">Lansia</span>
          </button>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--bj-card-border)] bg-[var(--bj-card)] text-[var(--bj-text-main)] transition hover:bg-[var(--bj-card-muted)]"
            title={isDark ? 'Ganti ke tema terang' : 'Ganti ke tema gelap'}
            aria-label="Ganti mode tema"
          >
            {isDark ? (
              <Sun className="h-4 w-4 text-amber-400" />
            ) : (
              <Moon className="h-4 w-4 text-stone-600" />
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--bj-card-border)] bg-[var(--bj-card)] text-[var(--bj-text-main)] md:hidden"
            aria-label="Buka menu navigasi"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="border-t border-[var(--bj-card-border)] bg-[var(--bj-card)] px-4 py-3 md:hidden">
          <div className="flex flex-col gap-1">
            <button
              type="button"
              onClick={() => scrollToSection('contoh-hasil')}
              className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-base font-medium text-[var(--bj-text-main)] hover:bg-[var(--bj-card-muted)]"
            >
              <BookOpen className="h-4 w-4 text-orange-600" />
              Lihat contoh
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('cara-pakai')}
              className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-base font-medium text-[var(--bj-text-main)] hover:bg-[var(--bj-card-muted)]"
            >
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              Cara pakai
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('tanya-jawab')}
              className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-base font-medium text-[var(--bj-text-main)] hover:bg-[var(--bj-card-muted)]"
            >
              <HelpCircle className="h-4 w-4 text-blue-600" />
              Tanya jawab
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
