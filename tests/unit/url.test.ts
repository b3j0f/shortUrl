import { describe, expect, test } from '@jest/globals'
import { getOriginalUrl, getShortUrlStat, newShortUrlStat, checkHttpUrl } from '../../src/url'
import type { ShortUrlStat } from '../../src/types/url'

const luniiUrl = 'https://lunii.com'

let luniiStat: ShortUrlStat

describe('checkHttpUrl', () => {
  test('invalid url', () => {
    expect(checkHttpUrl('')).toBeFalsy()
    expect(checkHttpUrl('https://lunii')).toBeFalsy()
    expect(checkHttpUrl('ftp://lunii.com')).toBeFalsy()
  })

  test('lunii url', () => {
    expect(checkHttpUrl('http:lunii.com')).toBeTruthy()
    expect(checkHttpUrl(luniiUrl)).toBeTruthy()
  })
})

describe('newShortUrl', () => {
  test('lunii is an invalid url', () => {
    expect(() => newShortUrlStat('')).toThrowError('invalid url')
    expect(() => newShortUrlStat('https://lunii')).toThrowError('invalid url')
  })

  test('lunii url', () => {
    luniiStat = newShortUrlStat('https://lunii.com')
    expect(luniiStat.shortUrl.length).toEqual(6)
  })
})

test('basic test', () => {
  expect(luniiStat.shortUrl).not.toBe(luniiStat.originalUrl)
  expect(luniiStat.shortUrl).not.toBe('')
  expect(luniiStat.originalUrl).not.toBe('')
})

describe('getOriginalUrl', () => {
  test('empty url', () => {
    expect(getOriginalUrl('')).toBeUndefined()
  })

  test('lunii url', () => {
    expect(luniiStat.nbClicks).toEqual(0)
    const calls = Math.floor(Math.random() * 1000)
    for (let call = 0; call < calls; call++) {
      expect(getOriginalUrl(luniiStat.shortUrl)).toEqual(luniiStat.originalUrl)
    }
    expect(luniiStat.nbClicks).toEqual(calls)
  })
})

describe('getShortUrlStat', () => {
  test('empty url', () => {
    expect(getShortUrlStat('')).toBeUndefined()
  })

  test('lunii url', () => {
    expect(getShortUrlStat(luniiStat.shortUrl)).toEqual(luniiStat)
  })
})
