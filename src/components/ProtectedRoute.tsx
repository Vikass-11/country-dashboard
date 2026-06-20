import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../store/authStore'

interface ProtectedRouteProps {
  children: ReactNode
  requiredRole?: 'admin' | 'user'
}

export const ProtectedRoute = ({
  children,
  requiredRole,
}: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/dashboard" replace />
  }

  return <>{children}</>
}
