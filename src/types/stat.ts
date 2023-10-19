import type { ShortUrlStatResponse } from './url'

export interface ShortUrlStat extends ShortUrlStatResponse {
  click: () => void
}
