'use client'

import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  ADMIN_USERS_MESSAGES,
  EXPORT_FILE,
  IMPORT_MAX_ROWS,
  IMPORT_RESULT_FILE,
  IMPORT_TEMPLATE,
  IMPORT_TEMPLATE_FILE
} from '@/constants/users/admin-users/admin-users.constants'
import { QUERY_KEYS } from '@/constants/common/query-keys.constants'
import type { AdminUsersQueryDto } from '@/dtos/users/admin-users/admin-users-query.dto'
import type { ImportUsersResult } from '@/dtos/users/admin-users/import-users.dto'
import { adminUsersService } from '@/services/users/admin-users/admin-users.service'
import { toCsv } from '@/utilities/files/csv.utility'
import { downloadBlob, downloadText } from '@/utilities/files/download.utility'
import { type ParsedImport, parseImportFile } from '@/utilities/users/import-rows.utility'
import { notifyError, notifySuccess } from '@/utilities/toast/notify.utility'

/** CSV export of the current filters, and the import flow: pick, preview, send, download passwords. */
export const useUserTransfer = (filters: Omit<AdminUsersQueryDto, 'page' | 'pageSize'>) => {
  const queryClient = useQueryClient()
  const [parsed, setParsed] = useState<ParsedImport | null>(null)
  const [result, setResult] = useState<ImportUsersResult | null>(null)

  const exportCsv = async () => {
    try {
      downloadBlob(await adminUsersService.exportCsv(filters), EXPORT_FILE)
    } catch (error) {
      notifyError(error)
    }
  }

  const importMutation = useMutation({
    mutationFn: adminUsersService.importRows,
    onSuccess: async (response) => {
      setResult(response)
      setParsed(null)
      notifySuccess(ADMIN_USERS_MESSAGES.IMPORT_DONE(response.created.length, response.skipped.length))
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.adminUsersAll })
    },
    onError: notifyError
  })

  return {
    exportCsv,
    parsed,
    result,
    isTooLarge: (parsed?.rows.length ?? 0) > IMPORT_MAX_ROWS,
    isImporting: importMutation.isPending,
    readFile: async (file: File) => {
      setResult(null)
      setParsed(parseImportFile(await file.text()))
    },
    submit: () => (parsed ? importMutation.mutateAsync(parsed.rows) : undefined),
    downloadTemplate: () => downloadText(IMPORT_TEMPLATE, IMPORT_TEMPLATE_FILE),
    downloadCredentials: () =>
      result &&
      downloadText(
        toCsv(['userName', 'email', 'role', 'temporaryPassword'], result.created.map((row) => [row.userName, row.email, row.role, row.temporaryPassword])),
        IMPORT_RESULT_FILE
      ),
    reset: () => {
      setParsed(null)
      setResult(null)
    }
  }
}
