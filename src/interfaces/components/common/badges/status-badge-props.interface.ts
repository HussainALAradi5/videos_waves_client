import type { StatusOption } from '@/interfaces/common/badges/status-option.interface'

export interface StatusBadgeProps<TValue extends string> {
  value: TValue
  options: Record<TValue, StatusOption>
}
