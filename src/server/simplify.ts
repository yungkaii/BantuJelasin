import { createServerFn } from '@tanstack/react-start'
import { simplifyText } from './ai/service'
import type { SimplifyRequest, SimplifyResult } from '../types'

export const simplifyTextServerFn = createServerFn({ method: 'POST' })
  .validator((data: unknown): SimplifyRequest => {
    if (typeof data !== 'object' || data === null) {
      throw new Error('Data permintaan tidak valid.')
    }
    const d = data as Record<string, unknown>
    if (typeof d.text !== 'string' || !d.text.trim()) {
      throw new Error('Teks wajib diisi.')
    }
    const validLevels = ['very_simple', 'simple', 'detailed']
    const level =
      typeof d.level === 'string' && validLevels.includes(d.level)
        ? (d.level as SimplifyRequest['level'])
        : 'simple'

    const apiKey =
      typeof d.apiKey === 'string' && d.apiKey.trim().length > 0
        ? d.apiKey.trim()
        : undefined

    return {
      text: d.text.trim(),
      level,
      apiKey,
    }
  })
  .handler(async ({ data }): Promise<SimplifyResult> => {
    return await simplifyText(data)
  })
