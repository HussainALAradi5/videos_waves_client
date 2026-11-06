'use client'

import { Alert, Button, FileUpload, Stack, Text } from '@chakra-ui/react'
import { LuDownload, LuFileUp } from 'react-icons/lu'
import { ADMIN_USERS_MESSAGES } from '@/constants/users/admin-users/admin-users.constants'
import type { ImportUsersDialogProps } from '@/interfaces/components/users/admin-users/import-users-dialog-props.interface'
import { GenericButton } from '@/components/common/buttons/generic-button'
import { GenericModal } from '@/components/common/dialogs/generic-modal'

/** Pick a CSV, see how many rows are valid, import, then download the one-time passwords. */
export function ImportUsersDialog({ isOpen, onClose, transfer }: ImportUsersDialogProps) {
  const { parsed, result, isTooLarge } = transfer
  const close = () => {
    transfer.reset()
    onClose()
  }
  const footer = result ? (
    <GenericButton tone="secondary" onClick={close}>{ADMIN_USERS_MESSAGES.CLOSE}</GenericButton>
  ) : (
    <GenericButton
      tone="gradient"
      onClick={transfer.submit}
      isLoading={transfer.isImporting}
      disabled={!parsed || parsed.rows.length === 0 || isTooLarge}
    >
      {ADMIN_USERS_MESSAGES.IMPORT_SUBMIT}
    </GenericButton>
  )
  return (
    <GenericModal isOpen={isOpen} onClose={close} title={ADMIN_USERS_MESSAGES.IMPORT_TITLE} description={ADMIN_USERS_MESSAGES.IMPORT_HELP} footer={footer}>
      <Stack gap="4">
        {!result && (
          <>
            <Button variant="plain" size="sm" alignSelf="start" px="0" onClick={transfer.downloadTemplate}>
              <LuDownload /> {ADMIN_USERS_MESSAGES.IMPORT_TEMPLATE}
            </Button>
            <FileUpload.Root accept={['.csv', 'text/csv']} maxFiles={1} onFileAccept={(details) => details.files[0] && void transfer.readFile(details.files[0])}>
              <FileUpload.HiddenInput />
              <FileUpload.Trigger asChild>
                <Button variant="outline" width="full">
                  <LuFileUp /> {ADMIN_USERS_MESSAGES.IMPORT_PICK}
                </Button>
              </FileUpload.Trigger>
              <FileUpload.ItemGroup />
            </FileUpload.Root>
          </>
        )}
        {parsed && <Text fontWeight="medium">{ADMIN_USERS_MESSAGES.IMPORT_READY(parsed.rows.length)}</Text>}
        {parsed && parsed.invalidLines.length > 0 && (
          <Alert.Root status="warning"><Alert.Indicator /><Alert.Title>{ADMIN_USERS_MESSAGES.IMPORT_INVALID(parsed.invalidLines)}</Alert.Title></Alert.Root>
        )}
        {isTooLarge && (
          <Alert.Root status="error"><Alert.Indicator /><Alert.Title>{ADMIN_USERS_MESSAGES.IMPORT_TOO_MANY}</Alert.Title></Alert.Root>
        )}
        {result && (
          <Stack gap="3">
            <Text fontWeight="medium">{ADMIN_USERS_MESSAGES.IMPORT_DONE(result.created.length, result.skipped.length)}</Text>
            {result.skipped.map((row) => (
              <Text key={`${row.userName}-${row.email}`} fontSize="sm" color="fg.muted">{`${row.userName} (${row.email}): ${row.reason}`}</Text>
            ))}
            {result.created.length > 0 && (
              <Alert.Root status="info">
                <Alert.Indicator />
                <Alert.Content>
                  <Alert.Title>{ADMIN_USERS_MESSAGES.IMPORT_PASSWORDS}</Alert.Title>
                  <Button mt="2" size="sm" onClick={transfer.downloadCredentials}><LuDownload /> {ADMIN_USERS_MESSAGES.IMPORT_DOWNLOAD}</Button>
                </Alert.Content>
              </Alert.Root>
            )}
          </Stack>
        )}
      </Stack>
    </GenericModal>
  )
}
