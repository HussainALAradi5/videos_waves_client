import type { DropdownOption } from '@/interfaces/common/dropdown/dropdown-option.interface'

export interface MultiSelectDropdownProps {
  label?: string
  /** The options to show; for server search, pass the current results and handle `onSearch`. */
  options: DropdownOption[]
  /** Labels of selected values, so chips render even when a value is not in the current results. */
  selected: DropdownOption[]
  onChange: (selected: DropdownOption[]) => void
  onSearch: (text: string) => void
  placeholder?: string
  emptyText: string
  maxSelected?: number
  isLoading?: boolean
}
