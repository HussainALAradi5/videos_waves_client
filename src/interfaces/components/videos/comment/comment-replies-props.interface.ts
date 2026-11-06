import type { Comment } from '@/interfaces/videos/comment/comment.interface'

export interface CommentRepliesProps {
  comment: Comment
  videoOwnerId: string
  isOpen: boolean
  onToggle: () => void
  onReply: (comment: Comment) => void
}
