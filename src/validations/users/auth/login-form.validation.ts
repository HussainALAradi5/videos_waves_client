import { z } from 'zod'
import { requiredText } from '../common/user-fields.validation'

export const loginFormSchema = z.object({
  identifier: requiredText('Username or email'),
  password: requiredText('Password')
})

export type LoginFormValues = z.infer<typeof loginFormSchema>
