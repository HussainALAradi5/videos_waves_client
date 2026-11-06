'use client'

import type { PropsWithChildren } from 'react'
import { useAuthSession } from '@/hooks/users/auth/use-auth-session'
import { AuthContext } from './auth-context'

export function AuthProvider({ children }: PropsWithChildren) {
  return <AuthContext.Provider value={useAuthSession()}>{children}</AuthContext.Provider>
}
