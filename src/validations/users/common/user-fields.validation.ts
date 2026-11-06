import { z } from 'zod'

// Mirrors the server user validation rules for instant feedback; the server stays authoritative.
export const userNameRule = z
  .string()
  .trim()
  .regex(/^[a-zA-Z0-9_.]{3,30}$/, 'Use 3-30 letters, numbers, dots, or underscores.')

export const emailRule = z.email('Enter a valid email address.').trim()

export const passwordRule = z
  .string()
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,72}$/, 'Use 8+ characters with upper and lower case letters and a number.')

export const requiredText = (label: string) => z.string().trim().min(1, `${label} is required.`)
