import { Flex, Heading, Stack, Text } from '@chakra-ui/react'
import type { PageHeaderProps } from '@/interfaces/components/common/layout/page-header-props.interface'

export function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <Flex mb="8" gap="4" direction={{ base: 'column', md: 'row' }} justify="space-between" align={{ md: 'flex-end' }}>
      <Stack gap="1">
        <Heading as="h1" size={{ base: '2xl', md: '3xl' }}>
          {title}
        </Heading>
        {description && <Text color="fg.muted">{description}</Text>}
      </Stack>
      {actions}
    </Flex>
  )
}
