import { describe, expect, test } from '@jest/globals'
import { EventEmitterImpl } from '../../../src/subscribers/emitter'
import { EventType } from '../../../src/types/subscribers'

class EventTracker {
  eventType: EventType | undefined
  params: any

  on (eventType: EventType, params: any): void {
    this.eventType = eventType
    this.params = params
  }
}

const eventTracker = new EventTracker()

const eventEmitter = new EventEmitterImpl([eventTracker])

describe('Subscribers', () => {
  test('init', () => {
    expect(eventTracker.eventType).toBeUndefined()
    expect(eventTracker.params).toBeUndefined()
  })

  test('click', () => {
    eventEmitter.emit(EventType.Click, EventType.Click)

    expect(eventTracker.eventType).toBe(EventType.Click)
    expect(eventTracker.params).toBe(EventType.Click)
  })

  test('register', () => {
    eventEmitter.emit(EventType.Register, EventType.Register)

    expect(eventTracker.eventType).toBe(EventType.Register)
    expect(eventTracker.params).toBe(EventType.Register)
  })

  test('stats', () => {
    eventEmitter.emit(EventType.Stats, EventType.Stats)

    expect(eventTracker.eventType).toBe(EventType.Stats)
    expect(eventTracker.params).toBe(EventType.Stats)
  })
})
