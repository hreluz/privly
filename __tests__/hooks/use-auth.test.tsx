import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import React from 'react'
import { AuthProvider } from '@/contexts/auth-context'
import { useAuth } from '@/hooks/use-auth'

const { mockLogin, mockRegister, mockLogout } = vi.hoisted(() => ({
  mockLogin: vi.fn(),
  mockRegister: vi.fn(),
  mockLogout: vi.fn(),
}))

vi.mock('@/services/auth', () => ({
  login: mockLogin,
  register: mockRegister,
  logout: mockLogout,
}))

const mockUser = {
  id: 'usr_01',
  name: 'kael.r',
  email: 'kael@proton.me',
  plan: 'pro' as const,
  created_at: '2025-09-14T10:23:00Z',
}

function wrapper({ children }: { children: React.ReactNode }) {
  return React.createElement(AuthProvider, null, children)
}

beforeEach(() => {
  vi.clearAllMocks()
})

describe('useAuth initial state', () => {
  it('starts with currentUser null, status idle, error null', () => {
    const { result } = renderHook(() => useAuth(), { wrapper })

    expect(result.current.currentUser).toBeNull()
    expect(result.current.status).toBe('idle')
    expect(result.current.error).toBeNull()
  })
})

describe('useAuth login', () => {
  it('sets status to authenticated and populates currentUser on valid credentials', async () => {
    mockLogin.mockResolvedValue(mockUser)
    const { result } = renderHook(() => useAuth(), { wrapper })

    await act(async () => {
      await result.current.login({ email: 'kael@proton.me', password: 'password' })
    })

    expect(result.current.status).toBe('authenticated')
    expect(result.current.currentUser).toEqual(mockUser)
    expect(result.current.error).toBeNull()
  })

  it('sets status to error and populates error on service throw', async () => {
    mockLogin.mockRejectedValue(new Error('Invalid login credentials'))
    const { result } = renderHook(() => useAuth(), { wrapper })

    await act(async () => {
      await result.current.login({ email: 'kael@proton.me', password: 'wrong' })
    })

    expect(result.current.status).toBe('error')
    expect(result.current.error).toBe('Invalid login credentials')
    expect(result.current.currentUser).toBeNull()
  })

  it('final status is not loading after call resolves', async () => {
    mockLogin.mockResolvedValue(mockUser)
    const { result } = renderHook(() => useAuth(), { wrapper })

    await act(async () => {
      await result.current.login({ email: 'kael@proton.me', password: 'password' })
    })

    expect(result.current.status).not.toBe('loading')
  })
})

describe('useAuth register', () => {
  it('sets status to authenticated and populates currentUser on success', async () => {
    const newUser = { ...mockUser, id: 'usr_02', name: 'Alice', email: 'alice@example.com', plan: 'free' as const }
    mockRegister.mockResolvedValue(newUser)
    const { result } = renderHook(() => useAuth(), { wrapper })

    await act(async () => {
      await result.current.register({
        name: 'Alice',
        email: 'alice@example.com',
        password: 'secret',
        confirmPassword: 'secret',
      })
    })

    expect(result.current.status).toBe('authenticated')
    expect(result.current.currentUser).toEqual(newUser)
    expect(result.current.currentUser?.plan).toBe('free')
  })

  it('sets status to error when service throws', async () => {
    mockRegister.mockRejectedValue(new Error('User already registered'))
    const { result } = renderHook(() => useAuth(), { wrapper })

    await act(async () => {
      await result.current.register({
        name: 'Dupe',
        email: 'kael@proton.me',
        password: 'anything',
        confirmPassword: 'anything',
      })
    })

    expect(result.current.status).toBe('error')
    expect(result.current.error).toBe('User already registered')
  })

  it('keeps currentUser null on registration failure', async () => {
    mockRegister.mockRejectedValue(new Error('registration failed'))
    const { result } = renderHook(() => useAuth(), { wrapper })

    await act(async () => {
      await result.current.register({
        name: 'Dave',
        email: 'dave@example.com',
        password: 'abc',
        confirmPassword: 'abc',
      })
    })

    expect(result.current.currentUser).toBeNull()
  })
})

describe('useAuth logout', () => {
  it('resets to idle and clears currentUser after logout', async () => {
    mockLogin.mockResolvedValue(mockUser)
    mockLogout.mockResolvedValue(undefined)
    const { result } = renderHook(() => useAuth(), { wrapper })

    await act(async () => {
      await result.current.login({ email: 'kael@proton.me', password: 'password' })
    })
    expect(result.current.status).toBe('authenticated')

    await act(async () => {
      await result.current.logout()
    })

    expect(result.current.currentUser).toBeNull()
    expect(result.current.status).toBe('idle')
    expect(result.current.error).toBeNull()
  })

  it('clears a previous error on logout', async () => {
    mockLogin.mockRejectedValue(new Error('bad'))
    mockLogout.mockResolvedValue(undefined)
    const { result } = renderHook(() => useAuth(), { wrapper })

    await act(async () => {
      await result.current.login({ email: 'x', password: 'y' })
    })
    expect(result.current.error).not.toBeNull()

    await act(async () => {
      await result.current.logout()
    })

    expect(result.current.error).toBeNull()
  })
})
