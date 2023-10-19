import { describe, expect, test } from '@jest/globals'

import config from '../../../src/config'

describe('config', () => {
  test('env', () => {
    expect(config.env).toBe('test')
  })

  test('host', () => {
    expect(config.host).toBe('0.0.0.0')
  })

  test('port', () => {
    expect(config.port).toBe(3000)
  })

  test('shortUrlLength', () => {
    expect(config.shortUrlLength).toBe(6)
  })
})
