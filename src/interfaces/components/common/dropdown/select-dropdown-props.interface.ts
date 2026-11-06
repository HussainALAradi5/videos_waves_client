import type { DropdownOption } from '@/interfaces/common/dropdown/dropdown-option.interface'

export interface SelectDropdownProps {
  label?: string
  options: DropdownOption[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  size?: 'sm' | 'md' | 'lg'
  width?: string
  isDisabled?: boolean
}
