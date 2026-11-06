import type { Comment } from '@/interfaces/videos/comment/comment.interface'

export interface CommentItemProps {
  comment: Comment
  videoOwnerId: string
  onReply: (comment: Comment) => void
  /** Replies are not themselves replied to in a nested thread. */
  isReply?: boolean
}
