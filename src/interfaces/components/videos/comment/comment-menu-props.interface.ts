export interface CommentMenuProps {
  canEdit: boolean
  canDelete: boolean
  onEdit: () => void
  onDelete: () => unknown
}
