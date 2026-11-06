import { USER_ENDPOINTS } from '@/config/api/endpoints/users.endpoints'
import type { UpdateProfileRequestDto } from '@/dtos/users/user/update-profile-request.dto'
import type { ChangePasswordRequestDto } from '@/dtos/users/user/change-password-request.dto'
import type { User } from '@/interfaces/users/user/user.interface'
import type { AuthSession } from '@/interfaces/users/auth/auth-session.interface'
import { deleteData, getData, patchData } from '../../api/api-request'

export const userService = {
  getMe: () => getData<User>(USER_ENDPOINTS.ME),
  updateMe: (dto: UpdateProfileRequestDto) => patchData<User>(USER_ENDPOINTS.ME, dto),
  changePassword: (dto: ChangePasswordRequestDto) => patchData<AuthSession>(USER_ENDPOINTS.ME_PASSWORD, dto),
  deactivate: () => deleteData<{ message: string }>(USER_ENDPOINTS.ME)
}
