import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Login } from './Login'

// Mock the auth context hook
vi.mock('../store/authStore', () => ({
  useAuth: () => ({
    login: vi.fn(),
  }),
}))

describe('Login Component Validation', () => {
  it('displays schema validation errors when input lengths are insufficient', async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    )

    const submitButton = screen.getByRole('button', { name: /log in/i })
    fireEvent.click(submitButton)

    // Expecting inline errors enforced by Zod schema configuration
    await waitFor(() => {
      expect(screen.getByText(/username must be at least 3 characters/i)).toBeInTheDocument()
      expect(screen.getByText(/password must be at least 6 characters/i)).toBeInTheDocument()
    })
  })
})