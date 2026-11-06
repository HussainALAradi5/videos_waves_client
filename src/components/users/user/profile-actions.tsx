'use client'

import { Button, Stack } from '@chakra-ui/react'
import { LuKeyRound, LuPencil, LuUserX } from 'react-icons/lu'
import { MESSAGES } from '@/constants/common/messages.constants'
import { PALETTES } from '@/constants/common/theme.constants'
import { CHANGE_PASSWORD_FIELDS, PROFILE_FIELDS } from '@/constants/users/user/profile-form-fields.constants'
import { ProfileDialog } from '@/enums/users/user/profile-dialog.enum'
import { profileFormSchema } from '@/validations/users/user/profile-form.validation'
import { changePasswordFormSchema } from '@/validations/users/user/change-password-form.validation'
import { useProfileDialogs } from '@/hooks/users/user/use-profile-dialogs'
import type { ProfileSectionProps } from '@/interfaces/components/users/user/profile-section-props.interface'
import { FormDialog } from '@/components/common/dialogs/form-dialog'
import { ConfirmDialog } from '@/components/common/dialogs/confirm-dialog'

const EMPTY_PASSWORDS = { currentPassword: '', newPassword: '', confirmPassword: '' }

export function ProfileActions({ user }: ProfileSectionProps) {
  const dialogs = useProfileDialogs()

  return (
    <Stack direction={{ base: 'column', sm: 'row' }} gap="2">
      <Button size="sm" variant="outline" onClick={dialogs.open(ProfileDialog.EDIT)}>
        <LuPencil /> {MESSAGES.PROFILE.EDIT_PROFILE}
      </Button>
      <Button size="sm" variant="outline" onClick={dialogs.open(ProfileDialog.PASSWORD)}>
        <LuKeyRound /> {MESSAGES.PROFILE.CHANGE_PASSWORD}
      </Button>
      <Button size="sm" variant="ghost" colorPalette={PALETTES.DANGER} onClick={dialogs.open(ProfileDialog.DEACTIVATE)}>
        <LuUserX /> {MESSAGES.PROFILE.DEACTIVATE}
      </Button>
      <FormDialog
        isOpen={dialogs.isOpen(ProfileDialog.EDIT)}
        onClose={dialogs.close}
        title={MESSAGES.PROFILE.EDIT_PROFILE}
        schema={profileFormSchema}
        fields={PROFILE_FIELDS}
        defaultValues={{ userName: user.userName, email: user.email, image: user.image ?? '' }}
        submitLabel={MESSAGES.COMMON.SAVE}
        onSubmit={dialogs.updateProfile.mutateAsync}
        isSubmitting={dialogs.updateProfile.isPending}
      />
      <FormDialog
        isOpen={dialogs.isOpen(ProfileDialog.PASSWORD)}
        onClose={dialogs.close}
        title={MESSAGES.PROFILE.CHANGE_PASSWORD}
        schema={changePasswordFormSchema}
        fields={CHANGE_PASSWORD_FIELDS}
        defaultValues={EMPTY_PASSWORDS}
        submitLabel={MESSAGES.PROFILE.CHANGE_PASSWORD}
        onSubmit={dialogs.changePassword.mutateAsync}
        isSubmitting={dialogs.changePassword.isPending}
      />
      <ConfirmDialog
        isOpen={dialogs.isOpen(ProfileDialog.DEACTIVATE)}
        onClose={dialogs.close}
        title={MESSAGES.PROFILE.DEACTIVATE_TITLE}
        description={MESSAGES.PROFILE.DEACTIVATE_DESCRIPTION}
        confirmLabel={MESSAGES.PROFILE.DEACTIVATE}
        onConfirm={() => dialogs.deactivate.mutate()}
        isLoading={dialogs.deactivate.isPending}
      />
    </Stack>
  )
}
