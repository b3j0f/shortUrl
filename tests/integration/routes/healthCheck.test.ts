import { describe, test, expect } from '@jest/globals'
import request from 'supertest'

import app from '../../../src/loaders/app'

describe('healthCheck', () => {
  test('ping', async () => {
    const res = await request(app).get('/ping')

    expect(res.statusCode).toBe(200)
    expect(res.text).toBe('pong')
  })
})
