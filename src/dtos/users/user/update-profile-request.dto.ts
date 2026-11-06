import type { Gender } from '@/enums/users/user/gender.enum'

export interface UpdateProfileRequestDto {
  userName?: string
  email?: string
  bio?: string
  gender?: Gender
}
