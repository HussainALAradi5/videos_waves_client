import { describe, expect, it } from 'vitest'
import { Gender } from '@/enums/users/user/gender.enum'
import { Role } from '@/enums/users/roles/role.enum'
import { parseCsv, toCsv } from '@/utilities/files/csv.utility'
import { parseImportFile } from '@/utilities/users/import-rows.utility'

describe('csv utilities', () => {
  it('round-trips quotes, commas, and line breaks, and neutralises formulas', () => {
    const csv = toCsv(['name', 'note'], [['ana', 'says "hi", then\nleaves'], ['=cmd', '@x']])
    expect(parseCsv(csv)).toEqual([
      ['name', 'note'],
      ['ana', 'says "hi", then\nleaves'],
      ["'=cmd", "'@x"]
    ])
  })

  it('reads import rows from the export or the template, defaulting the role and skipping bad rows', () => {
    const file = '﻿userName,email,gender,role\r\nlina,lina@example.com,Female,\r\n,missing@example.com,male,user\r\nomar,omar@example.com,male,ADMIN\r\nbad,bad@example.com,other,user\r\n'
    expect(parseImportFile(file)).toEqual({
      rows: [
        { userName: 'lina', email: 'lina@example.com', gender: Gender.FEMALE, role: Role.USER },
        { userName: 'omar', email: 'omar@example.com', gender: Gender.MALE, role: Role.ADMIN }
      ],
      invalidLines: [2, 4]
    })
  })
})
