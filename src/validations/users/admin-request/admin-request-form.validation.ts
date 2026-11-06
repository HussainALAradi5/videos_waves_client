import { z } from 'zod'
import { TEXT_LIMITS } from '@/constants/common/limits.constants'

export const adminRequestFormSchema = z.object({
  reason: z
    .string()
    .trim()
    .min(TEXT_LIMITS.ADMIN_REASON_MIN, `Use at least ${TEXT_LIMITS.ADMIN_REASON_MIN} characters.`)
    .max(TEXT_LIMITS.ADMIN_REASON_MAX)
})

export type AdminRequestFormValues = z.infer<typeof adminRequestFormSchema>
