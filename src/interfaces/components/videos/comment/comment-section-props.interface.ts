export interface CommentSectionProps {
  videoId: string
  videoOwnerId: string
  /** The video's count (replies included), so the header matches the feed card. */
  commentsCount: number
}
