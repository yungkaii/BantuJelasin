export interface SpeechOptions {
  onStart?: () => void
  onEnd?: () => void
  onError?: (error: unknown) => void
  rate?: number
}

let activeUtterance: SpeechSynthesisUtterance | null = null

export function isSpeechSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window
}

export function speakText(text: string, options?: SpeechOptions): void {
  if (!isSpeechSupported()) {
    options?.onError?.(new Error('Browser ini tidak mendukung pembacaan suara (Text-to-Speech).'))
    return
  }

  // Cancel any running speech
  window.speechSynthesis.cancel()

  // Clean markdown or bullet points for natural speaking flow
  const cleanedText = text
    .replace(/[#*_`~>]/g, '')
    .replace(/[-•]\s*/g, '. ')
    .replace(/\s+/g, ' ')
    .trim()

  if (!cleanedText) return

  const utterance = new SpeechSynthesisUtterance(cleanedText)
  utterance.lang = 'id-ID'
  utterance.rate = options?.rate ?? 0.92 // slightly calm and clear for elderly ears
  utterance.pitch = 1.0

  // Try to find Indonesian voice
  const voices = window.speechSynthesis.getVoices()
  const idVoice = voices.find(
    (v) => v.lang.startsWith('id') || v.lang.includes('ID') || v.name.toLowerCase().includes('indonesia')
  )
  if (idVoice) {
    utterance.voice = idVoice
  }

  utterance.onstart = () => {
    activeUtterance = utterance
    options?.onStart?.()
  }

  utterance.onend = () => {
    activeUtterance = null
    options?.onEnd?.()
  }

  utterance.onerror = (e) => {
    activeUtterance = null
    // If user cancelled, don't trigger error
    if (e.error !== 'canceled') {
      options?.onError?.(e)
    }
  }

  activeUtterance = utterance
  window.speechSynthesis.speak(utterance)
}

export function stopSpeech(): void {
  if (isSpeechSupported()) {
    window.speechSynthesis.cancel()
    activeUtterance = null
  }
}

export function isSpeaking(): boolean {
  return isSpeechSupported() && window.speechSynthesis.speaking
}
