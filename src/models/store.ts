import { statToResponse } from '../lib/shortUrl'
import type { ShortUrlStat } from '../types/stat'
import type { Store } from '../types/store'
import type { ShortUrlStatResponse } from '../types/url'

export class StoreImpl implements Store {
  statsByShortUrl: Record<string, ShortUrlStat>
  constructor (statsByShortUrl: Record<string, ShortUrlStat> = {}) {
    this.statsByShortUrl = statsByShortUrl
  }

  saveStat (stat: ShortUrlStat): void {
    this.statsByShortUrl[stat.shortUrl] = stat
  }

  getStats (): ShortUrlStatResponse[] {
    return Object.values(this.statsByShortUrl).map(statToResponse)
  }

  getStat (shortUrl: string): ShortUrlStat | undefined {
    return this.statsByShortUrl[shortUrl]
  }
}
