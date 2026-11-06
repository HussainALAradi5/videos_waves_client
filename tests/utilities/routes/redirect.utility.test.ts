import { describe, expect, it } from 'vitest'
import { toSafeRedirectPath } from '@/utilities/routes/redirect.utility'

describe('toSafeRedirectPath', () => {
  it('keeps same-site paths', () => {
    expect(toSafeRedirectPath('/messages?folder=requests')).toBe('/messages?folder=requests')
  })

  it('rejects other origins, protocol-relative paths, and backslash tricks', () => {
    for (const unsafe of ['https://evil.com', '//evil.com', '/\\evil.com', '/\\/evil.com', 'javascript:alert(1)', '', null]) {
      expect(toSafeRedirectPath(unsafe)).toBe('/')
    }
  })
})
