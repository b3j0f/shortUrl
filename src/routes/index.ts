import type { Application } from 'express'
import healthCheck from './healthCheck'
import shortUrl from './shortUrl'

export default (app: Application): void => {
  healthCheck(app)
  shortUrl(app)
}
