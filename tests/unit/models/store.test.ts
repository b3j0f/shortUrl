import { describe, expect, test } from '@jest/globals'
import { StoreImpl } from '../../../src/store/store'
import { ShortUrlDataImpl } from '../../../src/models/shortUrl'
import { toStatResponse } from '../../../src/lib/shortUrl'

const store = new StoreImpl()

describe('store', () => {
  test('key exist', () => {
    const stat = new ShortUrlDataImpl('https://lunii.com')
    expect(store.getStat(stat.shortUrl)).toBeUndefined()

    store.saveStat(stat)
    expect(store.getStat(stat.shortUrl)).toEqual(stat)

    expect(store.getStats()).toEqual([toStatResponse(stat)])
  })
})
