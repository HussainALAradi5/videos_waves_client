import type { FormFieldType } from '@/enums/common/form-field-type.enum'
import type { DropdownOption } from '@/interfaces/common/dropdown/dropdown-option.interface'

/** Describes one input rendered by GenericForm. */
export interface FormFieldConfig<TName extends string = string> {
  name: TName
  label: string
  type: FormFieldType
  placeholder?: string
  helperText?: string
  autoComplete?: string
  isRequired?: boolean
  /** For CHOICE fields. */
  options?: DropdownOption[]
  maxLength?: number
}
