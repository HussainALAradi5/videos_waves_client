import { describe, expect, it } from 'vitest'
import { isTokenExpiring, readTokenExpiry } from '@/utilities/auth/jwt.utility'

const tokenWith = (payload: object): string =>
  ['header', btoa(JSON.stringify(payload)).replace(/=+$/, ''), 'signature'].join('.')

describe('jwt utility', () => {
  it('reads the expiry in milliseconds', () => {
    expect(readTokenExpiry(tokenWith({ exp: 100 }))).toBe(100_000)
    expect(readTokenExpiry('not-a-token')).toBeNull()
  })

  it('treats tokens inside the margin, and unreadable tokens, as expiring', () => {
    const token = tokenWith({ exp: 1000 })
    expect(isTokenExpiring(token, 60_000, 900_000)).toBe(false)
    expect(isTokenExpiring(token, 60_000, 960_000)).toBe(true)
    expect(isTokenExpiring('garbage', 60_000)).toBe(true)
  })
})
