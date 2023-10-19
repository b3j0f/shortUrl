import { toStatResponse } from '../lib/shortUrl'
import type { ShortUrlData } from '../types/stat'
import type { Store } from '../types/store'
import type { AnalyticResponse } from '../types/url'

/**
 * In charge of storing `ShortUrlStat`s
 */
export class StoreImpl implements Store {
  statsByShortUrl: Record<string, ShortUrlData>
  constructor (statsByShortUrl: Record<string, ShortUrlData> = {}) {
    this.statsByShortUrl = statsByShortUrl
  }

  /**
   * Store input stat
   */
  saveStat (stat: ShortUrlData): void {
    this.statsByShortUrl[stat.shortUrl] = stat
  }

  /**
   * @returns all stored stats.
   */
  getStats (): AnalyticResponse[] {
    return Object.values(this.statsByShortUrl).map(toStatResponse)
  }

  /**
   * According to input short url, return associated statistics
   * @returns associated stats or undefined if short url is not already saved
   */
  getStat (shortUrl: string): ShortUrlData | undefined {
    return this.statsByShortUrl[shortUrl]
  }
}
