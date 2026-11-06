import type { User } from '../user/user.interface'
import type { AuthSession } from './auth-session.interface'

export interface AuthContextValue {
  user: User | null
  isAuthenticated: boolean
  isAdmin: boolean
  /** True until the stored session has been checked against the server. */
  isLoading: boolean
  signIn: (session: AuthSession) => void
  signOut: () => Promise<void>
}
