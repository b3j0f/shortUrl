export interface ShortUrl {
  readonly originalUrl: string
  readonly shortUrl: string
}

export interface ShortUrlStat extends ShortUrl {
  readonly nbClicks: number
  click: () => void
}
