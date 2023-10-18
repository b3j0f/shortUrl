import { nanoid } from 'nanoid'

export interface ShortUrl {
  originalUrl: string
  shortUrl: string
}

export interface ShortUrlStat extends ShortUrl {
  nbClicks: number
}

const statsByShortUrl: Record<string, ShortUrlStat> = {}

export const newShortUrl = (url: string): ShortUrl => {
  const originalUrl = new URL(url).toString() // test if originalUrl is a valid url
  const shortUrl = nanoid()

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
