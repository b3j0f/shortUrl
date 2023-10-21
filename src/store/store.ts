import type { Store } from '../types/store'
import type { ShortUrlAnalyticData } from '../types/shortUrl'

/**
 * In charge of storing `ShortUrlStat`s
 */
export class StoreImpl implements Store {
  statsByShortUrl: Record<string, ShortUrlAnalyticData>
  constructor (statsByShortUrl: Record<string, ShortUrlAnalyticData> = {}) {
    this.statsByShortUrl = statsByShortUrl
  }

  /**
   * Store input stat
   */
  save (stat: ShortUrlAnalyticData): void {
    this.statsByShortUrl[stat.shortUrl] = stat
  }

  /**
   * @returns all stored stats.
   */
  getAll (): ShortUrlAnalyticData[] {
    return Object.values(this.statsByShortUrl)
  }

  /**
   * According to input short url, return associated statistics
   * @returns associated stats or undefined if short url is not already saved
   */
  get (shortUrl: string): ShortUrlAnalyticData | undefined {
    return this.statsByShortUrl[shortUrl]
  }
}
