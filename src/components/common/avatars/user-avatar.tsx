import { Avatar, Box, Float } from '@chakra-ui/react'
import type { UserAvatarProps } from '@/interfaces/components/common/avatars/user-avatar-props.interface'
import { PRESENCE_LOOK } from '@/constants/chat/presence.constants'
import { PresenceState } from '@/enums/chat/realtime/presence-state.enum'
import { resolveAvatarUrl } from '@/utilities/users/avatar.utility'

/** A profile picture (standard male, female, or neutral fallback) with a status dot when known. */
export function UserAvatar({ user, size = 'sm', hasRing = false, isOnline = null, presence }: UserAvatarProps) {
  const dot = presence ? PRESENCE_LOOK[presence].color : isOnline ? PRESENCE_LOOK[PresenceState.ONLINE].color : null
  return (
    <Box rounded="full" p={hasRing ? '2px' : '0'} bgImage={hasRing ? '{gradients.brand}' : undefined} flexShrink={0}>
      <Avatar.Root size={size} borderWidth={hasRing ? '2px' : '0'} borderColor="app.surface">
        <Avatar.Fallback name={user.userName} />
        <Avatar.Image src={resolveAvatarUrl(user)} alt={user.userName} />
        {dot && (
          <Float placement="bottom-end" offsetX="1" offsetY="1">
            <Box boxSize="2.5" bg={dot} rounded="full" borderWidth="2px" borderColor="app.surface" title={presence ? PRESENCE_LOOK[presence].label : undefined} />
          </Float>
        )}
      </Avatar.Root>
    </Box>
  )
}
