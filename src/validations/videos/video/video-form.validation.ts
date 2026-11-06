import { z } from 'zod'
import { TEXT_LIMITS } from '@/constants/common/limits.constants'
import { requiredText } from '@/validations/users/common/user-fields.validation'

export const videoFormSchema = z.object({
  title: requiredText('Title').max(TEXT_LIMITS.VIDEO_TITLE_MAX),
  description: z.string().trim().max(TEXT_LIMITS.VIDEO_DESCRIPTION_MAX)
})

export type VideoFormValues = z.infer<typeof videoFormSchema>
