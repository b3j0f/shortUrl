import { describe, expect, test } from '@jest/globals'
import { checkHttpUrl } from '../../../src/lib/url'

describe('checkHttpUrl', () => {
  test('invalid url', () => {
    expect(checkHttpUrl('')).toBeFalsy()
    expect(checkHttpUrl('https://lunii')).toBeFalsy()
    expect(checkHttpUrl('https:lunii')).toBeFalsy()
    expect(checkHttpUrl('ftp://lunii.com')).toBeFalsy()
  })

  test('valid url', () => {
    expect(checkHttpUrl('http://lunii.com')).toBeTruthy()
    expect(checkHttpUrl('https://lunii.com')).toBeTruthy()
  })
})
