import { AdminRequestStatus } from '@/enums/users/admin-request/admin-request-status.enum'
import type { StatusOption } from '@/interfaces/common/badges/status-option.interface'

export const ADMIN_REQUEST_STATUS_OPTIONS: Record<AdminRequestStatus, StatusOption> = {
  [AdminRequestStatus.PENDING]: { label: 'Pending', colorPalette: 'yellow' },
  [AdminRequestStatus.ACCEPTED]: { label: 'Accepted', colorPalette: 'green' },
  [AdminRequestStatus.REJECTED]: { label: 'Rejected', colorPalette: 'red' },
  [AdminRequestStatus.CANCELLED]: { label: 'Cancelled', colorPalette: 'gray' }
}
