'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { MESSAGES } from '@/constants/common/messages.constants'
import { PAGE_ROUTES } from '@/constants/common/routes.constants'
import { notifyWarning } from '@/utilities/toast/notify.utility'
import { LoadingState } from '@/components/common/feedback/loading-state'

/** Any unknown address: back to the home feed with a warning toast. */
export default function NotFound() {
  const router = useRouter()
  const hasRedirected = useRef(false)
  useEffect(() => {
    if (hasRedirected.current) return
    hasRedirected.current = true
    notifyWarning(MESSAGES.COMMON.INVALID_PAGE)
    router.replace(PAGE_ROUTES.HOME)
  }, [router])
  return <LoadingState />
}
