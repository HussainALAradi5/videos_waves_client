'use client'

import { useRouter } from 'next/navigation'
import { Button, Menu, Portal, Text } from '@chakra-ui/react'
import { LuLogOut, LuShieldCheck, LuUser } from 'react-icons/lu'
import { MESSAGES } from '@/constants/common/messages.constants'
import { PAGE_ROUTES } from '@/constants/common/routes.constants'
import { useAuth } from '@/hooks/users/auth/use-auth'
import { useLogout } from '@/hooks/users/auth/use-logout'
import { UserAvatar } from '@/components/common/avatars/user-avatar'

export function NavAccountMenu() {
  const { user, isAdmin } = useAuth()
  const logout = useLogout()
  const router = useRouter()
  if (!user) return null

  return (
    <Menu.Root positioning={{ placement: 'bottom-end' }}>
      <Menu.Trigger asChild>
        <Button variant="ghost" color="white" _hover={{ bg: 'whiteAlpha.200' }} aria-label={MESSAGES.NAV.OPEN_MENU} px="2">
          <UserAvatar user={user} size="xs" />
          <Text display={{ base: 'none', md: 'block' }}>{user.userName}</Text>
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.Item value="profile" onSelect={() => router.push(PAGE_ROUTES.PROFILE)}>
              <LuUser /> {MESSAGES.NAV.PROFILE}
            </Menu.Item>
            {isAdmin && (
              <Menu.Item value="admin" onSelect={() => router.push(PAGE_ROUTES.ADMIN_REQUESTS)}>
                <LuShieldCheck /> {MESSAGES.NAV.ADMIN}
              </Menu.Item>
            )}
            <Menu.Separator />
            <Menu.Item value="logout" color="fg.error" onSelect={() => void logout()}>
              <LuLogOut /> {MESSAGES.NAV.LOGOUT}
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  )
}
