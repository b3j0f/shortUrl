import { describe, expect, test } from '@jest/globals'
import { StoreImpl } from '../../../src/store/store'
import { ShortUrlControllerImpl } from '../../../src/models/shortUrl'

const store = new StoreImpl()

describe('store', () => {
  test('key exist', () => {
    const data = new ShortUrlControllerImpl('https://lunii.com')
    expect(store.get(data.shortUrl)).toBeUndefined()

    store.save(data)
    expect(store.get(data.shortUrl)).toEqual(data)

    expect(store.getAll()).toEqual([data])
  })
})
