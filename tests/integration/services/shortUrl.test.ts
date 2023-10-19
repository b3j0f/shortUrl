import { describe, expect, test } from '@jest/globals'
import { ShortUrlStatImpl } from '../../../src/models/stat'
import { statToResponse } from '../../../src/lib/shortUrl'
import { ShortUrl } from '../../../src/services/url'

const service = new ShortUrl()

describe('shortUrl', () => {
  test('invalid url', () => {
    expect(service.click('unknown')).toBeUndefined()

    expect(() => service.registerUrl('unknown')).toThrow('invalid URL')
  })

  test('registration', async () => {
    expect(service.getStats()).toEqual([])

    const urls = new Array(5).fill(null).map(() => `https://lunii-${Math.round(Math.random() * 1000)}.com`)

    const stats = await Promise.all(urls.map(
      async url => {
        const { originalUrl, shortUrl } = service.registerUrl(url)

        expect(originalUrl).toBe(url)

        expect(service.click(shortUrl)).toBe(url)

        return statToResponse(new ShortUrlStatImpl(url, shortUrl, 1))
      }
    ))

    expect(service.getStats()).toEqual(stats)
  })
})
