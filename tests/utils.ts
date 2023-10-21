import { EventEmitterImpl } from '../src/subscribers/emitter'
import type { EventType } from '../src/types/subscribers'

class EventTracker {
  eventType: EventType | undefined
  params: any
  nbCalled: number = 0

  on (eventType: EventType, params: any): void {
    this.eventType = eventType
    this.params = params
    this.nbCalled++
  }
}

export const eventTracker = new EventTracker()

export const eventEmitter = new EventEmitterImpl([eventTracker, eventTracker, eventTracker])
