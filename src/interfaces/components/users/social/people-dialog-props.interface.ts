import type { PeopleList } from '@/hooks/users/social/use-people'

export interface PeopleDialogProps {
  userName: string
  list: PeopleList | null
  onClose: () => void
}
