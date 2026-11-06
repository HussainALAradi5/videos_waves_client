import { afterEach, describe, expect, it } from 'vitest'
import { TOAST_MAX_QUEUED } from '@/constants/common/toast.constants'
import { ToastType } from '@/enums/common/toast-type.enum'
import { toastStore } from '@/services/toast/toast-store.service'

describe('toastStore', () => {
  afterEach(() => toastStore.getSnapshot().forEach((item) => toastStore.dismiss(item.id)))

  it('queues toasts in order, tells subscribers, and dismisses by id', () => {
    let changes = 0
    const unsubscribe = toastStore.subscribe(() => changes++)
    const first = toastStore.show(ToastType.SUCCESS, 'Saved')
    toastStore.show(ToastType.WARNING, 'Careful', { description: 'Check this', durationMs: 1000 })
    expect(toastStore.getSnapshot().map((item) => [item.type, item.title])).toEqual([
      [ToastType.SUCCESS, 'Saved'],
      [ToastType.WARNING, 'Careful']
    ])
    expect(toastStore.getSnapshot()[1]).toMatchObject({ description: 'Check this', durationMs: 1000 })
    toastStore.dismiss(first)
    expect(toastStore.getSnapshot().map((item) => item.title)).toEqual(['Careful'])
    expect(changes).toBe(3)
    unsubscribe()
  })

  it('drops the oldest when a burst overflows the queue', () => {
    for (let index = 0; index < TOAST_MAX_QUEUED + 3; index++) toastStore.show(ToastType.INFO, `t${index}`)
    const titles = toastStore.getSnapshot().map((item) => item.title)
    expect(titles).toHaveLength(TOAST_MAX_QUEUED)
    expect(titles[0]).toBe('t3')
  })
})
