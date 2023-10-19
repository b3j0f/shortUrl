import type { EventEmitter, EventTracker, EventType } from '../types/subscribers'

/**
 * In charge of notifying trackers about event types.
 */
export class EventEmitterImpl implements EventEmitter {
  trackers?: EventTracker[]

  constructor (trackers?: EventTracker[]) {
    this.trackers = trackers
  }

  emit (eventType: EventType, params: any): void {
    this.trackers?.forEach(tracker => tracker.on(eventType, params))
  }
}
