import { USER_ENDPOINTS } from '@/config/api/endpoints/users.endpoints'
import type { AdminUsersQueryDto } from '@/dtos/users/admin-users/admin-users-query.dto'
import type { ImportUserRow, ImportUsersResult } from '@/dtos/users/admin-users/import-users.dto'
import type { User } from '@/interfaces/users/user/user.interface'
import { apiClient } from '@/services/api/api-client'
import { getPage, patchData, postData } from '@/services/api/api-request'

/** Admin-only account management: list, activate or deactivate, CSV export, and import. */
export const adminUsersService = {
  list: (query: AdminUsersQueryDto, signal?: AbortSignal) => getPage<User>(USER_ENDPOINTS.ROOT, query, signal),
  setActive: (userName: string, isActive: boolean) => patchData<User>(USER_ENDPOINTS.status(userName), { isActive }),
  exportCsv: async (query: Omit<AdminUsersQueryDto, 'page' | 'pageSize'>): Promise<Blob> =>
    (await apiClient.get<Blob>(USER_ENDPOINTS.EXPORT, { params: query, responseType: 'blob' })).data,
  importRows: (rows: ImportUserRow[]) => postData<ImportUsersResult>(USER_ENDPOINTS.IMPORT, { rows })
}
