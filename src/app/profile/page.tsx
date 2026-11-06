import { redirect } from 'next/navigation'
import { PAGE_ROUTES } from '@/constants/common/routes.constants'

/** The old /profile address: account management now lives in Settings, profiles under /u/<name>. */
export default function LegacyProfilePage() {
  redirect(PAGE_ROUTES.SETTINGS)
}
