'use client'

import { Button, Card, HStack, Stack, Text } from '@chakra-ui/react'
import { MESSAGES } from '@/constants/common/messages.constants'
import { PALETTES } from '@/constants/common/theme.constants'
import { PAGE_ROUTES } from '@/constants/common/routes.constants'
import { ADMIN_REQUEST_FIELDS } from '@/constants/users/admin-request/admin-request-form-fields.constants'
import { ADMIN_REQUEST_STATUS_OPTIONS } from '@/constants/users/admin-request/admin-request-status.constants'
import { AdminRequestStatus } from '@/enums/users/admin-request/admin-request-status.enum'
import { adminRequestFormSchema } from '@/validations/users/admin-request/admin-request-form.validation'
import { useAuth } from '@/hooks/users/auth/use-auth'
import { useAdminRequests } from '@/hooks/users/admin-request/use-admin-requests'
import { useAdminRequestActions } from '@/hooks/users/admin-request/use-admin-request-actions'
import { StatusBadge } from '@/components/common/badges/status-badge'
import { GenericForm } from '@/components/common/forms/generic-form'
import { AppLink } from '@/components/common/navigation/app-link'
import { QueryState } from '@/components/common/feedback/query-state'

const LATEST_ONLY = 1

/** The signed-in user's own path to admin: request, see the latest status, or cancel. */
export function AdminRequestPanel() {
  const { isAdmin } = useAuth()
  const { requests, isLoading, error, refetch } = useAdminRequests(LATEST_ONLY)
  const { create, cancel } = useAdminRequestActions()
  const latest = requests[0]
  const isPending = latest?.status === AdminRequestStatus.PENDING

  return (
    <Card.Root>
      <Card.Header>
        <Card.Title>{MESSAGES.ADMIN_REQUESTS.PANEL_TITLE}</Card.Title>
        <Card.Description>{isAdmin ? MESSAGES.ADMIN_REQUESTS.IS_ADMIN : MESSAGES.ADMIN_REQUESTS.PANEL_DESCRIPTION}</Card.Description>
      </Card.Header>
      <Card.Body>
        {isAdmin ? (
          <AppLink href={PAGE_ROUTES.ADMIN_REQUESTS} color="cyan.fg" fontWeight="medium">
            {MESSAGES.ADMIN_REQUESTS.REVIEW_LINK}
          </AppLink>
        ) : (
          <QueryState isLoading={isLoading} error={error} onRetry={() => void refetch()}>
            <Stack gap="5">
              {latest && (
                <HStack justify="space-between" p="3" bg="bg.subtle" borderRadius="md">
                  <Stack gap="1">
                    <Text fontSize="sm" color="fg.muted">{MESSAGES.ADMIN_REQUESTS.LATEST}</Text>
                    <Text lineClamp={2}>{latest.reason}</Text>
                  </Stack>
                  <StatusBadge value={latest.status} options={ADMIN_REQUEST_STATUS_OPTIONS} />
                </HStack>
              )}
              {isPending ? (
                <Button alignSelf="flex-end" variant="outline" colorPalette={PALETTES.DANGER} loading={cancel.isPending} onClick={() => cancel.mutate(latest.id)}>
                  {MESSAGES.ADMIN_REQUESTS.CANCEL_REQUEST}
                </Button>
              ) : (
                <GenericForm
                  schema={adminRequestFormSchema}
                  fields={ADMIN_REQUEST_FIELDS}
                  defaultValues={{ reason: '' }}
                  submitLabel={MESSAGES.ADMIN_REQUESTS.SUBMIT}
                  onSubmit={create.mutateAsync}
                  isSubmitting={create.isPending}
                />
              )}
            </Stack>
          </QueryState>
        )}
      </Card.Body>
    </Card.Root>
  )
}
