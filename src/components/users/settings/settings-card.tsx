import { Card, Separator } from '@chakra-ui/react'
import type { SettingsCardProps } from '@/interfaces/components/users/settings/settings-card-props.interface'
import { Animated } from '@/components/common/motion/animated'

/** A titled panel on the settings page. */
export function SettingsCard({ title, description, children }: SettingsCardProps) {
  return (
    <Animated>
      <Card.Root rounded="2xl" bg="app.surface" borderColor="app.border" shadow="card">
        <Card.Header>
          <Card.Title>{title}</Card.Title>
          {description && <Card.Description>{description}</Card.Description>}
        </Card.Header>
        <Separator borderColor="app.border" />
        <Card.Body py="2">{children}</Card.Body>
      </Card.Root>
    </Animated>
  )
}
