import { nanoid } from 'nanoid'
import { checkHttpUrl } from '../lib/url'

import config from '../config'
import type { AnalyticResponse, RegistrationResponse, ShortUrlData } from '../types/url'

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

  click (): void {
    this._nbClicks++
  }

  toRegistrationResponse (): RegistrationResponse {
    return {
      originalUrl: this.originalUrl,
      shortUrl: this.shortUrl
    }
  }

  toAnalyticResponse (): AnalyticResponse {
    return {
      nbClicks: this._nbClicks,
      ...this.toRegistrationResponse()
    }
  }
}
