import type { Comment } from '@/interfaces/videos/comment/comment.interface'

export interface CommentMetaProps {
  comment: Comment
  canApprove: boolean
  onApprove: () => unknown
  onReply?: () => void
}
