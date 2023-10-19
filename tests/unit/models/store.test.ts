import { describe, expect, test } from '@jest/globals'
import { StoreImpl } from '../../../src/models/store'
import { ShortUrlStatImpl } from '../../../src/models/stat'
import { statToResponse } from '../../../src/lib/shortUrl'

const store = new StoreImpl()

describe('store', () => {
  test('key exist', () => {
    const stat = new ShortUrlStatImpl('https://lunii.com')
    expect(store.getStat(stat.shortUrl)).toBeUndefined()

    store.saveStat(stat)
    expect(store.getStat(stat.shortUrl)).toEqual(stat)

    expect(store.getStats()).toEqual([statToResponse(stat)])
  })
})
