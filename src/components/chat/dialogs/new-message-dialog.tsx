'use client'

import { Stack } from '@chakra-ui/react'
import { CHAT_MESSAGES } from '@/constants/chat/chat-messages.constants'
import type { ChatDialogProps } from '@/interfaces/components/chat/dialogs/chat-dialog-props.interface'
import { useUserSearch } from '@/hooks/users/social/use-user-search'
import { useStartChat } from '@/hooks/chat/conversation/use-start-chat'
import { GenericButton } from '@/components/common/buttons/generic-button'
import { GenericModal } from '@/components/common/dialogs/generic-modal'
import { SearchInput } from '@/components/common/inputs/search-input'
import { SkeletonList } from '@/components/common/feedback/skeleton-list'
import { UserRow } from '@/components/users/social/user-row'

/** Find someone and open the chat with them. */
export function NewMessageDialog({ isOpen, onClose }: ChatDialogProps) {
  const { search, setSearch, results } = useUserSearch()
  const startChat = useStartChat()
  return (
    <GenericModal isOpen={isOpen} onClose={onClose} title={CHAT_MESSAGES.NEW_MESSAGE} size="sm">
      <Stack gap="3">
        <SearchInput value={search} onChange={setSearch} placeholder={CHAT_MESSAGES.PEOPLE_PLACEHOLDER} />
        {results.isLoading && <SkeletonList rows={4} />}
        <Stack gap="1" maxH="96" overflowY="auto">
          {results.items
            .filter((person) => !person.isMe)
            .map((person) => (
              <UserRow
                key={person.id}
                user={person}
                action={
                  <GenericButton size="xs" tone="gradient" onClick={async () => { await startChat(person.userName); onClose() }}>
                    {CHAT_MESSAGES.START}
                  </GenericButton>
                }
              />
            ))}
        </Stack>
      </Stack>
    </GenericModal>
  )
}
