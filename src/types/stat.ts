import type { AnalyticResponse } from './url'

/**
 * ShortUrlStatResponse dedicated to increment nbClicks
 */
export interface ShortUrlData extends AnalyticResponse {
  click: () => void
}
