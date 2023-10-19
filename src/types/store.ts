import type { ShortUrlStat } from './stat'
import type { ShortUrlStatResponse } from './url'

export interface Store {
  saveStat: (stat: ShortUrlStat) => void
  getStats: () => ShortUrlStatResponse[]
  getStat: (shortUrl: string) => ShortUrlStat | undefined
}
