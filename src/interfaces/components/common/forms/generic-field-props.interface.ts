import type { Control, FieldValues } from 'react-hook-form'
import type { FormFieldConfig } from '@/interfaces/common/forms/form-field-config.interface'

export interface GenericFieldProps<TValues extends FieldValues> {
  config: FormFieldConfig
  control: Control<TValues>
  error?: string
}
