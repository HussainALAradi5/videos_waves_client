import { HStack, Icon, Text } from '@chakra-ui/react'
import { LuWaves } from 'react-icons/lu'
import { appConfig } from '@/config/app/app.config'
import { PAGE_ROUTES } from '@/constants/common/routes.constants'
import { AppLink } from '@/components/common/navigation/app-link'

export function BrandLogo() {
  return (
    <AppLink href={PAGE_ROUTES.HOME} _hover={{ textDecoration: 'none' }} color="white">
      <HStack gap="2">
        <Icon size="lg">
          <LuWaves />
        </Icon>
        <Text fontWeight="bold" fontSize="lg" display={{ base: 'none', sm: 'block' }}>
          {appConfig.name}
        </Text>
      </HStack>
    </AppLink>
  )
}
