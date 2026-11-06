'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { MESSAGES } from '@/constants/common/messages.constants'
import { QUERY_KEYS } from '@/constants/common/query-keys.constants'
import type { DecideAdminRequestDto } from '@/dtos/users/admin-request/decide-admin-request.dto'
import type { AdminRequestFormValues } from '@/validations/users/admin-request/admin-request-form.validation'
import { adminRequestService } from '@/services/users/admin-request/admin-request.service'
import { notifyError, notifySuccess } from '@/utilities/toast/notify.utility'

export const useAdminRequestActions = () => {
  const queryClient = useQueryClient()
  const refresh = () => queryClient.invalidateQueries({ queryKey: QUERY_KEYS.adminRequests })

  const onSuccess = (message: string) => async () => {
    notifySuccess(message)
    await refresh()
  }

  const create = useMutation({
    mutationFn: (values: AdminRequestFormValues) => adminRequestService.create(values),
    onSuccess: onSuccess(MESSAGES.ADMIN_REQUESTS.CREATED),
    onError: notifyError
  })

  const cancel = useMutation({
    mutationFn: (requestId: string) => adminRequestService.cancel(requestId),
    onSuccess: onSuccess(MESSAGES.ADMIN_REQUESTS.CANCELLED),
    onError: notifyError
  })

  const decide = useMutation({
    mutationFn: ({ requestId, dto }: { requestId: string; dto: DecideAdminRequestDto }) =>
      adminRequestService.decide(requestId, dto),
    onSuccess: onSuccess(MESSAGES.ADMIN_REQUESTS.DECIDED),
    onError: notifyError
  })

  return { create, cancel, decide }
}
