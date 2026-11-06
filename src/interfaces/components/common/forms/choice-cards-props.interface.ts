import type { DropdownOption } from '@/interfaces/common/dropdown/dropdown-option.interface'

export interface ChoiceCardsProps {
  options: DropdownOption[]
  value: string
  onChange: (value: string) => void
}
