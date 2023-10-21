import type { Store } from '../types/store'
import type { ShortUrlData } from '../types/url'

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
  save (stat: ShortUrlData): void {
    this.statsByShortUrl[stat.shortUrl] = stat
  }

  /**
   * @returns all stored stats.
   */
  getAll (): ShortUrlData[] {
    return Object.values(this.statsByShortUrl)
  }

  /**
   * According to input short url, return associated statistics
   * @returns associated stats or undefined if short url is not already saved
   */
  get (shortUrl: string): ShortUrlData | undefined {
    return this.statsByShortUrl[shortUrl]
  }
}
