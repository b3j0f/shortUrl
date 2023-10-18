import express from 'express'

import { getShortUrlStat, newShortUrl, getOriginalUrl } from './url'

const HOST: string = process.env.HOST ?? '0.0.0.0'
const PORT: number = parseInt(process.env.PORT ?? '3000')

const app = express()

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/ping', (_, res) => {
  res.send('pong')
})

app.get('/api/shorturl/:shorturl', (req, res) => {
  const originalUrl = getOriginalUrl(req.params.shorturl)
  if (originalUrl === undefined) {
    return res.send(404)
  }

  res.redirect(originalUrl)
})

app.post('/api/shorturl', (req, res) => {
  try {
    newShortUrl(req.body)
  } catch {
    res.send({ error: 'invalid Url' })
  }
})

app.get('/api/shorturl/analytics', (req, res) => {
  res.send(getShortUrlStat(req.body))
})

app.listen(PORT, HOST, () => {
  console.log(`Express is listening at http://${HOST}:${PORT}`)
})
