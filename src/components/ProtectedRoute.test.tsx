import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { AuthProvider } from '../store/authStore'
import { ProtectedRoute } from './ProtectedRoute'

describe('ProtectedRoute', () => {
  it('redirects unauthenticated users to login', () => {
    localStorage.clear()

    render(
      <MemoryRouter initialEntries={['/admin']}>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<h1>Login Screen</h1>} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute requiredRole="admin">
                  <h1>Admin Screen</h1>
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </MemoryRouter>
    )

    expect(screen.getByRole('heading', { name: /login screen/i })).toBeInTheDocument()
  })
})
