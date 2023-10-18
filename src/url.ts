import { nanoid } from 'nanoid'

import type { ShortUrlStat } from './types/url'

const statsByShortUrl: Record<string, ShortUrlStat> = {}

export const checkHttpUrl = (url: string): boolean => { // source: https://snyk.io/fr/blog/secure-javascript-url-validation/
  let givenUrl
  try {
    givenUrl = new URL(url)
  } catch (error) {
    return false
  }

  return givenUrl.hostname.includes('.') && (givenUrl.protocol === 'http:' || givenUrl.protocol === 'https:')
}

export const newShortUrlStat = (originalUrl: string): ShortUrlStat => {
  if (!checkHttpUrl(originalUrl)) {
    throw new Error('invalid url')
  }

  const shortUrl = nanoid(6)

  const result: ShortUrlStat = { originalUrl, shortUrl, nbClicks: 0 }

  statsByShortUrl[shortUrl] = result

  return result
}

export const getShortUrlStat = (shortUrl: string): ShortUrlStat | undefined => {
  return statsByShortUrl[shortUrl]
}

export const getOriginalUrl = (shortUrl: string): string | undefined => {
  const result = getShortUrlStat(shortUrl)

  if (typeof result !== 'undefined') {
    result.nbClicks++
    statsByShortUrl[shortUrl] = result
  }

  return result?.originalUrl
}
