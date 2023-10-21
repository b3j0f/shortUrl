import type { ShortUrlData } from './url'

/**
 * In charge of storing `ShortUrlStat`s
 */
export interface Store {
  save: (stat: ShortUrlData) => void
  getAll: () => ShortUrlData[]
  get: (shortUrl: string) => ShortUrlData | undefined
}
