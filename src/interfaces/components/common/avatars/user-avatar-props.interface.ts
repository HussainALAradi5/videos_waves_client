import type { PublicUser } from '@/interfaces/users/user/public-user.interface'

export interface UserAvatarProps {
  user: Pick<PublicUser, 'userName' | 'image'>
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
}
