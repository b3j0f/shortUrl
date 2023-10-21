import { ShortUrlControllerImpl } from '../models/shortUrl'
import { StoreImpl } from '../store/store'
import { EventEmitterImpl } from '../subscribers/emitter'
import type { Store } from '../types/store'
import { EventType, type EventEmitter } from '../types/subscribers'
import type { ShortUrlRegistrationData, ShortUrlAnalyticData } from '../types/shortUrl'

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
   * Register an original url and notifies event tracker with EventType.Register
   *
   * @returns both originalUrl and shortUrl
   */
  registerUrl (originalUrl: string): ShortUrlRegistrationData {
    const data = new ShortUrlControllerImpl(originalUrl)

    this.store.save(data)

    const result = data.getRegistrationData()

    this.eventEmitter.emit(EventType.Register, result)

    return result
  }

  /**
   * Get all registered data and notifies event trackers with EventType.Analytics
   *
   * @returns registered ShortUrlData
   */
  getAnalytics (): ShortUrlAnalyticData[] {
    const result = this.store.getAll()
    this.eventEmitter.emit(EventType.Analytics, result)

    return result
  }

  /**
   * Increment a click counter of a short url and notifies event trackers with EventType.Click
   *
   * @returns original url
   */
  click (shortUrl: string): string | undefined {
    const data = this.store.get(shortUrl)

    if (data !== undefined) {
      const controller = new ShortUrlControllerImpl(data.originalUrl, data.shortUrl, data.nbClicks)
      controller.click()
      const analytic = controller.getAnalyticData()
      this.store.save(analytic)

      this.eventEmitter.emit(EventType.Click, analytic)
    }

    return data?.originalUrl
  }
}
