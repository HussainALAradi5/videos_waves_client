import type { RelationKind } from '@/hooks/users/social/use-relation-list'

export interface RelationListPanelProps {
  kind: RelationKind
  title: string
  actionLabel: string
}
