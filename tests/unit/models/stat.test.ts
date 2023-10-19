import { describe, expect, test } from '@jest/globals'
import config from '../../../src/config'
import { ShortUrlDataImpl } from '../../../src/models/shortUrl'
import { toStatResponse } from '../../../src/lib/shortUrl'

describe('Stat', () => {
  test('lunii is an invalid url', () => {
    expect(() => new ShortUrlDataImpl('')).toThrowError('invalid URL')
    expect(() => new ShortUrlDataImpl('https://lunii')).toThrowError('invalid URL')
  })

  test('lunii url', () => {
    const originalUrl = 'https://lunii.com'
    const stat = new ShortUrlDataImpl(originalUrl)

    // test saved stat
    expect(stat.shortUrl.length).toBe(config.shortUrlLength)
    expect(stat.originalUrl).toBe(originalUrl)

    // test nbClicks
    expect(stat.nbClicks).toBe(0)
    const nbClicks = Math.round(Math.random() * 100)
    for (let i = 0; i < nbClicks; i++) {
      stat.click()
    }
    expect(stat.nbClicks).toBe(nbClicks)

    // test saved stat
    expect(toStatResponse(stat)).toEqual({
      originalUrl: stat.originalUrl,
      shortUrl: stat.shortUrl,
      nbClicks
    })
  })
})
