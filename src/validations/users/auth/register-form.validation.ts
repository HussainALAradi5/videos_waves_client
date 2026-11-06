import { z } from 'zod'
import { emailRule, passwordRule, phoneRule, userNameRule } from '../common/user-fields.validation'
import { genderRule } from '../common/gender.validation'

export const registerFormSchema = z.object({
  userName: userNameRule,
  email: emailRule,
  phone: phoneRule,
  password: passwordRule,
  gender: genderRule
})

export type RegisterFormValues = z.infer<typeof registerFormSchema>
