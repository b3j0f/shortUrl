import { ShortUrlStatImpl } from '../models/stat'
import { StoreImpl } from '../models/store'
import { EventEmitterImpl } from '../subscribers/emitter'
import type { ShortUrlStat } from '../types/stat'
import type { Store } from '../types/store'
import type { EventEmitter } from '../types/subscribers'
import { ShortUrlStatResponse } from '../types/url'

export class ShortUrl {
  store: Store
  eventEmitter: EventEmitter

  constructor (store: Store = new StoreImpl(), eventEmitter: EventEmitter = new EventEmitterImpl()) {
    this.store = store
    this.eventEmitter = eventEmitter
  }

  registerUrl (originalUrl: string): ShortUrlStat {
    const stat = new ShortUrlStatImpl(originalUrl)

    this.store.saveStat(stat)

    return stat
  }

  getStats (): ShortUrlStatResponse[] {
    return this.store.getStats()
  }

  click (shortUrl: string): string | undefined {
    const stat = this.store.getStat(shortUrl)

    if (stat !== undefined) {
      stat.click()
      this.store.saveStat(stat)
    }

    return stat?.originalUrl
  }
}
