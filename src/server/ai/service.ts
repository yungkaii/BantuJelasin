import type {
  SimplificationLevel,
  SimplifyRequest,
  SimplifyResult,
} from '../../types'
import { geminiSimplify } from './gemini'
import { freeAiSimplify } from './freeAi'
import { heuristicSimplify } from './heuristics'

export async function simplifyText(
  request: SimplifyRequest
): Promise<SimplifyResult> {
  const text = (request.text || '').trim()

  if (!text) {
    throw new Error('Teks tidak boleh kosong. Silakan masukkan atau tempel teks yang ingin dijelaskan.')
  }

  if (text.length > 8000) {
    throw new Error(
      `Teks terlalu panjang (${text.length} karakter). Maksimal teks yang diizinkan adalah 8000 karakter agar mudah dipahami.`
    )
  }

  const level: SimplificationLevel =
    request.level === 'very_simple' ||
    request.level === 'detailed' ||
    request.level === 'simple'
      ? request.level
      : 'simple'

  // 1. Read API key if user provided custom Gemini API key
  const apiKey =
    (typeof request.apiKey === 'string' && request.apiKey.trim().length > 0)
      ? request.apiKey.trim()
      : typeof process !== 'undefined'
      ? (process.env?.GEMINI_API_KEY || process.env?.AI_API_KEY || '').trim()
      : ''

  if (apiKey && apiKey.length > 0) {
    try {
      return await geminiSimplify(text, level, apiKey)
    } catch (err) {
      console.warn('Gemini API failed, falling back to universal AI model:', err)
    }
  }

  // 2. Universal Free AI Model (zero configuration, works for ANY arbitrary Indonesian text)
  try {
    return await freeAiSimplify(text, level)
  } catch (err) {
    console.warn('Free AI model failed or offline, falling back to local heuristic engine:', err)
  }

  // 3. Fallback: Local Heuristic Indonesian NLP Engine
  return heuristicSimplify(text, level)
}
