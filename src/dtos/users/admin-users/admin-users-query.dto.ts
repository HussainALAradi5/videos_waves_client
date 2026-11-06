import type { PageRequestDto } from '@/dtos/common/pagination/page-request.dto'
import type { AccountStatus } from '@/enums/users/user/account-status.enum'
import type { Role } from '@/enums/users/roles/role.enum'

export interface AdminUsersQueryDto extends PageRequestDto<'createdAt' | 'userName' | 'email'> {
  search?: string
  role?: Role
  status?: AccountStatus
}
