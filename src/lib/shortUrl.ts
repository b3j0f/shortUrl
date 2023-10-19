import type { ShortUrlStatResponse } from '../types/url'

export const statToResponse = (stat: ShortUrlStatResponse): ShortUrlStatResponse => {
  return {
    originalUrl: stat.originalUrl,
    nbClicks: stat.nbClicks,
    shortUrl: stat.shortUrl
  }
}
