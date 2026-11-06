'use client'

import NextLink from 'next/link'
import { HStack, Stack } from '@chakra-ui/react'
import { LuLogOut, LuShieldCheck, LuUsers } from 'react-icons/lu'
import { MESSAGES } from '@/constants/common/messages.constants'
import { PAGE_ROUTES } from '@/constants/common/routes.constants'
import { useAuth } from '@/hooks/users/auth/use-auth'
import { useLogout } from '@/hooks/users/auth/use-logout'
import { GenericButton } from '@/components/common/buttons/generic-button'
import { GenericIconButton } from '@/components/common/buttons/generic-icon-button'
import { ColorModeButton } from '@/components/ui/color-mode-button'
import type { ShellAccountProps } from '@/interfaces/components/layout/shell/shell-account-props.interface'

/** Theme toggle plus Sign in and Sign up for guests, or admin and sign out for members. */
export function ShellAccount({ isInline = false }: ShellAccountProps) {
  const { isAuthenticated, isAdmin } = useAuth()
  const logout = useLogout()
  const Container = isInline ? HStack : Stack

  return (
    <Container gap="2" align={isInline ? 'center' : { base: 'center', xl: 'stretch' }}>
      <ColorModeButton />
      {isAdmin && (
        <>
          <GenericIconButton label={MESSAGES.NAV.ADMIN_USERS} asChild>
            <NextLink href={PAGE_ROUTES.ADMIN_USERS}>
              <LuUsers />
            </NextLink>
          </GenericIconButton>
          <GenericIconButton label={MESSAGES.NAV.ADMIN} asChild>
            <NextLink href={PAGE_ROUTES.ADMIN_REQUESTS}>
              <LuShieldCheck />
            </NextLink>
          </GenericIconButton>
        </>
      )}
      {isAuthenticated ? (
        <GenericIconButton label={MESSAGES.NAV.LOGOUT} onClick={logout}>
          <LuLogOut />
        </GenericIconButton>
      ) : (
        <>
          <GenericButton asChild tone="gradient" size="sm">
            <NextLink href={PAGE_ROUTES.LOGIN}>{MESSAGES.NAV.LOGIN}</NextLink>
          </GenericButton>
          <GenericButton asChild tone="secondary" size="sm">
            <NextLink href={PAGE_ROUTES.REGISTER}>{MESSAGES.NAV.SIGN_UP}</NextLink>
          </GenericButton>
        </>
      )}
    </Container>
  )
}
