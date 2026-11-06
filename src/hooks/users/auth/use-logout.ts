'use client'

import { useRouter } from 'next/navigation'
import { MESSAGES } from '@/constants/common/messages.constants'
import { PAGE_ROUTES } from '@/constants/common/routes.constants'
import { notifySuccess } from '@/utilities/toast/notify.utility'
import { useAuth } from './use-auth'

export const useLogout = () => {
  const router = useRouter()
  const { signOut } = useAuth()

  return async () => {
    // Local sign-out always succeeds, even if the server call fails.
    await signOut().catch(() => undefined)
    notifySuccess(MESSAGES.AUTH.LOGGED_OUT)
    router.replace(PAGE_ROUTES.HOME)
  }
}
