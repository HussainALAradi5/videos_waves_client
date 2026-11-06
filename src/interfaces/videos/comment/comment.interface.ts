import type { PublicUser } from '@/interfaces/users/user/public-user.interface'

export interface Comment {
  id: string
  code: string
  videoId: string
  content: string
  author: PublicUser
  createdAt: string
  updatedAt: string
}
