import type { Gender } from '@/enums/users/user/gender.enum'

export interface RegisterRequestDto {
  userName: string
  email: string
  phone?: string
  password: string
  gender: Gender
}
