import { describe, expect, it } from 'vitest'
import { Gender } from '@/enums/users/user/gender.enum'
import { formatDuration } from '@/utilities/format/duration-format.utility'
import { formatFileSize } from '@/utilities/format/file-size.utility'
import { toPercent } from '@/utilities/format/percent.utility'
import { describeUserAgent } from '@/utilities/format/user-agent.utility'
import { resolveAvatarUrl } from '@/utilities/users/avatar.utility'

describe('format utilities', () => {
  it('formats durations, sizes, and progress', () => {
    expect(formatDuration(75.4)).toBe('1:15')
    expect(formatDuration(null)).toBeNull()
    expect(formatFileSize(512)).toBe('512 B')
    expect(formatFileSize(1536)).toBe('1.5 KB')
    expect(formatFileSize(25 * 1024 * 1024)).toBe('25 MB')
    expect(toPercent(50, 200)).toBe(25)
    expect(toPercent(10, undefined)).toBe(0)
  })

  it('names devices from user agents', () => {
    expect(describeUserAgent('Mozilla/5.0 (Windows NT 10.0) AppleWebKit Chrome/140.0 Safari/537')).toBe('Chrome on Windows')
    expect(describeUserAgent('Dart/3.13 (dart:io)')).toBe('Videos Waves app')
    expect(describeUserAgent('')).toBeNull()
  })

  it('falls back to the standard avatar for the gender, or a neutral one', () => {
    expect(resolveAvatarUrl({ avatarUrl: 'https://cdn.example.com/me.png', gender: Gender.MALE })).toBe('https://cdn.example.com/me.png')
    expect(resolveAvatarUrl({ avatarUrl: null, gender: Gender.FEMALE })).toBe('/avatars/female.svg')
    expect(resolveAvatarUrl({ avatarUrl: null, gender: null })).toBe('/avatars/neutral.svg')
  })
})
