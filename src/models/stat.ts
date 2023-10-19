import { nanoid } from 'nanoid'
import { checkHttpUrl } from '../lib/url'

export const NANOID_SIZE = parseInt(process.env.NANOID ?? '6')

interface ShortModelItf {
  originalUrl: string
  shortUrl: string
}

interface StatModelItf extends ShortModelItf {
  nbClicks: number
}

export class Stat {
  readonly originalUrl: string
  readonly shortUrl: string = nanoid(NANOID_SIZE)
  private _nbClicks: number = 0

  constructor (originalUrl: string) {
    if (!checkHttpUrl(originalUrl)) {
      throw new Error('invalid url')
    }

    this.originalUrl = originalUrl
  }

  get nbClicks (): number {
    return this._nbClicks
  }

  click (): void {
    this._nbClicks++
  }

  get json (): StatModelItf {
    return {
      originalUrl: this.originalUrl,
      nbClicks: this.nbClicks,
      shortUrl: this.shortUrl
    }
  }
}
