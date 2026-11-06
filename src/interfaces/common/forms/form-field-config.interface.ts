import type { FormFieldType } from '@/enums/common/form-field-type.enum'

/** Describes one input rendered by GenericForm. */
export interface FormFieldConfig<TName extends string = string> {
  name: TName
  label: string
  type: FormFieldType
  placeholder?: string
  helperText?: string
  autoComplete?: string
  isRequired?: boolean
}
