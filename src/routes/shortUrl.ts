import type { Application, Request, Response } from 'express'
import { ShortUrl } from '../services/shortUrl'

const shortUrl = new ShortUrl()

/**
 * Redirect a shortUrl to related original url.
 */
const redirect = (app: Application): void => {
  app.get('/api/shorturl/:shorturl', (req: Request, res: Response) => {
    const originalUrl = shortUrl.click(req.params.shorturl)
    if (originalUrl === undefined) {
      return res.sendStatus(404).end()
    }

    res.redirect(originalUrl)
  })
}

/**
 * Register input short url in the body and returns a `ShortUrlResponse`
 */
const registerUrl = (app: Application): void => {
  app.post('/api/shorturl', (req: Request, res: Response): void => {
    try {
      const stat = shortUrl.registerUrl(req.body.url)
      res.json(stat).end()
    } catch (ex: any) {
      res.json({ error: ex.message }).end()
    }
  })
}

/**
 * Returns all stored `ShortUrlResponse`s
 */
const analytics = (app: Application): void => {
  app.get('/api/shorturl/analytics', (_: Request, res: Response) => {
    const stats = shortUrl.getStats()

    res.json(stats).end()
  })
}

/**
 * Register above routes
 */
export default (app: Application): void => {
  analytics(app)
  redirect(app)
  registerUrl(app)
}
