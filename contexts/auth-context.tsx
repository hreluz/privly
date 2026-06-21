'use client'

import { createContext, useCallback, useContext, useState } from 'react'
import {
  login as loginService,
  register as registerService,
  logout as logoutService,
} from '@/services/auth'
import type { AuthStatus, LoginForm, RegisterForm, User } from '@/lib/types'

interface AuthContextValue {
  currentUser: User | null
  status: AuthStatus
  error: string | null
  login: (form: LoginForm) => Promise<void>
  register: (form: RegisterForm) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue>({
  currentUser: null,
  status: 'idle',
  error: null,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [status, setStatus] = useState<AuthStatus>('idle')
  const [error, setError] = useState<string | null>(null)

  const login = useCallback(async (form: LoginForm) => {
    setStatus('loading')
    setError(null)
    try {
      const user = await loginService(form)
      setCurrentUser(user)
      setStatus('authenticated')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'login failed')
      setStatus('error')
    }
  }, [])

  const register = useCallback(async (form: RegisterForm) => {
    setStatus('loading')
    setError(null)
    try {
      const user = await registerService(form)
      setCurrentUser(user)
      setStatus('authenticated')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'registration failed')
      setStatus('error')
    }
  }, [])

  const logout = useCallback(async () => {
    await logoutService()
    setCurrentUser(null)
    setStatus('idle')
    setError(null)
  }, [])

  return (
    <AuthContext.Provider value={{ currentUser, status, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)
