'use client'

import { LoadingState } from '@/components/common/feedback/loading-state'
import { useRequireAuth } from '@/hooks/users/auth/use-require-auth'
import type { RequireAuthProps } from '@/interfaces/components/middlewares/require-auth-props.interface'

/** Renders children only for a signed-in user (with the given role); otherwise redirects. */
export function RequireAuth({ children, role }: RequireAuthProps) {
  const { isAllowed } = useRequireAuth(role)
  return isAllowed ? <>{children}</> : <LoadingState />
}
