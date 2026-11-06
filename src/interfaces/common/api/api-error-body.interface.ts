import type { ErrorCode } from '@/enums/common/error-code.enum'
import type { FieldErrorDetail } from './field-error-detail.interface'

export interface ApiErrorBody {
  code: ErrorCode
  message: string
  details?: FieldErrorDetail[]
  requestId?: string
}
