import { nanoid } from 'nanoid'
import { checkHttpUrl } from '../lib/url'

import config from '../config'
import type { ShortUrlStat } from '../types/stat'

export class ShortUrlStatImpl implements ShortUrlStat {
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
}
