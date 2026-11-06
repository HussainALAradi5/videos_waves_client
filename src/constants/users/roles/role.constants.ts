import { Role } from '@/enums/users/roles/role.enum'
import type { StatusOption } from '@/interfaces/common/badges/status-option.interface'

export const ROLE_OPTIONS: Record<Role, StatusOption> = {
  [Role.ADMIN]: { label: 'Admin', colorPalette: 'orange' },
  [Role.USER]: { label: 'Member', colorPalette: 'cyan' }
}
