import type { ShortUrlStat } from '../types/stat'

export enum EventType {
  Click = 'click',
  Register = 'register',
  Stats = 'stats'
}

export interface EventEmitter {
  emit: (eventType: EventType, stat: ShortUrlStat) => void
}

export interface EventTracker {
  on: (eventType: EventType, stat: ShortUrlStat) => any
}
