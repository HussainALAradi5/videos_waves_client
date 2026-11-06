'use client'

import { HStack, Stack } from '@chakra-ui/react'
import { LuDownload, LuUpload } from 'react-icons/lu'
import { ADMIN_USERS_MESSAGES, ROLE_FILTER_OPTIONS, STATUS_FILTER_OPTIONS } from '@/constants/users/admin-users/admin-users.constants'
import type { AdminUsersToolbarProps } from '@/interfaces/components/users/admin-users/admin-users-toolbar-props.interface'
import { GenericButton } from '@/components/common/buttons/generic-button'
import { SearchInput } from '@/components/common/inputs/search-input'
import { SelectDropdown } from '@/components/common/dropdown/select-dropdown'

/** Search, role and status filters, and the export and import actions. */
export function AdminUsersToolbar(props: AdminUsersToolbarProps) {
  return (
    <Stack direction={{ base: 'column', lg: 'row' }} gap="3" justify="space-between" mb="4">
      <Stack direction={{ base: 'column', sm: 'row' }} gap="3" flex="1">
        <SearchInput value={props.search} onChange={props.onSearchChange} placeholder={ADMIN_USERS_MESSAGES.SEARCH} />
        <SelectDropdown options={ROLE_FILTER_OPTIONS} value={props.role} onChange={props.onRoleChange} width="44" />
        <SelectDropdown options={STATUS_FILTER_OPTIONS} value={props.status} onChange={props.onStatusChange} width="44" />
      </Stack>
      <HStack gap="2" flexShrink={0}>
        <GenericButton tone="secondary" size="sm" leftIcon={<LuDownload />} onClick={props.onExport}>
          {ADMIN_USERS_MESSAGES.EXPORT}
        </GenericButton>
        <GenericButton tone="gradient" size="sm" leftIcon={<LuUpload />} onClick={props.onImport}>
          {ADMIN_USERS_MESSAGES.IMPORT}
        </GenericButton>
      </HStack>
    </Stack>
  )
}
