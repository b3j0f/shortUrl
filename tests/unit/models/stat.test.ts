import { describe, expect, test } from '@jest/globals'
import config from '../../../src/config'
import { ShortUrlDataImpl } from '../../../src/models/shortUrl'

describe('Stat', () => {
  test('lunii is an invalid url', () => {
    expect(() => new ShortUrlDataImpl('')).toThrowError('invalid URL')
    expect(() => new ShortUrlDataImpl('https://lunii')).toThrowError('invalid URL')
  })

  test('lunii url', () => {
    const originalUrl = 'https://lunii.com'
    const data = new ShortUrlDataImpl(originalUrl)

    // test saved stat
    expect(data.shortUrl.length).toBe(config.shortUrlLength)
    expect(data.originalUrl).toBe(originalUrl)

    // test nbClicks
    expect(data.nbClicks).toBe(0)
    const nbClicks = Math.round(Math.random() * 100)
    for (let i = 0; i < nbClicks; i++) {
      data.click()
    }
    expect(data.nbClicks).toBe(nbClicks)

    // test saved data
    expect(data.toRegistrationResponse()).toEqual({
      originalUrl: data.originalUrl,
      shortUrl: data.shortUrl
    })

    // test saved data
    expect(data.toAnalyticResponse()).toEqual({
      originalUrl: data.originalUrl,
      shortUrl: data.shortUrl,
      nbClicks
    })
  })
})
