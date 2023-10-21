import { nanoid } from 'nanoid'
import { checkHttpUrl } from '../lib/url'

import config from '../config'
import type { ShortUrlAnalyticData, ShortUrlRegistrationData, ShortUrlDataController } from '../types/shortUrl'

/**
 * Service dedicated to manage ShortUrlData
 */
export class ShortUrlControllerImpl implements ShortUrlDataController {
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

  getRegistrationData (): ShortUrlRegistrationData {
    return {
      originalUrl: this.originalUrl,
      shortUrl: this.shortUrl
    }
  }

  getAnalyticData (): ShortUrlAnalyticData {
    return {
      nbClicks: this._nbClicks,
      ...this.getRegistrationData()
    }
  }
}
