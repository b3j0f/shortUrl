import { describe, expect, test } from '@jest/globals'
import config from '../../../src/config'
import { ShortUrlControllerImpl } from '../../../src/models/shortUrl'

describe('Stat', () => {
  test('lunii is an invalid url', () => {
    expect(() => new ShortUrlControllerImpl('')).toThrowError('invalid URL')
    expect(() => new ShortUrlControllerImpl('https://lunii')).toThrowError('invalid URL')
  })

  test('lunii url', () => {
    const originalUrl = 'https://lunii.com'
    const data = new ShortUrlControllerImpl(originalUrl)

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
    expect(data.getRegistrationData()).toEqual({
      originalUrl: data.originalUrl,
      shortUrl: data.shortUrl
    })

    // test saved data
    expect(data.getAnalyticData()).toEqual({
      originalUrl: data.originalUrl,
      shortUrl: data.shortUrl,
      nbClicks
    })
  })
})
