'use client'

import { Button, HStack } from '@chakra-ui/react'
import { LuCheck, LuX } from 'react-icons/lu'
import { MESSAGES } from '@/constants/common/messages.constants'
import { PALETTES } from '@/constants/common/theme.constants'
import { AdminRequestStatus } from '@/enums/users/admin-request/admin-request-status.enum'
import { useAdminRequestActions } from '@/hooks/users/admin-request/use-admin-request-actions'
import type { AdminRequestRowProps } from '@/interfaces/components/users/admin-request/admin-request-row-props.interface'

export function AdminRequestDecision({ request }: AdminRequestRowProps) {
  const { decide } = useAdminRequestActions()
  const isBusy = decide.isPending

  return (
    <HStack gap="2" justify="flex-end">
      <Button
        size="xs"
        colorPalette={PALETTES.SUCCESS}
        loading={isBusy}
        onClick={() => decide.mutate({ requestId: request.id, dto: { status: AdminRequestStatus.ACCEPTED } })}
      >
        <LuCheck /> {MESSAGES.ADMIN_REQUESTS.ACCEPT}
      </Button>
      <Button
        size="xs"
        variant="outline"
        colorPalette={PALETTES.DANGER}
        disabled={isBusy}
        onClick={() => decide.mutate({ requestId: request.id, dto: { status: AdminRequestStatus.REJECTED } })}
      >
        <LuX /> {MESSAGES.ADMIN_REQUESTS.REJECT}
      </Button>
    </HStack>
  )
}
