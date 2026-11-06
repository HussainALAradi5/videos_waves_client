export const COMMENT_MESSAGES = {
  OWNER: 'Owner',
  EDITED: 'Edited',
  PENDING: 'Only you and the video owner can see this',
  APPROVE: 'Approve',
  APPROVED: 'Comment approved',
  REPLY: 'Reply',
  REPLYING_TO: (userName: string) => `Replying to @${userName}`,
  VIEW_REPLIES: (count: number) => (count === 1 ? 'View 1 reply' : `View ${count} replies`),
  HIDE_REPLIES: 'Hide replies',
  OPTIONS: 'Comment options',
  DELETED_UNDO: 'Comment deleted'
} as const
