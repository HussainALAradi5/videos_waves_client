'use client'

import { useSyncExternalStore } from 'react'
import type { ToastItem } from '@/interfaces/common/toast/toast-item.interface'
import { toastStore } from '@/services/toast/toast-store.service'

/** Every queued toast, oldest first. */
export const useToasts = (): ToastItem[] => useSyncExternalStore(toastStore.subscribe, toastStore.getSnapshot, toastStore.getServerSnapshot)
