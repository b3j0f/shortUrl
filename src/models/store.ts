import type { ShortUrlStat } from '../types/url'

export interface StoreItf {
  saveStat: (stat: ShortUrlStat) => void
  getStat: (shortUrl: string) => ShortUrlStat | undefined
}

export class Store implements StoreItf {
  statsByShortUrl: Record<string, ShortUrlStat>
  constructor (statsByShortUrl: Record<string, ShortUrlStat> = {}) {
    this.statsByShortUrl = statsByShortUrl
  }

  saveStat (stat: ShortUrlStat): void {
    this.statsByShortUrl[stat.shortUrl] = stat
  }

  getStat (shortUrl: string): ShortUrlStat | undefined {
    return this.statsByShortUrl[shortUrl]
  }
}
