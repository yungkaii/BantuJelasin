export type SimplificationLevel = 'very_simple' | 'simple' | 'detailed'

export type KeyPointCategory =
  | 'obligation'
  | 'prohibition'
  | 'date'
  | 'cost'
  | 'requirement'
  | 'risk'

export interface KeyPoint {
  category: KeyPointCategory
  label: string
  text: string
  severity?: 'info' | 'warning' | 'alert' | 'success'
}

export interface TermExplanation {
  term: string
  explanation: string
  context?: string
}

export interface TextDifficulty {
  score: number // 1 to 100
  label: 'Sangat Mudah' | 'Mudah' | 'Sedang' | 'Cukup Rumit' | 'Sangat Rumit'
  readingTimeMinutes: number
  wordCount: number
  charCount: number
}

export interface SimplifyRequest {
  text: string
  level: SimplificationLevel
  apiKey?: string
}

export interface SimplifyResult {
  id: string
  originalText: string
  level: SimplificationLevel
  title: string
  summary: string
  simplifiedText: string
  simplifiedBullets: string[]
  actionSteps: string[]
  keyPoints: KeyPoint[]
  terms: TermExplanation[]
  ambiguousParts: string[]
  disclaimer: string
  difficulty: TextDifficulty
  provider: 'gemini_ai' | 'local_heuristic'
  createdAt: number
}

export interface HistoryItem {
  id: string
  title: string
  preview: string
  originalText: string
  result: SimplifyResult
  timestamp: number
  isFavorite?: boolean
}

export interface PredefinedExample {
  id: string
  title: string
  category: string
  categoryLabel: string
  iconName: string
  originalText: string
  simplifiedBullets: string[]
  keyPointsPreview?: string[]
}
