import { ShortUrlDataImpl } from '../models/shortUrl'
import { StoreImpl } from '../store/store'
import { EventEmitterImpl } from '../subscribers/emitter'
import type { Store } from '../types/store'
import { EventType, type EventEmitter } from '../types/subscribers'
import type { RegistrationResponse, AnalyticResponse } from '../types/url'

/**
 * Service in charge of registering original url, short url and number of clicks
 */
export class ShortUrl {
  store: Store
  eventEmitter: EventEmitter

  constructor (store: Store = new StoreImpl(), eventEmitter: EventEmitter = new EventEmitterImpl()) {
    this.store = store
    this.eventEmitter = eventEmitter
  }

  /**
   * Register an original url and return a record with both original and short urls
   */
  registerUrl (originalUrl: string): RegistrationResponse {
    const data = new ShortUrlDataImpl(originalUrl)

    this.store.save(data)

    const result = data.toRegistrationResponse()

    this.eventEmitter.emit(EventType.Register, result)

    return result
  }

  /**
   * Get all registered data
   */
  getAnalytics (): AnalyticResponse[] {
    const result = this.store.getAll().map(data => data.toAnalyticResponse())
    this.eventEmitter.emit(EventType.Analytics, result)

    return result
  }

  /**
   * Increment a click counter of a short url
   * @returns original url
   */
  click (shortUrl: string): string | undefined {
    const data = this.store.get(shortUrl)

    if (data !== undefined) {
      data.click()
      this.store.save(data)

      this.eventEmitter.emit(EventType.Click, data.toAnalyticResponse())
    }

    return data?.originalUrl
  }
}
