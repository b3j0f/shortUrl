import type { EventType } from './type'

export interface EventTracker {
  on: (eventType: EventType, params: any) => any
}
