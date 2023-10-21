/**
 * Response of service registration
 */
export interface ShortUrlRegistrationData {
  readonly originalUrl: string
  readonly shortUrl: string
}

/**
 * ShortUrlRegistrationData of service analytics
 */
export interface ShortUrlAnalyticData extends ShortUrlRegistrationData {
  readonly nbClicks: number
}

/**
 * ShortUrlAnalyticData dedicated to increment nbClicks
 */
export interface ShortUrlDataController extends ShortUrlAnalyticData {
  // increment nbClicks counter
  click: () => void
  // get ShortUrlRegistrationData
  getRegistrationData: () => ShortUrlRegistrationData
  // get ShortUrlAnalyticData
  getAnalyticData: () => ShortUrlAnalyticData
}
