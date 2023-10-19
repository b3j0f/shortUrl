export interface ShortUrlResponse {
  readonly originalUrl: string
  readonly shortUrl: string
}

export interface ShortUrlStatResponse extends ShortUrlResponse {
  readonly nbClicks: number
}
