import { describe, expect, test } from '@jest/globals'
import { NANOID_SIZE, Stat } from '../../../src/models/stat'

describe('Stat', () => {
  test('lunii is an invalid url', () => {
    expect(() => new Stat('')).toThrowError('invalid url')
    expect(() => new Stat('https://lunii')).toThrowError('invalid url')
  })

  test('lunii url', () => {
    const originalUrl = 'https://lunii.com'
    const stat = new Stat(originalUrl)
    expect(stat.shortUrl.length).toEqual(NANOID_SIZE)
    expect(stat.originalUrl).toEqual(originalUrl)
    expect(stat.nbClicks).toEqual(0)
    const nbClicks = Math.round(Math.random() * 100)
    for (let i = 0; i < nbClicks; i++) {
      stat.click()
    }
    expect(stat.nbClicks).toBe(nbClicks)
    expect(stat.json).toEqual({
      originalUrl: stat.originalUrl,
      shortUrl: stat.shortUrl,
      nbClicks
    })
  })
})
