import NextLink from 'next/link'
import { Button } from '@chakra-ui/react'
import { MESSAGES } from '@/constants/common/messages.constants'
import { PAGE_ROUTES } from '@/constants/common/routes.constants'
import { EmptyState } from '@/components/common/feedback/empty-state'

export default function NotFound() {
  return (
    <EmptyState
      title={MESSAGES.COMMON.NOT_FOUND_TITLE}
      description={MESSAGES.COMMON.NOT_FOUND_DESCRIPTION}
      action={
        <Button asChild variant="outline">
          <NextLink href={PAGE_ROUTES.HOME}>{MESSAGES.COMMON.BACK_HOME}</NextLink>
        </Button>
      }
    />
  )
}
