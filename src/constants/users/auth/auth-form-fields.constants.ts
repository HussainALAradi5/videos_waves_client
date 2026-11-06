import { FormFieldType } from '@/enums/common/form-field-type.enum'
import type { FormFieldConfig } from '@/interfaces/common/forms/form-field-config.interface'
import type { LoginFormValues } from '@/validations/users/auth/login-form.validation'
import type { RegisterFormValues } from '@/validations/users/auth/register-form.validation'
import { GENDER_OPTIONS } from '../user/gender-options.constants'

export const LOGIN_FIELDS: FormFieldConfig<keyof LoginFormValues>[] = [
  { name: 'identifier', label: 'Username or email', type: FormFieldType.TEXT, autoComplete: 'username', isRequired: true },
  { name: 'password', label: 'Password', type: FormFieldType.PASSWORD, autoComplete: 'current-password', isRequired: true }
]

export const REGISTER_FIELDS: FormFieldConfig<keyof RegisterFormValues>[] = [
  {
    name: 'userName',
    label: 'Username',
    type: FormFieldType.TEXT,
    autoComplete: 'username',
    helperText: '3-30 letters, numbers, dots, or underscores',
    isRequired: true
  },
  { name: 'email', label: 'Email', type: FormFieldType.EMAIL, autoComplete: 'email', isRequired: true },
  { name: 'phone', label: 'Phone number (optional)', type: FormFieldType.TEL, autoComplete: 'tel', placeholder: '+973 3300 1122', helperText: 'Private. People who know it can find you to message you.' },
  {
    name: 'password',
    label: 'Password',
    type: FormFieldType.PASSWORD,
    autoComplete: 'new-password',
    helperText: 'At least 8 characters with upper and lower case letters and a number',
    isRequired: true
  },
  {
    name: 'gender',
    label: 'Gender',
    type: FormFieldType.CHOICE,
    options: GENDER_OPTIONS,
    helperText: 'Used for your standard avatar until you add a photo',
    isRequired: true
  }
]
