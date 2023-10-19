import { toResponse } from '../lib/shortUrl'
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
    const stat = new ShortUrlDataImpl(originalUrl)

    this.store.saveStat(stat)

    this.eventEmitter.emit(EventType.Register, stat)

    return toResponse(stat)
  }

  /**
   * Get all registered data
   */
  getStats (): AnalyticResponse[] {
    this.eventEmitter.emit(EventType.Stats)

    return this.store.getStats()
  }

  /**
   * Increment a click counter of a short url
   * @returns original url
   */
  click (shortUrl: string): string | undefined {
    const stat = this.store.getStat(shortUrl)

    if (stat !== undefined) {
      stat.click()
      this.store.saveStat(stat)

      this.eventEmitter.emit(EventType.Click, stat)
    }

    return stat?.originalUrl
  }
}
