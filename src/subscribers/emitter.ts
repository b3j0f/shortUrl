import type { EventType } from './type'

export interface EventEmitterItf {
  emit: (eventType: EventType) => any
}

export class EventEmitter implements EventEmitterItf {
  emit (eventType: EventType): any {
  }
}
