import { Gender } from '@/enums/users/user/gender.enum'

/** Standard pictures (in /public/avatars) for people who have not uploaded one. */
export const DEFAULT_AVATARS = {
  [Gender.MALE]: '/avatars/male.svg',
  [Gender.FEMALE]: '/avatars/female.svg',
  NEUTRAL: '/avatars/neutral.svg'
} as const
