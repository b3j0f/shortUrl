import { Stat } from '../models/stat'
import { Store, type StoreItf } from '../models/store'
import { EventEmitter, type EventEmitterItf } from '../subscribers/emitter'
import type { ShortUrlStat } from '../types/url'

export class ShortUrl {
  shortUrlStatStore: StoreItf
  eventEmitter: EventEmitterItf

  constructor (shortUrlStatStore: StoreItf = new Store(), eventEmitter: EventEmitterItf = new EventEmitter()) {
    this.shortUrlStatStore = shortUrlStatStore
    this.eventEmitter = eventEmitter
  }

  postUrl (originalUrl: string): ShortUrlStat {
    const stat = new Stat(originalUrl)

    this.shortUrlStatStore.saveStat(stat)

    return stat
  }

  getStat (shortUrl: string): ShortUrlStat | undefined {
    return this.shortUrlStatStore.getStat(shortUrl)
  }

  click (shortUrl: string): string | undefined {
    const stat = this.shortUrlStatStore.getStat(shortUrl)

    if (stat !== undefined) {
      stat.click()
      this.shortUrlStatStore.saveStat(stat)
    }

    return stat?.originalUrl
  }
}
