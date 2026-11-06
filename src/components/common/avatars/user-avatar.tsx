import { Avatar, Box, Float } from '@chakra-ui/react'
import type { UserAvatarProps } from '@/interfaces/components/common/avatars/user-avatar-props.interface'
import { resolveAvatarUrl } from '@/utilities/users/avatar.utility'

/** A profile picture, falling back to the standard male, female, or neutral avatar. */
export function UserAvatar({ user, size = 'sm', hasRing = false, isOnline = null }: UserAvatarProps) {
  return (
    <Box rounded="full" p={hasRing ? '2px' : '0'} bgImage={hasRing ? '{gradients.brand}' : undefined} flexShrink={0}>
      <Avatar.Root size={size} borderWidth={hasRing ? '2px' : '0'} borderColor="app.surface">
        <Avatar.Fallback name={user.userName} />
        <Avatar.Image src={resolveAvatarUrl(user)} alt={user.userName} />
        {isOnline && (
          <Float placement="bottom-end" offsetX="1" offsetY="1">
            <Box boxSize="2.5" bg="green.500" rounded="full" borderWidth="2px" borderColor="app.surface" />
          </Float>
        )}
      </Avatar.Root>
    </Box>
  )
}
