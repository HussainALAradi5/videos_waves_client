import { AUTH_ENDPOINTS } from '@/config/api/endpoints/auth.endpoints'
import type { LoginRequestDto } from '@/dtos/users/auth/login-request.dto'
import type { RegisterRequestDto } from '@/dtos/users/auth/register-request.dto'
import type { AuthSession } from '@/interfaces/users/auth/auth-session.interface'
import type { DeviceSession } from '@/interfaces/users/auth/device-session.interface'
import { deleteData, getData, postData } from '../../api/api-request'

export const authService = {
  register: (dto: RegisterRequestDto) => postData<AuthSession>(AUTH_ENDPOINTS.REGISTER, dto),
  login: (dto: LoginRequestDto) => postData<AuthSession>(AUTH_ENDPOINTS.LOGIN, dto),
  /** Signs out this device only. */
  logout: () => postData<{ message: string }>(AUTH_ENDPOINTS.LOGOUT),
  logoutEverywhere: () => postData<{ message: string }>(AUTH_ENDPOINTS.LOGOUT_ALL),
  listSessions: () => getData<DeviceSession[]>(AUTH_ENDPOINTS.SESSIONS),
  revokeSession: (sessionId: string) => deleteData<{ message: string }>(AUTH_ENDPOINTS.session(sessionId))
}
