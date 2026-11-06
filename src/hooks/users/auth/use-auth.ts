'use client'

import { useContext } from 'react'
import type { AuthContextValue } from '@/interfaces/users/auth/auth-context-value.interface'
import { AuthContext } from '@/providers/auth/auth-context'

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside AuthProvider')
  return context
}
