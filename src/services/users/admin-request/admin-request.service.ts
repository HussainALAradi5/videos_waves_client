import { ADMIN_REQUEST_ENDPOINTS } from '@/config/api/endpoints/admin-requests.endpoints'
import type { AdminRequestQueryDto } from '@/dtos/users/admin-request/admin-request-query.dto'
import type { CreateAdminRequestDto } from '@/dtos/users/admin-request/create-admin-request.dto'
import type { DecideAdminRequestDto } from '@/dtos/users/admin-request/decide-admin-request.dto'
import type { AdminRequest } from '@/interfaces/users/admin-request/admin-request.interface'
import { deleteData, getPage, patchData, postData } from '../../api/api-request'

export const adminRequestService = {
  list: (query: AdminRequestQueryDto, signal?: AbortSignal) =>
    getPage<AdminRequest>(ADMIN_REQUEST_ENDPOINTS.ROOT, query, signal),
  create: (dto: CreateAdminRequestDto) => postData<AdminRequest>(ADMIN_REQUEST_ENDPOINTS.ROOT, dto),
  decide: (requestId: string, dto: DecideAdminRequestDto) =>
    patchData<AdminRequest>(ADMIN_REQUEST_ENDPOINTS.decision(requestId), dto),
  cancel: (requestId: string) => deleteData<AdminRequest>(ADMIN_REQUEST_ENDPOINTS.byId(requestId))
}
