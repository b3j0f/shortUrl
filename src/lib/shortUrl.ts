import type { ShortUrlResponse, ShortUrlStatResponse } from '../types/url'

export const toStatResponse = (stat: ShortUrlStatResponse): ShortUrlStatResponse => {
  return {
    originalUrl: stat.originalUrl,
    nbClicks: stat.nbClicks,
    shortUrl: stat.shortUrl
  }
}

export const toResponse = (resp: ShortUrlResponse): ShortUrlResponse => {
  return {
    originalUrl: resp.originalUrl,
    shortUrl: resp.shortUrl
  }
}
