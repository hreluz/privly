export type AccentName = 'green' | 'cyan' | 'violet' | 'amber'

export type LinkStatus = 'active' | 'limit' | 'expired' | 'burned' | 'armed'

export type GatewayPhase = 'locked' | 'verifying' | 'unlocked'

export interface Visit {
  mins: number
  country: string
  cc: string
  flag: string
  city: string
  ip: string
  device: string
  browser: string
  result: 'allow' | 'blocked'
}

export interface Link {
  id: string
  alias: string
  destination: string
  password: string | null
  limit: number | null
  used: number
  expiry: string
  oneTime: boolean
  geo: string | null
  notify: boolean
  status: LinkStatus
  daily: number[]
  visits: Visit[]
}

export interface CreateLinkForm {
  destination: string
  alias: string
  usePassword: boolean
  password: string
  useLimit: boolean
  limit: string
  useExpiry: boolean
  expiry: string
  oneTime: boolean
  useGeo: boolean
  geo: string
  notify: boolean
}

export interface AccentTokens {
  hex: string
  dim: string
  glow: string
}

export interface StatusMeta {
  label: string
  color: string
  bg: string
}

export interface User {
  id: string
  name: string
  email: string
  plan: 'free' | 'pro'
  created_at: string
}

export interface LoginForm {
  email: string
  password: string
}

export interface RegisterForm {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'error'
