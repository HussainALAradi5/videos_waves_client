import { z } from 'zod'
import { emailRule, passwordRule, userNameRule } from '../common/user-fields.validation'
import { genderRule } from '../common/gender.validation'

export const registerFormSchema = z.object({
  userName: userNameRule,
  email: emailRule,
  password: passwordRule,
  gender: genderRule
})

export type RegisterFormValues = z.infer<typeof registerFormSchema>
