/**
 * Response of service registration
 */
export interface RegistrationResponse {
  readonly originalUrl: string
  readonly shortUrl: string
}

/**
 * Response of service analytics
 */
export interface AnalyticResponse extends RegistrationResponse {
  readonly nbClicks: number
}

/**
 * ShortUrlStatResponse dedicated to increment nbClicks
 */
export interface ShortUrlData extends AnalyticResponse {
  click: () => void
  toRegistrationResponse: () => RegistrationResponse
  toAnalyticResponse: () => AnalyticResponse
}
