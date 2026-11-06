import { z } from 'zod'
import { passwordRule, requiredText } from '../common/user-fields.validation'

export const changePasswordFormSchema = z
  .object({
    currentPassword: requiredText('Current password'),
    newPassword: passwordRule,
    confirmPassword: requiredText('Confirmation')
  })
  .refine((values) => values.newPassword === values.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword']
  })

export type ChangePasswordFormValues = z.infer<typeof changePasswordFormSchema>
