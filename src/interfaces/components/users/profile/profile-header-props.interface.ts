import type { Profile } from '@/interfaces/users/profile/profile.interface'

export interface ProfileHeaderProps {
  profile: Profile
  onOpenPeople: (list: 'followers' | 'following') => void
}
