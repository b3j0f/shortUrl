import { describe, expect, test } from '@jest/globals'
import { ShortUrl } from '../../src/services/url'
import type { ShortUrlStat } from '../../src/types/url'
import { NANOID_SIZE } from '../../src/models/stat'

let luniiStat: ShortUrlStat

const shortUrl = new ShortUrl()

describe('newShortUrl', () => {
  test('lunii is an invalid url', () => {
    expect(() => shortUrl.postUrl('')).toThrowError('invalid url')
    expect(() => shortUrl.postUrl('https://lunii')).toThrowError('invalid url')
  })

  test('lunii url', () => {
    luniiStat = shortUrl.postUrl('https://lunii.com')
    expect(luniiStat.shortUrl.length).toEqual(NANOID_SIZE)
  })
})

test('basic test', () => {
  expect(luniiStat.shortUrl).not.toBe(luniiStat.originalUrl)
  expect(luniiStat.shortUrl).not.toBe('')
  expect(luniiStat.originalUrl).not.toBe('')
})

describe('click', () => {
  test('empty url', () => {
    expect(shortUrl.click('')).toBeUndefined()
  })

  test('lunii url', () => {
    expect(luniiStat.nbClicks).toEqual(0)
    const calls = Math.floor(Math.random() * 1000)
    for (let call = 0; call < calls; call++) {
      expect(shortUrl.click(luniiStat.shortUrl)).toEqual(luniiStat.originalUrl)
    }
    expect(luniiStat.nbClicks).toEqual(calls)
  })
})

describe('getShortUrlStat', () => {
  test('empty url', () => {
    expect(shortUrl.getStat('')).toBeUndefined()
  })

  test('lunii url', () => {
    expect(shortUrl.getStat(luniiStat.shortUrl)).toEqual(luniiStat)
  })
})
