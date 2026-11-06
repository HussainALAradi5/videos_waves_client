import { FormFieldType } from '@/enums/common/form-field-type.enum'
import type { FormFieldConfig } from '@/interfaces/common/forms/form-field-config.interface'
import type { ProfileFormValues } from '@/validations/users/user/profile-form.validation'
import type { ChangePasswordFormValues } from '@/validations/users/user/change-password-form.validation'

export const PROFILE_FIELDS: FormFieldConfig<keyof ProfileFormValues>[] = [
  { name: 'userName', label: 'Username', type: FormFieldType.TEXT, autoComplete: 'username', isRequired: true },
  { name: 'email', label: 'Email', type: FormFieldType.EMAIL, autoComplete: 'email', isRequired: true },
  { name: 'image', label: 'Avatar URL', type: FormFieldType.URL, placeholder: 'https://…', helperText: 'Optional' }
]

export const CHANGE_PASSWORD_FIELDS: FormFieldConfig<keyof ChangePasswordFormValues>[] = [
  {
    name: 'currentPassword',
    label: 'Current password',
    type: FormFieldType.PASSWORD,
    autoComplete: 'current-password',
    isRequired: true
  },
  { name: 'newPassword', label: 'New password', type: FormFieldType.PASSWORD, autoComplete: 'new-password', isRequired: true },
  {
    name: 'confirmPassword',
    label: 'Confirm new password',
    type: FormFieldType.PASSWORD,
    autoComplete: 'new-password',
    isRequired: true
  }
]
