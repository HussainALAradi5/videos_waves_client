import { FormFieldType } from '@/enums/common/form-field-type.enum'
import { TEXT_LIMITS } from '@/constants/common/limits.constants'
import type { FormFieldConfig } from '@/interfaces/common/forms/form-field-config.interface'
import type { ProfileFormValues } from '@/validations/users/user/profile-form.validation'
import type { ChangePasswordFormValues } from '@/validations/users/user/change-password-form.validation'
import { GENDER_OPTIONS } from './gender-options.constants'

export const PROFILE_FIELDS: FormFieldConfig<keyof ProfileFormValues>[] = [
  { name: 'userName', label: 'Username', type: FormFieldType.TEXT, autoComplete: 'username', isRequired: true },
  { name: 'email', label: 'Email', type: FormFieldType.EMAIL, autoComplete: 'email', isRequired: true },
  { name: 'phone', label: 'Phone number (optional)', type: FormFieldType.TEL, autoComplete: 'tel', placeholder: '+973 3300 1122', helperText: 'Private. People who know it can find you to message you.' },
  { name: 'bio', label: 'Bio', type: FormFieldType.TEXTAREA, maxLength: TEXT_LIMITS.BIO_MAX, helperText: 'Shown on your profile' },
  { name: 'gender', label: 'Gender', type: FormFieldType.CHOICE, options: GENDER_OPTIONS, isRequired: true }
]

export const CHANGE_PASSWORD_FIELDS: FormFieldConfig<keyof ChangePasswordFormValues>[] = [
  { name: 'currentPassword', label: 'Current password', type: FormFieldType.PASSWORD, autoComplete: 'current-password', isRequired: true },
  { name: 'newPassword', label: 'New password', type: FormFieldType.PASSWORD, autoComplete: 'new-password', isRequired: true },
  { name: 'confirmPassword', label: 'Confirm new password', type: FormFieldType.PASSWORD, autoComplete: 'new-password', isRequired: true }
]
