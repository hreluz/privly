import { describe, it, expect, vi, beforeEach } from 'vitest'
import { login, register, logout } from '@/services/auth'

const mockSignOut = vi.fn().mockResolvedValue({ error: null })
const mockSingle = vi.fn()
const mockEq = vi.fn(() => ({ single: mockSingle }))
const mockSelect = vi.fn(() => ({ eq: mockEq }))
const mockFrom = vi.fn(() => ({ select: mockSelect }))
const mockSignInWithPassword = vi.fn()
const mockSignUp = vi.fn()

vi.mock('@/lib/supabase/client', () => ({
  createClient: vi.fn(() => ({
    auth: {
      signInWithPassword: mockSignInWithPassword,
      signUp: mockSignUp,
      signOut: mockSignOut,
    },
    from: mockFrom,
  })),
}))

const mockUser = {
  id: 'usr_01',
  name: 'kael.r',
  email: 'kael@proton.me',
  plan: 'pro' as const,
  created_at: '2025-09-14T10:23:00Z',
}

beforeEach(() => {
  vi.clearAllMocks()
})

describe('login', () => {
  it('returns the user profile on valid credentials', async () => {
    mockSignInWithPassword.mockResolvedValue({
      data: { user: { id: 'usr_01' } },
      error: null,
    })
    mockSingle.mockResolvedValue({ data: mockUser, error: null })

    const result = await login({ email: 'kael@proton.me', password: 'password' })

    expect(result).toEqual(mockUser)
    expect(mockSignInWithPassword).toHaveBeenCalledWith({
      email: 'kael@proton.me',
      password: 'password',
    })
    expect(mockFrom).toHaveBeenCalledWith('users')
  })

  it('throws the Supabase auth error message on bad credentials', async () => {
    mockSignInWithPassword.mockResolvedValue({
      data: { user: null },
      error: { message: 'Invalid login credentials' },
    })

    await expect(
      login({ email: 'kael@proton.me', password: 'wrong' })
    ).rejects.toThrow('Invalid login credentials')
  })

  it('throws when the profile row is missing', async () => {
    mockSignInWithPassword.mockResolvedValue({
      data: { user: { id: 'usr_01' } },
      error: null,
    })
    mockSingle.mockResolvedValue({
      data: null,
      error: { message: 'PGRST116' },
    })

    await expect(
      login({ email: 'kael@proton.me', password: 'password' })
    ).rejects.toThrow('PGRST116')
  })

  it('returned User does not contain a password field', async () => {
    mockSignInWithPassword.mockResolvedValue({
      data: { user: { id: 'usr_01' } },
      error: null,
    })
    mockSingle.mockResolvedValue({ data: mockUser, error: null })

    const result = await login({ email: 'kael@proton.me', password: 'password' })

    expect((result as Record<string, unknown>).password).toBeUndefined()
  })
})

describe('register', () => {
  it('throws before calling Supabase when passwords do not match', async () => {
    await expect(
      register({ name: 'Alice', email: 'alice@example.com', password: 'abc', confirmPassword: 'xyz' })
    ).rejects.toThrow('passwords do not match')

    expect(mockSignUp).not.toHaveBeenCalled()
  })

  it('creates a user and returns the profile on valid form', async () => {
    const newUser = {
      id: 'usr_02',
      name: 'Alice',
      email: 'alice@example.com',
      plan: 'free' as const,
      created_at: new Date().toISOString(),
    }
    mockSignUp.mockResolvedValue({
      data: { user: { id: 'usr_02' } },
      error: null,
    })
    mockSingle.mockResolvedValue({ data: newUser, error: null })

    const result = await register({
      name: 'Alice',
      email: 'alice@example.com',
      password: 'secret',
      confirmPassword: 'secret',
    })

    expect(result).toEqual(newUser)
    expect(mockSignUp).toHaveBeenCalledWith({
      email: 'alice@example.com',
      password: 'secret',
      options: { data: { name: 'Alice' } },
    })
  })

  it('throws the Supabase error when email is already registered', async () => {
    mockSignUp.mockResolvedValue({
      data: { user: null },
      error: { message: 'User already registered' },
    })

    await expect(
      register({
        name: 'Dupe',
        email: 'kael@proton.me',
        password: 'anything',
        confirmPassword: 'anything',
      })
    ).rejects.toThrow('User already registered')
  })
})

describe('logout', () => {
  it('calls supabase.auth.signOut()', async () => {
    await logout()
    expect(mockSignOut).toHaveBeenCalledTimes(1)
  })
})
