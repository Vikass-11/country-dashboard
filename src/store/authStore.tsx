/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import type { User } from '../types'

interface AuthContextType {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const TOKEN_STORAGE_KEY = 'token'
const USER_STORAGE_KEY = 'user'

const getStoredUser = (): User | null => {
  const storedUser = localStorage.getItem(USER_STORAGE_KEY)

  if (!storedUser) {
    return null
  }

  try {
    return JSON.parse(storedUser) as User
  } catch {
    localStorage.removeItem(USER_STORAGE_KEY)
    return null
  }
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => getStoredUser())
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_STORAGE_KEY))

  const login = async (username: string, password: string): Promise<void> => {
    if (username && password) {
      const mockToken = `jwt_token_${Date.now()}`
      const mockUser: User = {
        id: '1',
        username,
        email: `${username}@example.com`,
        role: username === 'admin' ? 'admin' : 'user',
        token: mockToken,
      }
      localStorage.setItem(TOKEN_STORAGE_KEY, mockToken)
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(mockUser))
      setUser(mockUser)
      setToken(mockToken)
    }
  }

  const logout = () => {
    localStorage.removeItem(TOKEN_STORAGE_KEY)
    localStorage.removeItem(USER_STORAGE_KEY)
    setUser(null)
    setToken(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: Boolean(token),
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
