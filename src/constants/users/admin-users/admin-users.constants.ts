import { AccountStatus } from '@/enums/users/user/account-status.enum'
import { Role } from '@/enums/users/roles/role.enum'
import type { DropdownOption } from '@/interfaces/common/dropdown/dropdown-option.interface'
import type { StatusOption } from '@/interfaces/common/badges/status-option.interface'
import { ROLE_OPTIONS } from '@/constants/users/roles/role.constants'

export const ACCOUNT_STATUS_OPTIONS: Record<AccountStatus, StatusOption> = {
  [AccountStatus.ACTIVE]: { label: 'Active', colorPalette: 'green' },
  [AccountStatus.INACTIVE]: { label: 'Inactive', colorPalette: 'red' }
}

const ALL = ''

export const ROLE_FILTER_OPTIONS: DropdownOption[] = [
  { value: ALL, label: 'All roles' },
  ...Object.values(Role).map((role) => ({ value: role, label: ROLE_OPTIONS[role].label }))
]

export const STATUS_FILTER_OPTIONS: DropdownOption[] = [
  { value: ALL, label: 'All statuses' },
  ...Object.values(AccountStatus).map((status) => ({ value: status, label: ACCOUNT_STATUS_OPTIONS[status].label }))
]

export const IMPORT_TEMPLATE = 'userName,email,gender,role\r\nnew_member,new.member@example.com,female,user\r\n'
export const IMPORT_TEMPLATE_FILE = 'videos-waves-users-template.csv'
export const IMPORT_RESULT_FILE = 'videos-waves-new-accounts.csv'
export const EXPORT_FILE = 'videos-waves-users.csv'
export const IMPORT_MAX_ROWS = 500

export const ADMIN_USERS_MESSAGES = {
  TITLE: 'Users',
  DESCRIPTION: 'Every account, including admins and deactivated users.',
  SEARCH: 'Search by username or email',
  EMPTY: 'No accounts match these filters.',
  EXPORT: 'Export CSV',
  IMPORT: 'Import CSV',
  DEACTIVATE: 'Deactivate',
  ACTIVATE: 'Activate',
  DEACTIVATED: (userName: string) => `${userName} was deactivated. Their videos and comments are hidden.`,
  ACTIVATED: (userName: string) => `${userName} is active again.`,
  CONFIRM_TITLE: (userName: string) => `Deactivate ${userName}?`,
  CONFIRM_BODY: 'They are signed out everywhere and cannot sign in. Their profile, videos, and comments are hidden until you activate them again. Nothing is deleted.',
  PROTECTED: 'Admins cannot be deactivated',
  IMPORT_TITLE: 'Import accounts',
  IMPORT_HELP: 'A CSV with the columns userName, email, gender (male or female), and optionally role (user or admin). Existing emails and usernames are skipped. At most 500 rows.',
  IMPORT_TEMPLATE: 'Download a template',
  IMPORT_PICK: 'Choose a CSV file',
  IMPORT_READY: (count: number) => `${count} ${count === 1 ? 'account' : 'accounts'} ready to import.`,
  IMPORT_INVALID: (lines: number[]) =>
    `${lines.length === 1 ? 'Row' : 'Rows'} ${lines.join(', ')} ${lines.length === 1 ? 'is' : 'are'} missing a username, email, or gender and will be left out.`,
  IMPORT_TOO_MANY: 'This file has more than 500 rows. Split it and import each part.',
  IMPORT_SUBMIT: 'Import',
  IMPORT_DONE: (created: number, skipped: number) => `${created} created, ${skipped} skipped.`,
  IMPORT_PASSWORDS: 'Each new account has a one-time temporary password. Download them now: they are not shown again.',
  IMPORT_DOWNLOAD: 'Download new accounts',
  CLOSE: 'Close',
  COLUMN_USER: 'User',
  COLUMN_EMAIL: 'Email',
  COLUMN_ROLE: 'Role',
  COLUMN_STATUS: 'Status',
  COLUMN_VIDEOS: 'Videos',
  COLUMN_JOINED: 'Joined'
} as const
