import { z } from 'zod'
import { Gender } from '@/enums/users/user/gender.enum'

export const genderRule = z.enum(Gender, { error: 'Choose one.' })
