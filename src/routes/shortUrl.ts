import type { Application, Request, Response } from 'express'
import { ShortUrl } from '../services/shortUrl'

const shortUrl = new ShortUrl()

const redirect = (app: Application): void => {
  app.get('/api/shorturl/:shorturl', (req: Request, res: Response) => {
    const originalUrl = shortUrl.click(req.params.shorturl)
    if (originalUrl === undefined) {
      return res.sendStatus(404).end()
    }

    res.redirect(originalUrl)
  })
}

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

const analytics = (app: Application): void => {
  app.get('/api/shorturl/analytics', (_: Request, res: Response) => {
    const stats = shortUrl.getStats()

    res.json(stats).end()
  })
}

export default (app: Application): void => {
  analytics(app)
  redirect(app)
  registerUrl(app)
}
