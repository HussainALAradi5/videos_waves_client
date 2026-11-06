import { describe, expect, it, vi } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { GenericButton } from '@/components/common/buttons/generic-button'
import { renderWithTheme } from '../../../helpers/render.helper'

describe('GenericButton', () => {
  it('runs an async action once, however often it is clicked, and is disabled meanwhile', async () => {
    let finish: () => void = () => undefined
    const action = vi.fn(() => new Promise<void>((resolve) => (finish = resolve)))
    renderWithTheme(<GenericButton onClick={action}>Save</GenericButton>)
    const button = screen.getByRole('button', { name: /save/i })

    await userEvent.click(button)
    await userEvent.click(button)
    expect(action).toHaveBeenCalledTimes(1)
    expect(button).toBeDisabled()
    expect(button).toHaveAttribute('aria-busy', 'true')

    finish()
    await waitFor(() => expect(button).toBeEnabled())
  })
})
