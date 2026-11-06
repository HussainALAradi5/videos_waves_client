import { Button, HStack, Text } from '@chakra-ui/react'
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu'
import { MESSAGES } from '@/constants/common/messages.constants'
import type { PaginationControlsProps } from '@/interfaces/components/common/pagination/pagination-controls-props.interface'

export function PaginationControls({ meta, onPageChange }: PaginationControlsProps) {
  const isFirst = meta.page <= 1
  const isLast = meta.page >= meta.totalPages

  return (
    <HStack justify="space-between" mt="4" as="nav" aria-label="Pagination">
      <Button size="sm" variant="outline" disabled={isFirst} onClick={() => onPageChange(meta.page - 1)}>
        <LuChevronLeft /> {MESSAGES.COMMON.PREVIOUS}
      </Button>
      <Text fontSize="sm" color="fg.muted" aria-live="polite">
        {MESSAGES.COMMON.PAGE_OF(meta.page, meta.totalPages)}
      </Text>
      <Button size="sm" variant="outline" disabled={isLast} onClick={() => onPageChange(meta.page + 1)}>
        {MESSAGES.COMMON.NEXT} <LuChevronRight />
      </Button>
    </HStack>
  )
}
