import express from 'express'
import type { Application, Request, Response } from 'express'

import { getShortUrlStat, newShortUrlStat, getOriginalUrl } from './url'

const HOST: string = process.env.HOST ?? '0.0.0.0'
const PORT: number = parseInt(process.env.PORT ?? '3000')

const app: Application = express()

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/ping', (_, res: Response) => { // health check
  res.send('pong')
})

app.get('/api/shorturl/:shorturl', (req: Request, res: Response) => {
  const originalUrl = getOriginalUrl(req.params.shorturl)
  if (originalUrl === undefined) {
    return res.send(404)
  }

  res.redirect(originalUrl)
})

app.post('/api/shorturl', (req: Request, res: Response) => {
  try {
    newShortUrlStat(req.body)
  } catch {
    res.send({ error: 'invalid Url' })
  }
})

app.get('/api/shorturl/analytics', (req: Request, res: Response) => {
  res.send(getShortUrlStat(req.body))
})

app.listen(PORT, HOST, () => {
  console.log(`Express is listening at http://${HOST}:${PORT}`)
})
