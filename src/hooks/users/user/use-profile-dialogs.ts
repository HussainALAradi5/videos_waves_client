'use client'

import { useState } from 'react'
import type { ProfileDialog } from '@/enums/users/user/profile-dialog.enum'
import { useProfileActions } from './use-profile-actions'

/** At most one profile dialog is open at a time; each action closes it on success. */
export const useProfileDialogs = () => {
  const [openDialog, setOpenDialog] = useState<ProfileDialog | null>(null)
  const close = () => setOpenDialog(null)
  const actions = useProfileActions(close)

  return {
    isOpen: (dialog: ProfileDialog) => openDialog === dialog,
    open: (dialog: ProfileDialog) => () => setOpenDialog(dialog),
    close,
    ...actions
  }
}
