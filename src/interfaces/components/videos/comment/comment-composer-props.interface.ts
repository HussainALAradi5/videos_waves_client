import type { Comment } from '@/interfaces/videos/comment/comment.interface'

export interface CommentComposerProps {
  content: string
  onChange: (content: string) => void
  replyTo: Comment | null
  onCancelReply: () => void
  onSubmit: () => unknown
  canSubmit: boolean
}
