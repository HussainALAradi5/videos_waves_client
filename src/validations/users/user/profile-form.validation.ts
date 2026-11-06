import { z } from 'zod'
import { TEXT_LIMITS } from '@/constants/common/limits.constants'
import { emailRule, userNameRule } from '../common/user-fields.validation'
import { genderRule } from '../common/gender.validation'

export const profileFormSchema = z.object({
  userName: userNameRule,
  email: emailRule,
  bio: z.string().trim().max(TEXT_LIMITS.BIO_MAX),
  gender: genderRule
})

export type ProfileFormValues = z.infer<typeof profileFormSchema>
