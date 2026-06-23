/* eslint-disable react-refresh/only-export-components */
import { create } from 'zustand'
import Cookies from 'js-cookie'
import type { ReactNode } from 'react'
import type { User } from '../types'

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<void>
  logout: () => void
}

const TOKEN_COOKIE_KEY = 'auth_token'
const USER_COOKIE_KEY = 'auth_user'

const getStoredUser = (): User | null => {
  const storedUser = Cookies.get(USER_COOKIE_KEY)
  if (!storedUser) return null
  try {
    return JSON.parse(storedUser) as User
  } catch {
    Cookies.remove(USER_COOKIE_KEY)
    return null
  }
}

const initialToken = Cookies.get(TOKEN_COOKIE_KEY) || null

export const useAuth = create<AuthState>((set) => ({
  user: getStoredUser(),
  token: initialToken,
  isAuthenticated: Boolean(initialToken),

  login: async (username, password) => {
    if (username && password) {
      const mockToken = `jwt_token_${Date.now()}`
      
      const cleanedInput = username.trim().toLowerCase()
      const isAdmin = cleanedInput === 'admin' || cleanedInput === 'admin@example.com'
      const displayUsername = username.includes('@') ? username.split('@')[0] : username

      const mockUser: User = {
        id: '1',
        username: displayUsername,
        email: username.includes('@') ? username : `${username}@example.com`,
        role: isAdmin ? 'admin' : 'user',
        token: mockToken,
      }
      
      // Cookie attributes configured to function smoothly on localhost environment trees
      Cookies.set(TOKEN_COOKIE_KEY, mockToken, { expires: 7 })
      Cookies.set(USER_COOKIE_KEY, JSON.stringify(mockUser), { expires: 7 })
      
      set({ user: mockUser, token: mockToken, isAuthenticated: true })
    }
  },

  logout: () => {
    Cookies.remove(TOKEN_COOKIE_KEY)
    Cookies.remove(USER_COOKIE_KEY)
    set({ user: null, token: null, isAuthenticated: false })
  }
}))

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  return children
}