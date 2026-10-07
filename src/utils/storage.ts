import type { HistoryItem, SimplifyResult } from '../types'

const STORAGE_KEY_HISTORY = 'bantu_jelasin_history_v1'
const STORAGE_KEY_ELDERLY = 'bantu_jelasin_elderly_mode_v1'

export function getHistory(): HistoryItem[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY_HISTORY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveToHistory(result: SimplifyResult): HistoryItem[] {
  if (typeof window === 'undefined') return []
  try {
    const current = getHistory()
    const title =
      result.title ||
      result.originalText.slice(0, 45).replace(/\n/g, ' ') + '...'

    const newItem: HistoryItem = {
      id: result.id,
      title,
      preview: result.summary || result.simplifiedBullets[0] || '',
      originalText: result.originalText,
      result,
      timestamp: Date.now(),
      isFavorite: false,
    }

    // Filter out duplicate IDs or duplicate identical originalText
    const updated = [
      newItem,
      ...current.filter(
        (item) =>
          item.id !== newItem.id &&
          item.originalText.trim() !== newItem.originalText.trim()
      ),
    ].slice(0, 20) // Keep latest 20 items

    localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(updated))
    return updated
  } catch (err) {
    console.error('Failed to save history to localStorage', err)
    return []
  }
}

export function removeHistoryItem(id: string): HistoryItem[] {
  if (typeof window === 'undefined') return []
  try {
    const current = getHistory()
    const updated = current.filter((item) => item.id !== id)
    localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(updated))
    return updated
  } catch {
    return []
  }
}

export function clearAllHistory(): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.removeItem(STORAGE_KEY_HISTORY)
  } catch {
    // Ignore storage errors
  }
}

export function getElderlyMode(): boolean {
  if (typeof window === 'undefined') return false
  try {
    return localStorage.getItem(STORAGE_KEY_ELDERLY) === 'true'
  } catch {
    return false
  }
}

export function setElderlyMode(enabled: boolean): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY_ELDERLY, enabled ? 'true' : 'false')
    const root = document.documentElement
    if (enabled) {
      root.classList.add('elderly-mode')
      root.setAttribute('data-elderly', 'true')
    } else {
      root.classList.remove('elderly-mode')
      root.removeAttribute('data-elderly')
    }
  } catch {
    // Ignore storage errors
  }
}

const STORAGE_KEY_AI_KEY = 'bantu_jelasin_ai_key_v1'

export function getApiKey(): string {
  if (typeof window === 'undefined') return ''
  try {
    return localStorage.getItem(STORAGE_KEY_AI_KEY) || ''
  } catch {
    return ''
  }
}

export function setApiKey(key: string): void {
  if (typeof window === 'undefined') return
  try {
    const trimmed = key.trim()
    if (trimmed) {
      localStorage.setItem(STORAGE_KEY_AI_KEY, trimmed)
    } else {
      localStorage.removeItem(STORAGE_KEY_AI_KEY)
    }
  } catch {
    // Ignore storage errors
  }
}
