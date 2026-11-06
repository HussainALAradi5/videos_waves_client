import type { User } from '../user/user.interface'
import type { AuthTokens } from './auth-tokens.interface'

export interface AuthSession extends AuthTokens {
  user: User
}
