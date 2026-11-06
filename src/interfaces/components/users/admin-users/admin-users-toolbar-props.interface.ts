export interface AdminUsersToolbarProps {
  search: string
  role: string
  status: string
  onSearchChange: (value: string) => void
  onRoleChange: (value: string) => void
  onStatusChange: (value: string) => void
  onExport: () => Promise<void>
  onImport: () => void
}
