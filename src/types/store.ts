import type { ShortUrlAnalyticData } from './shortUrl'

/**
 * In charge of storing `ShortUrlStat`s
 */
export interface Store {
  save: (stat: ShortUrlAnalyticData) => void
  getAll: () => ShortUrlAnalyticData[]
  get: (shortUrl: string) => ShortUrlAnalyticData | undefined
}
