import type { UseFormRegisterReturn } from 'react-hook-form'
import type { FormFieldConfig } from '@/interfaces/common/forms/form-field-config.interface'

export interface FormFieldProps {
  config: FormFieldConfig
  registration: UseFormRegisterReturn
  error?: string
}
