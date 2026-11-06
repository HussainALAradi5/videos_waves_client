import { TEXT_LIMITS } from '@/constants/common/limits.constants'

export const isValidCommentContent = (content: string): boolean => {
  const trimmed = content.trim()
  return trimmed.length > 0 && trimmed.length <= TEXT_LIMITS.COMMENT_MAX
}
