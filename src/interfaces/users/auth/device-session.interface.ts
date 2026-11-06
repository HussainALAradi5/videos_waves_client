import type { BaseEntity } from '@/interfaces/common/base/base-entity.interface'

/** One signed-in device. */
export interface DeviceSession extends BaseEntity {
  userAgent: string
  lastUsedAt: string
  isCurrent: boolean
}
