'use client'

import { useState } from 'react'
import { LuUserCheck, LuUserX } from 'react-icons/lu'
import { ADMIN_USERS_MESSAGES } from '@/constants/users/admin-users/admin-users.constants'
import { Role } from '@/enums/users/roles/role.enum'
import type { AccountStatusButtonProps } from '@/interfaces/components/users/admin-users/account-status-button-props.interface'
import { useAccountStatus } from '@/hooks/users/admin-users/use-account-status'
import { GenericButton } from '@/components/common/buttons/generic-button'
import { ConfirmDialog } from '@/components/common/dialogs/confirm-dialog'

/** Activate straight away; deactivate after a confirmation. Hidden for admins, who cannot be deactivated. */
export function AccountStatusButton({ userName, role, isActive }: AccountStatusButtonProps) {
  const { setActive, isPending } = useAccountStatus()
  const [isConfirming, setIsConfirming] = useState(false)
  if (role === Role.ADMIN) return null
  if (!isActive) {
    return (
      <GenericButton size="xs" tone="secondary" leftIcon={<LuUserCheck />} onClick={() => setActive(userName, true)}>
        {ADMIN_USERS_MESSAGES.ACTIVATE}
      </GenericButton>
    )
  }
  return (
    <>
      <GenericButton size="xs" tone="danger" leftIcon={<LuUserX />} onClick={() => setIsConfirming(true)}>
        {ADMIN_USERS_MESSAGES.DEACTIVATE}
      </GenericButton>
      <ConfirmDialog
        isOpen={isConfirming}
        onClose={() => setIsConfirming(false)}
        onConfirm={async () => {
          await setActive(userName, false)
          setIsConfirming(false)
        }}
        isLoading={isPending}
        title={ADMIN_USERS_MESSAGES.CONFIRM_TITLE(userName)}
        description={ADMIN_USERS_MESSAGES.CONFIRM_BODY}
        confirmLabel={ADMIN_USERS_MESSAGES.DEACTIVATE}
      />
    </>
  )
}
