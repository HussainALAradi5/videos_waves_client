import type { DropdownOption } from '@/interfaces/common/dropdown/dropdown-option.interface'

export interface SelectedChipsProps {
  options: DropdownOption[]
  onRemove: (value: string) => void
}
