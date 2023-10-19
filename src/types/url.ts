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
