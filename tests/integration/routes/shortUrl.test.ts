import { describe, test, expect } from '@jest/globals'
import request from 'supertest'

import app from '../../../src/loaders/app'
import { ShortUrlStatImpl } from '../../../src/models/stat'
import { toStatResponse } from '../../../src/lib/shortUrl'

describe('redirect', () => {
  test('invalid url', async () => {
    const res = await request(app).get('/api/shorturl/unknow')

    expect(res.statusCode).toBe(404)

    const analytics = await request(app).get('/api/shorturl/analytics')

    expect(analytics.statusCode).toBe(200)
    expect(analytics.text).toBe('[]')

    const register = await request(app).post('/api/shorturl').send({ url: 'unknow' })

    expect(register.body).toEqual({ error: 'invalid URL' })
  })

  test('post urls', async () => {
    const urls = new Array(5).fill(null).map(() => `https://lunii-${Math.round(Math.random() * 1000)}.com`)

    const stats = await Promise.all(urls.map(async url => {
      const registrationResp = await request(app).post('/api/shorturl').send({ url })

      const stat = new ShortUrlStatImpl(url, registrationResp.body.shortUrl, 1)

      expect(registrationResp.body.originalUrl).toBe(url)

      await request(app).get(`/api/shorturl/${stat.shortUrl}`).expect(302).expect('Location', url)

      return toStatResponse(stat)
    }))

    const statsResp = await request(app).get('/api/shorturl/analytics')

    expect(statsResp.text).toBe(JSON.stringify(stats))
  })
})
