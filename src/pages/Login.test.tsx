import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { AuthProvider } from '../store/authStore'
import { Login } from './Login'

describe('Login page validation', () => {
  it('shows inline validation errors for invalid input', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </MemoryRouter>
    )

    await user.type(screen.getByLabelText(/username/i), 'ab')
    await user.type(screen.getByLabelText(/password/i), 'abc')
    await user.click(screen.getByRole('button', { name: /log in/i }))

    expect(await screen.findByText(/username must be at least 3 characters/i)).toBeInTheDocument()
    expect(await screen.findByText(/password must be at least 6 characters/i)).toBeInTheDocument()
  })
})
