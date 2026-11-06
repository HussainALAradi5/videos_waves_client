import type { ImportUserRow } from '@/dtos/users/admin-users/import-users.dto'
import { Gender } from '@/enums/users/user/gender.enum'
import { Role } from '@/enums/users/roles/role.enum'
import { parseCsvRecords } from '@/utilities/files/csv.utility'

export interface ParsedImport {
  rows: ImportUserRow[]
  /** 1-based line numbers (after the header) that are missing a username, email, or valid gender. */
  invalidLines: number[]
}

const GENDERS = Object.values(Gender) as string[]

/**
 * Reads `userName,email,gender[,role]` rows; the export file works as a template too.
 * The server validates every row again.
 */
export const parseImportFile = (text: string): ParsedImport => {
  const result: ParsedImport = { rows: [], invalidLines: [] }
  parseCsvRecords(text).forEach((record, index) => {
    const gender = record.gender?.toLowerCase()
    if (!record.username || !record.email || !GENDERS.includes(gender)) {
      result.invalidLines.push(index + 1)
      return
    }
    result.rows.push({
      userName: record.username,
      email: record.email,
      gender: gender as Gender,
      role: record.role?.toLowerCase() === Role.ADMIN ? Role.ADMIN : Role.USER
    })
  })
  return result
}
