import type { AxiosRequestConfig } from 'axios'
import type { ApiSuccessBody } from '@/interfaces/common/api/api-success-body.interface'
import type { Page } from '@/interfaces/common/pagination/page.interface'
import { apiClient } from './api-client'

// Unwraps the server envelope `{ success, data, meta }` in one place.

export const getData = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
  (await apiClient.get<ApiSuccessBody<T>>(url, config)).data.data

export const getPage = async <T>(url: string, params: object, signal?: AbortSignal): Promise<Page<T>> => {
  const body = (await apiClient.get<ApiSuccessBody<T[]>>(url, { params, signal })).data
  return { items: body.data, meta: body.meta ?? { page: 1, pageSize: body.data.length, totalItems: body.data.length, totalPages: 1 } }
}

export const postData = async <T>(url: string, body?: unknown, config?: AxiosRequestConfig): Promise<T> =>
  (await apiClient.post<ApiSuccessBody<T>>(url, body, config)).data.data

export const putData = async <T>(url: string, body?: unknown): Promise<T> =>
  (await apiClient.put<ApiSuccessBody<T>>(url, body)).data.data

export const patchData = async <T>(url: string, body: unknown): Promise<T> =>
  (await apiClient.patch<ApiSuccessBody<T>>(url, body)).data.data

export const deleteData = async <T>(url: string): Promise<T> => (await apiClient.delete<ApiSuccessBody<T>>(url)).data.data
