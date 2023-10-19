import { describe, expect, test } from '@jest/globals'
import { statToResponse } from '../../../src/lib/shortUrl'
import type { ShortUrlStatResponse } from '../../../src/types/url'

class ShortUrlStatImpl implements ShortUrlStatResponse {
  readonly originalUrl = Math.random().toString()
  readonly shortUrl = Math.random().toString()
  readonly nbClicks = Math.random()
}

describe('statToResponse', () => {
  test('random values', () => {
    const stat = new ShortUrlStatImpl()

    expect(statToResponse(stat)).toEqual({
      originalUrl: stat.originalUrl,
      shortUrl: stat.shortUrl,
      nbClicks: stat.nbClicks
    })
  })
})
