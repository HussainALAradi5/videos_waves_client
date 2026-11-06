'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { MESSAGES } from '@/constants/common/messages.constants'
import type { LoginFormValues } from '@/validations/users/auth/login-form.validation'
import { authService } from '@/services/users/auth/auth.service'
import { notifyError, notifySuccess } from '@/utilities/toast/notify.utility'
import { toSafeRedirectPath } from '@/utilities/routes/redirect.utility'
import { useAuth } from './use-auth'

export const useLogin = (redirectTo: string | null) => {
  const router = useRouter()
  const { signIn } = useAuth()

  const mutation = useMutation({
    mutationFn: (values: LoginFormValues) => authService.login(values),
    onSuccess: (session) => {
      signIn(session)
      notifySuccess(MESSAGES.AUTH.LOGIN_SUCCESS)
      router.replace(toSafeRedirectPath(redirectTo))
    },
    onError: notifyError
  })

  return { login: mutation.mutateAsync, isPending: mutation.isPending }
}
