import { TOAST_DURATION_MS } from '@/constants/common/limits.constants'
import { TOAST_MAX_QUEUED } from '@/constants/common/toast.constants'
import type { ToastType } from '@/enums/common/toast-type.enum'
import type { ToastItem } from '@/interfaces/common/toast/toast-item.interface'
import type { ToastOptions } from '@/interfaces/common/toast/toast-options.interface'

type Listener = () => void

const EMPTY: ToastItem[] = []
let items: ToastItem[] = EMPTY
let nextId = 1
const listeners = new Set<Listener>()
const emit = () => listeners.forEach((listener) => listener())

/** The app's toast queue: a tiny external store read through useSyncExternalStore. */
export const toastStore = {
  subscribe: (listener: Listener) => {
    listeners.add(listener)
    return () => {
      listeners.delete(listener)
    }
  },
  getSnapshot: () => items,
  getServerSnapshot: () => EMPTY,
  show: (type: ToastType, title: string, options: ToastOptions = {}): number => {
    const id = nextId++
    const item: ToastItem = { id, type, title, description: options.description, durationMs: options.durationMs ?? TOAST_DURATION_MS, action: options.action, isPausable: options.isPausable ?? true }
    items = [...items, item].slice(-TOAST_MAX_QUEUED)
    emit()
    return id
  },
  dismiss: (id: number) => {
    items = items.filter((item) => item.id !== id)
    emit()
  }
}
