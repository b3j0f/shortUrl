import { describe, expect, test } from '@jest/globals'
import { ShortUrl } from '../../../src/services/shortUrl'

import { eventEmitter, eventTracker } from '../../utils'
import { StoreImpl } from '../../../src/store/store'
import { EventType } from '../../../src/types/subscribers'

const service = new ShortUrl(new StoreImpl(), eventEmitter)

describe('shortUrl', () => {
  test('invalid url', () => {
    expect(service.click('unknown')).toBeUndefined()

    expect(() => service.registerUrl('unknown')).toThrow('invalid URL')

    expect(eventTracker.eventType).toBeUndefined()
    expect(eventTracker.params).toBeUndefined()
    expect(eventTracker.nbCalled).toBe(0)
  })

  test('registration', async () => {
    expect(service.getAnalytics()).toEqual([])
    expect(eventTracker.eventType).toBe(EventType.Analytics)
    expect(eventTracker.params).toEqual([])
    expect(eventTracker.nbCalled).toBe(3)

    const urls = new Array(5).fill(null).map(() => `https://lunii-${Math.round(Math.random() * 1000)}.com`)

    const stats = await Promise.all(urls.map(
      async (url, i) => {
        const data = service.registerUrl(url)

        expect(eventTracker.eventType).toBe(EventType.Register)
        expect(eventTracker.params).toEqual(data)
        console.log(eventTracker.nbCalled)
        expect(eventTracker.nbCalled).toBe(3 + (i * 6) + 3)

        const { originalUrl, shortUrl } = data

        expect(originalUrl).toBe(url)

        expect(service.click(shortUrl)).toBe(url)

        const result = { nbClicks: 1, ...data }
        expect(eventTracker.eventType).toBe(EventType.Click)
        expect(eventTracker.params).toEqual(result)
        expect(eventTracker.nbCalled).toBe(3 + (i * 6) + 6)

        return result
      }
    ))

    const serviceStats = service.getAnalytics()

    expect(eventTracker.eventType).toBe(EventType.Analytics)
    expect(eventTracker.params).toBe(serviceStats)
    expect(eventTracker.nbCalled).toBe(3 + stats.length * 6 + 3)

    expect(serviceStats).toEqual(stats)
  })
})
