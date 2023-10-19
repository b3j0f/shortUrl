import { describe, expect, test } from '@jest/globals'
import { Store } from '../../../src/models/store'
import { Stat } from '../../../src/models/stat'

const store = new Store()

describe('store', () => {
  test('key', () => {
    const stat = new Stat('https://lunii.com')
    expect(store.getStat(stat.shortUrl)).toBeUndefined()
    store.saveStat(stat)
    expect(store.getStat(stat.shortUrl)).toEqual(stat)
  })
})
