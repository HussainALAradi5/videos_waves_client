import type { usePeoplePicker } from '@/hooks/chat/conversation/use-people-picker'

export interface PeoplePickerProps {
  picker: ReturnType<typeof usePeoplePicker>
  maxSelected?: number
}
