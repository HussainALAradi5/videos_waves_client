'use client'

import { createContext } from 'react'
import type { AuthContextValue } from '@/interfaces/users/auth/auth-context-value.interface'

export const AuthContext = createContext<AuthContextValue | null>(null)
