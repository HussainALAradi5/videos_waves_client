import axios from 'axios'
import { apiConfig } from '@/config/api/api.config'
import { installAuthInterceptor } from '@/middlewares/auth/auth.interceptor'
import { installErrorInterceptor } from '@/middlewares/errors/error.interceptor'

/** The one configured HTTP client every service uses. */
export const apiClient = axios.create({ baseURL: apiConfig.baseURL, timeout: apiConfig.timeoutMs })

// Order matters: the auth interceptor must see the raw 401 before errors are mapped.
installAuthInterceptor(apiClient)
installErrorInterceptor(apiClient)
