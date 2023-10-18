export interface ShortUrl {
  originalUrl: string
  shortUrl: string
}

export interface ShortUrlStat extends ShortUrl {
  nbClicks: number
}
