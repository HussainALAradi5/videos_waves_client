import axios from 'axios'
import { ErrorCode } from '@/enums/common/error-code.enum'
import { MESSAGES } from '@/constants/common/messages.constants'
import type { ApiErrorBody } from '@/interfaces/common/api/api-error-body.interface'
import type { FieldErrorDetail } from '@/interfaces/common/api/field-error-detail.interface'

const NO_RESPONSE_STATUS = 0

/** The one error type every service rejects with, built from the server error envelope. */
export class ApiError extends Error {
  constructor(
    readonly status: number,
    readonly code: ErrorCode,
    message: string,
    readonly details: FieldErrorDetail[] = [],
    readonly requestId?: string
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export const toApiError = (error: unknown): ApiError => {
  if (error instanceof ApiError) return error
  if (!axios.isAxiosError(error)) {
    return new ApiError(NO_RESPONSE_STATUS, ErrorCode.INTERNAL_ERROR, MESSAGES.COMMON.UNEXPECTED_ERROR)
  }
  if (!error.response) {
    return new ApiError(NO_RESPONSE_STATUS, ErrorCode.NETWORK_ERROR, MESSAGES.COMMON.NETWORK_ERROR)
  }
  const body = (error.response.data as { error?: ApiErrorBody } | undefined)?.error
  return body
    ? new ApiError(error.response.status, body.code, body.message, body.details ?? [], body.requestId)
    : new ApiError(error.response.status, ErrorCode.INTERNAL_ERROR, MESSAGES.COMMON.UNEXPECTED_ERROR)
}

export const getErrorMessage = (error: unknown): string => toApiError(error).message

export const isNotFoundError = (error: unknown): boolean => toApiError(error).code === ErrorCode.NOT_FOUND
