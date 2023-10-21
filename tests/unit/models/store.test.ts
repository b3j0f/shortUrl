import { describe, expect, test } from '@jest/globals'
import { StoreImpl } from '../../../src/store/store'
import { ShortUrlDataImpl } from '../../../src/models/shortUrl'

const store = new StoreImpl()

describe('store', () => {
  test('key exist', () => {
    const data = new ShortUrlDataImpl('https://lunii.com')
    expect(store.get(data.shortUrl)).toBeUndefined()

    store.save(data)
    expect(store.get(data.shortUrl)).toEqual(data)

    expect(store.getAll()).toEqual([data])
  })
})
