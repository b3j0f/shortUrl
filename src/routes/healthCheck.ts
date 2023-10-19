import type { Application, Response } from 'express'

/**
 * Basic healthcheck which returns "pong"
 */
export const ping = (app: Application): void => { // health check
  app.get('/ping', (_, res: Response): void => {
    res.send('pong').end()
  })
}

export default (app: Application): void => { // health check
  ping(app)
}
