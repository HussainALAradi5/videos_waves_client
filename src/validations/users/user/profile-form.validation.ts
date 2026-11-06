import { z } from 'zod'
import { emailRule, userNameRule } from '../common/user-fields.validation'

export const profileFormSchema = z.object({
  userName: userNameRule,
  email: emailRule,
  image: z.union([z.url('Enter a valid URL.'), z.literal('')])
})

export type ProfileFormValues = z.infer<typeof profileFormSchema>
