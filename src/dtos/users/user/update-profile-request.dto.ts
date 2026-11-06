import type { Gender } from '@/enums/users/user/gender.enum'

export interface UpdateProfileRequestDto {
  userName?: string
  email?: string
  /** `null` removes the number. */
  phone?: string | null
  bio?: string
  gender?: Gender
}
