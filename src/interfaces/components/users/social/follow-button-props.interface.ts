export interface FollowButtonProps {
  userName: string
  isFollowing: boolean
  /** A request to this private account is waiting; clicking cancels it. */
  isRequested?: boolean
  /** Following a private account sends a request instead. */
  isPrivate?: boolean
  followsYou?: boolean
  size?: 'xs' | 'sm' | 'md'
}
