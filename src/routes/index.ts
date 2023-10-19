import type { Application } from 'express'
import healthCheck from './healthCheck'
import shortUrl from './shortUrl'

/**
 * Register all routes
 */
export default (app: Application): void => {
  healthCheck(app)
  shortUrl(app)
}
