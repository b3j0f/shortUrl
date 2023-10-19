import type { ShortUrlData } from './stat'
import type { AnalyticResponse } from './url'

/**
 * In charge of storing `ShortUrlStat`s
 */
export interface Store {
  saveStat: (stat: ShortUrlData) => void
  getStats: () => AnalyticResponse[]
  getStat: (shortUrl: string) => ShortUrlData | undefined
}
