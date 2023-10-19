import { describe, expect, test } from '@jest/globals'
import { toResponse, toStatResponse } from '../../../src/lib/shortUrl'
import type { ShortUrlStatResponse } from '../../../src/types/url'

class ShortUrlStatImpl implements ShortUrlStatResponse {
  readonly originalUrl = Math.random().toString()
  readonly shortUrl = Math.random().toString()
  readonly nbClicks = Math.random()
}

describe('toStatResponse', () => {
  test('random values', () => {
    const stat = new ShortUrlStatImpl()

    expect(toStatResponse(stat)).toEqual({
      originalUrl: stat.originalUrl,
      shortUrl: stat.shortUrl,
      nbClicks: stat.nbClicks
    })
  })
})

describe('toResponse', () => {
  test('random values', () => {
    const stat = new ShortUrlStatImpl()

    expect(toResponse(stat)).toEqual({
      originalUrl: stat.originalUrl,
      shortUrl: stat.shortUrl
    })
  })
})
