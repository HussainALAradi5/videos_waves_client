import type { SelectOption } from '@/interfaces/common/forms/select-option.interface'

export interface SelectFieldProps<TValue extends string> {
  label: string
  value: TValue | ''
  options: SelectOption<TValue>[]
  onChange: (value: TValue | '') => void
  /** Adds an empty option (for "all" filters). */
  placeholder?: string
}
