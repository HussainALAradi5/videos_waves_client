import { Card, HStack, Text } from '@chakra-ui/react'
import { LAYOUT } from '@/constants/common/theme.constants'
import type { AuthCardProps } from '@/interfaces/components/users/auth/auth-card-props.interface'
import { AppLink } from '@/components/common/navigation/app-link'

export function AuthCard({ title, description, children, footerText, footerLinkLabel, footerHref }: AuthCardProps) {
  return (
    <Card.Root maxW={LAYOUT.FORM_MAX_WIDTH} mx="auto" w="full" shadow="md">
      <Card.Header>
        <Card.Title fontSize="2xl">{title}</Card.Title>
        <Card.Description>{description}</Card.Description>
      </Card.Header>
      <Card.Body>{children}</Card.Body>
      <Card.Footer justifyContent="center">
        <HStack gap="1" fontSize="sm">
          <Text color="fg.muted">{footerText}</Text>
          <AppLink href={footerHref} color="cyan.fg" fontWeight="medium">
            {footerLinkLabel}
          </AppLink>
        </HStack>
      </Card.Footer>
    </Card.Root>
  )
}
