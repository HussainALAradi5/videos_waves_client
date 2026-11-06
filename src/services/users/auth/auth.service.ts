import { AUTH_ENDPOINTS } from '@/config/api/endpoints/auth.endpoints'
import type { LoginRequestDto } from '@/dtos/users/auth/login-request.dto'
import type { RegisterRequestDto } from '@/dtos/users/auth/register-request.dto'
import type { AuthSession } from '@/interfaces/users/auth/auth-session.interface'
import { postData } from '../../api/api-request'

export const authService = {
  register: (dto: RegisterRequestDto) => postData<AuthSession>(AUTH_ENDPOINTS.REGISTER, dto),
  login: (dto: LoginRequestDto) => postData<AuthSession>(AUTH_ENDPOINTS.LOGIN, dto),
  logout: () => postData<{ message: string }>(AUTH_ENDPOINTS.LOGOUT)
}
