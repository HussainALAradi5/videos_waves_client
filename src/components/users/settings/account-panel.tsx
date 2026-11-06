'use client'

import { HStack, Stack } from '@chakra-ui/react'
import { LuKeyRound, LuUserX } from 'react-icons/lu'
import { MESSAGES } from '@/constants/common/messages.constants'
import { CHANGE_PASSWORD_FIELDS, PROFILE_FIELDS } from '@/constants/users/user/profile-form-fields.constants'
import { SETTINGS_MESSAGES } from '@/constants/users/settings/settings-messages.constants'
import { ProfileDialog } from '@/enums/users/user/profile-dialog.enum'
import type { AvatarEditorProps } from '@/interfaces/components/users/settings/avatar-editor-props.interface'
import { profileFormSchema, type ProfileFormValues } from '@/validations/users/user/profile-form.validation'
import { changePasswordFormSchema } from '@/validations/users/user/change-password-form.validation'
import { useProfileDialogs } from '@/hooks/users/user/use-profile-dialogs'
import { GenericButton } from '@/components/common/buttons/generic-button'
import { GenericForm } from '@/components/common/forms/generic-form'
import { FormDialog } from '@/components/common/dialogs/form-dialog'
import { ConfirmDialog } from '@/components/common/dialogs/confirm-dialog'
import { AdminRequestPanel } from '@/components/users/admin-request/admin-request-panel'
import { AvatarEditor } from './avatar-editor'
import { SettingsCard } from './settings-card'

const EMPTY_PASSWORDS = { currentPassword: '', newPassword: '', confirmPassword: '' }

/** Photo, profile details, password, admin access, and deactivation. */
export function AccountPanel({ user }: AvatarEditorProps) {
  const dialogs = useProfileDialogs()
  const profileDefaults = { userName: user.userName, email: user.email, phone: user.phone ?? '', bio: user.bio, gender: user.gender ?? undefined } as ProfileFormValues
  return (
    <Stack gap="6">
      <SettingsCard title={SETTINGS_MESSAGES.PHOTO_TITLE} description={SETTINGS_MESSAGES.PHOTO_DESCRIPTION}>
        <AvatarEditor user={user} />
      </SettingsCard>
      <SettingsCard title={MESSAGES.PROFILE.EDIT_PROFILE}>
        <Stack py="3">
          <GenericForm schema={profileFormSchema} fields={PROFILE_FIELDS} defaultValues={profileDefaults} submitLabel={MESSAGES.COMMON.SAVE} onSubmit={dialogs.updateProfile.mutateAsync} />
        </Stack>
      </SettingsCard>
      <AdminRequestPanel />
      <HStack gap="2" wrap="wrap">
        <GenericButton tone="outline" size="sm" leftIcon={<LuKeyRound />} onClick={dialogs.open(ProfileDialog.PASSWORD)}>
          {MESSAGES.PROFILE.CHANGE_PASSWORD}
        </GenericButton>
        <GenericButton tone="dangerGhost" size="sm" leftIcon={<LuUserX />} onClick={dialogs.open(ProfileDialog.DEACTIVATE)}>
          {MESSAGES.PROFILE.DEACTIVATE}
        </GenericButton>
      </HStack>
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
        onConfirm={() => dialogs.deactivate.mutateAsync()}
        isLoading={dialogs.deactivate.isPending}
      />
    </Stack>
  )
}
