'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { MESSAGES } from '@/constants/common/messages.constants'
import { PAGE_ROUTES } from '@/constants/common/routes.constants'
import type { RegisterFormValues } from '@/validations/users/auth/register-form.validation'
import { authService } from '@/services/users/auth/auth.service'
import { notifyError, notifySuccess } from '@/utilities/toast/notify.utility'
import { useAuth } from './use-auth'

/** Registration signs the new user in straight away (the API returns a session). */
export const useRegister = () => {
  const router = useRouter()
  const { signIn } = useAuth()

  const mutation = useMutation({
    mutationFn: (values: RegisterFormValues) => authService.register({ ...values, phone: values.phone || undefined }),
    onSuccess: (session) => {
      signIn(session)
      notifySuccess(MESSAGES.AUTH.REGISTER_SUCCESS)
      router.replace(PAGE_ROUTES.HOME)
    },
    onError: notifyError
  })

  return { register: mutation.mutateAsync, isPending: mutation.isPending }
}
