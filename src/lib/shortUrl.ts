import type { RegistrationResponse, AnalyticResponse } from '../types/url'

/**
 * Remove useless properties from input parameter in order to match return type.
 */
export const toStatResponse = (stat: AnalyticResponse): AnalyticResponse => {
  return {
    originalUrl: stat.originalUrl,
    nbClicks: stat.nbClicks,
    shortUrl: stat.shortUrl
  }
}

/**
 * Remove useless properties from input parameters in order to match return type.
 */
export const toResponse = (resp: RegistrationResponse): RegistrationResponse => {
  return {
    originalUrl: resp.originalUrl,
    shortUrl: resp.shortUrl
  }
}
