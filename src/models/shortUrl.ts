import { nanoid } from 'nanoid'
import { checkHttpUrl } from '../lib/url'

import config from '../config'
import type { ShortUrlData } from '../types/stat'

/**
 * Store data which contains all originalUrl, shortUrl and nbClicks
 */
export class ShortUrlDataImpl implements ShortUrlData {
  readonly originalUrl: string
  readonly shortUrl: string
  private _nbClicks: number

  constructor (
    originalUrl: string,
    shortUrl: string = nanoid(config.shortUrlLength),
    nbClicks: number = 0
  ) {
    if (!checkHttpUrl(originalUrl)) {
      throw new Error('invalid URL')
    }

    this.originalUrl = originalUrl
    this.shortUrl = shortUrl
    this._nbClicks = nbClicks
  }

  get nbClicks (): number {
    return this._nbClicks
  }

  /**
   * Increment number of clicks
   */
  click (): void {
    this._nbClicks++
  }
}
