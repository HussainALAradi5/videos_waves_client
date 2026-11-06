import type { useUserTransfer } from '@/hooks/users/admin-users/use-user-transfer'

export interface ImportUsersDialogProps {
  isOpen: boolean
  onClose: () => void
  transfer: ReturnType<typeof useUserTransfer>
}
