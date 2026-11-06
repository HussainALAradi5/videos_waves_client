import { z } from 'zod'
import { emailRule, passwordRule, userNameRule } from '../common/user-fields.validation'

export const registerFormSchema = z.object({
  userName: userNameRule,
  email: emailRule,
  password: passwordRule
})

export type RegisterFormValues = z.infer<typeof registerFormSchema>
