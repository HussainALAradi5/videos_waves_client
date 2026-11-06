import NextLink from 'next/link'
import { Button, HStack } from '@chakra-ui/react'
import { LuLogIn, LuUserPlus } from 'react-icons/lu'
import { MESSAGES } from '@/constants/common/messages.constants'
import { PAGE_ROUTES } from '@/constants/common/routes.constants'

export function NavGuestActions() {
  return (
    <HStack gap="2">
      <Button asChild variant="ghost" color="white" _hover={{ bg: 'whiteAlpha.200' }} size="sm">
        <NextLink href={PAGE_ROUTES.LOGIN}>
          <LuLogIn /> {MESSAGES.NAV.LOGIN}
        </NextLink>
      </Button>
      <Button asChild bg="white" color="cyan.700" _hover={{ bg: 'cyan.50' }} size="sm" display={{ base: 'none', sm: 'flex' }}>
        <NextLink href={PAGE_ROUTES.REGISTER}>
          <LuUserPlus /> {MESSAGES.NAV.REGISTER}
        </NextLink>
      </Button>
    </HStack>
  )
}
