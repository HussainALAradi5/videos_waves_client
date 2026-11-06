import type { PageRequestDto } from '@/dtos/common/pagination/page-request.dto'

export type RelationQueryDto = Pick<PageRequestDto, 'page' | 'pageSize'>
