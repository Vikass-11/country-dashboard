import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute'
import * as authStore from '../store/authStore'

describe('ProtectedRoute Component Redirection', () => {
  it('redirects unauthorized context visitors to the login workspace window', () => {
    // Force mock state to unauthenticated
    vi.spyOn(authStore, 'useAuth').mockReturnValue({
      user: null,
      token: null,
      isAuthenticated: false,
      login: async () => {},
      logout: () => {},
    })

    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <Routes>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <div>Secret Dashboard Content</div>
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<div>Redirected Login View Target</div>} />
        </Routes>
      </MemoryRouter>
    )

    expect(screen.queryByText(/secret dashboard content/i)).not.toBeInTheDocument()
    expect(screen.getByText(/redirected login view target/i)).toBeInTheDocument()
  })
})