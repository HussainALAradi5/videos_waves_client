import type { PageRequestDto } from '@/dtos/common/pagination/page-request.dto'
import type { AdminRequestStatus } from '@/enums/users/admin-request/admin-request-status.enum'

export interface AdminRequestQueryDto extends PageRequestDto<'createdAt' | 'status'> {
  status?: AdminRequestStatus
}
