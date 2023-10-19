import express from 'express'
import type { Application, Request, Response } from 'express'

import { ShortUrl } from './services/url'

const HOST: string = process.env.HOST ?? '0.0.0.0'
const PORT: number = parseInt(process.env.PORT ?? '3000')

const app: Application = express()

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/ping', (_, res: Response) => { // health check
  res.send('pong')
})

app.get('/api/shorturl/:shorturl', (req: Request, res: Response) => {
  const originalUrl = new ShortUrl().click(req.params.shorturl)
  if (originalUrl === undefined) {
    return res.status(404)
  }

  res.redirect(originalUrl)
})

app.post('/api/shorturl', (req: Request, res: Response) => {
  try {
    new ShortUrl().postUrl(req.body)
  } catch {
    res.json({ error: 'invalid Url' })
  }
})

app.get('/api/shorturl/analytics', (req: Request, res: Response) => {
  const stat = new ShortUrl().getStat(req.body)

  if (typeof stat === 'undefined') {
    return res.status(404)
  }

  res.json(stat)
})

app.listen(PORT, HOST, () => {
  console.log(`Express is listening at http://${HOST}:${PORT}`)
})
