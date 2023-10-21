import { describe, expect, test } from '@jest/globals'
import { EventType } from '../../../src/types/subscribers'

import { eventEmitter, eventTracker } from '../../utils'

describe('Subscribers', () => {
  test('init', () => {
    expect(eventTracker.eventType).toBeUndefined()
    expect(eventTracker.params).toBeUndefined()
    expect(eventTracker.nbCalled).toBe(0)
  })

  test('click', () => {
    eventEmitter.emit(EventType.Click, EventType.Click)

    expect(eventTracker.eventType).toBe(EventType.Click)
    expect(eventTracker.params).toBe(EventType.Click)
    expect(eventTracker.nbCalled).toBe(3)
  })

  test('register', () => {
    eventEmitter.emit(EventType.Register, EventType.Register)

    expect(eventTracker.eventType).toBe(EventType.Register)
    expect(eventTracker.params).toBe(EventType.Register)

    expect(eventTracker.nbCalled).toBe(6)
  })

  test('stats', () => {
    eventEmitter.emit(EventType.Analytics, EventType.Analytics)

    expect(eventTracker.eventType).toBe(EventType.Analytics)
    expect(eventTracker.params).toBe(EventType.Analytics)
    expect(eventTracker.nbCalled).toBe(9)
  })
})
