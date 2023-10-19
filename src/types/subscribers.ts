/**
 * Event types which can be notified by an emitter and tracked by trackers
 */
export enum EventType {
  Click = 'click',
  Register = 'register',
  Stats = 'stats'
}

/**
 * In charge of emitting events
 */
export interface EventEmitter {
  emit: (eventType: EventType, params?: any) => void
}

/**
 * In charge of being notified by emitters
 */
export interface EventTracker {
  on: (eventType: EventType, params?: any) => any
}
