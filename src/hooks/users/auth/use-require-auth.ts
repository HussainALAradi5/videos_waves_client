'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { PAGE_ROUTES } from '@/constants/common/routes.constants'
import type { Role } from '@/enums/users/roles/role.enum'
import { tokenStorage } from '@/services/storage/token-storage.service'
import { buildLoginPath } from '@/utilities/routes/redirect.utility'
import { useAuth } from './use-auth'

/**
 * Client-side route guard. Tokens live in browser storage, so the check runs in the browser;
 * the API still enforces every permission.
 */
export const useRequireAuth = (role?: Role) => {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const hasRole = !role || user?.role === role

  useEffect(() => {
    if (isLoading) return
    // Read storage directly: during hydration the context has not seen the stored session yet.
    if (!user && !tokenStorage.hasSession()) router.replace(buildLoginPath(pathname))
    else if (user && !hasRole) router.replace(PAGE_ROUTES.HOME)
  }, [isLoading, user, hasRole, router, pathname])

  return { isAllowed: user !== null && hasRole }
}
