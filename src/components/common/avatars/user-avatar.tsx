import { Avatar } from '@chakra-ui/react'
import { PALETTES } from '@/constants/common/theme.constants'
import type { UserAvatarProps } from '@/interfaces/components/common/avatars/user-avatar-props.interface'

export function UserAvatar({ user, size = 'sm' }: UserAvatarProps) {
  return (
    <Avatar.Root size={size} colorPalette={PALETTES.BRAND}>
      <Avatar.Fallback name={user.userName} />
      {user.image && <Avatar.Image src={user.image} alt={user.userName} />}
    </Avatar.Root>
  )
}
