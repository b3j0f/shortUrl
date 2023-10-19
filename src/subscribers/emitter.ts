import type { ShortUrlStat } from '../types/stat'
import type { EventEmitter, EventTracker, EventType } from '../types/subscribers'

export class EventEmitterImpl implements EventEmitter {
  trackers?: EventTracker[]

  constructor (trackers?: EventTracker[]) {
    this.trackers = trackers
  }

  emit (eventType: EventType, stat: ShortUrlStat): void {
    for (const tracker of this.trackers ?? []) {
      tracker.on(eventType, stat)
    }
  }
}
