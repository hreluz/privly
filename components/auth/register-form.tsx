'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { IconLock, IconShield } from '@/components/ui/icons'
import { useAuth } from '@/hooks/use-auth'
import { useAccent } from '@/hooks/use-accent'
import { useToast } from '@/hooks/use-toast'
import { accentMap } from '@/lib/utils'
import type { RegisterForm as RegisterFormType } from '@/lib/types'

const blank: RegisterFormType = { name: '', email: '', password: '', confirmPassword: '' }

export function RegisterForm() {
  const router = useRouter()
  const { register, status, error, currentUser } = useAuth()
  const { accent, scanlines } = useAccent()
  const { fire } = useToast()
  const tokens = accentMap(accent)

  const [form, setForm] = useState<RegisterFormType>(blank)
  const [focused, setFocused] = useState<keyof RegisterFormType | null>(null)
  const [fieldError, setFieldError] = useState<string | null>(null)

  useEffect(() => {
    if (status === 'authenticated' && currentUser) {
      fire('account created · welcome, ' + currentUser.name)
      router.push('/dashboard')
    }
  }, [status, currentUser, fire, router])

  function set<K extends keyof RegisterFormType>(key: K, val: string) {
    setForm(f => ({ ...f, [key]: val }))
    if (key === 'confirmPassword' || key === 'password') setFieldError(null)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (form.password !== form.confirmPassword) {
      setFieldError('passwords do not match')
      return
    }
    setFieldError(null)
    await register(form)
  }

  const isLoading = status === 'loading'

  const fields: {
    key: keyof RegisterFormType
    label: string
    type: string
    placeholder: string
    autoComplete: string
  }[] = [
    { key: 'name', label: 'name', type: 'text', placeholder: 'your name', autoComplete: 'name' },
    { key: 'email', label: 'email', type: 'email', placeholder: 'you@example.com', autoComplete: 'email' },
    { key: 'password', label: 'password', type: 'password', placeholder: '••••••••', autoComplete: 'new-password' },
    { key: 'confirmPassword', label: 'confirm password', type: 'password', placeholder: '••••••••', autoComplete: 'new-password' },
  ]

  function borderColor(key: keyof RegisterFormType) {
    const hasConfirmError = fieldError && (key === 'password' || key === 'confirmPassword')
    const hasAuthError = error && (key === 'email' || key === 'password')
    if (hasConfirmError || hasAuthError) return '#e8615a'
    if (focused === key) return tokens.hex
    return '#1d2722'
  }

  return (
    <div
      className="relative min-h-screen overflow-x-hidden font-sans text-tx"
      style={{ background: '#070a08' }}
    >
      {scanlines && (
        <div
          className="pointer-events-none fixed inset-0 z-[9999] opacity-50 mix-blend-multiply"
          style={{
            background:
              'repeating-linear-gradient(0deg,rgba(0,0,0,0)0px,rgba(0,0,0,0)2px,rgba(0,0,0,0.16)3px,rgba(0,0,0,0)4px)',
          }}
        />
      )}

      <div className="min-h-screen flex items-center justify-center p-6 relative z-[1]">
        <div
          className="fixed inset-0"
          style={{
            background: `radial-gradient(circle at 50% 35%,${tokens.glow},transparent 55%)`,
          }}
        />

        <div className="w-full max-w-[420px] relative animate-rise">
          <div className="flex items-center justify-center gap-[9px] font-mono font-bold text-[15px] text-br mb-[22px]">
            <div
              className="w-[22px] h-[22px] rounded-[6px] border-[1.5px] flex items-center justify-center"
              style={{ borderColor: tokens.hex, color: tokens.hex }}
            >
              <IconLock size={11} />
            </div>
            privly
          </div>

          <div className="bg-panel border border-line2 rounded-2xl overflow-hidden shadow-[0_40px_100px_-40px_rgba(0,0,0,0.9)]">
            <form onSubmit={handleSubmit} className="px-[30px] py-[34px]">
              <div className="font-mono text-[17px] text-br font-semibold mb-2.5">Create account</div>
              <div className="text-[13px] text-sf leading-[1.55] mb-6">
                Get started with privacy-gated links.
              </div>

              <div className="flex flex-col gap-[14px] mb-[18px]">
                {fields.map(f => (
                  <div key={f.key}>
                    <label className="font-mono text-[11px] text-dm block mb-[6px]">{f.label}</label>
                    <input
                      type={f.type}
                      value={form[f.key]}
                      onChange={e => set(f.key, e.target.value)}
                      onFocus={() => setFocused(f.key)}
                      onBlur={() => setFocused(null)}
                      placeholder={f.placeholder}
                      autoComplete={f.autoComplete}
                      required
                      className="w-full bg-ink border rounded-[10px] p-[14px] text-br font-mono text-[13px] outline-none transition-colors"
                      style={{
                        borderColor: borderColor(f.key),
                        letterSpacing: f.type === 'password' ? '2px' : undefined,
                      }}
                    />
                    {f.key === 'confirmPassword' && fieldError && (
                      <div className="font-mono text-[12px] text-danger mt-2">✗ {fieldError}</div>
                    )}
                  </div>
                ))}
              </div>

              {error && (
                <div className="font-mono text-[12px] text-danger mb-[14px]">✗ {error}</div>
              )}

              {isLoading ? (
                <div className="flex items-center justify-center gap-[11px] font-mono text-[13px] text-sf py-[14px]">
                  <span
                    className="w-4 h-4 border-2 border-line2 rounded-full animate-spin-fast"
                    style={{ borderTopColor: tokens.hex }}
                  />
                  creating account…
                </div>
              ) : (
                <button
                  type="submit"
                  className="w-full font-mono text-[14px] font-semibold text-ink p-[14px] rounded-[10px] cursor-pointer hover:brightness-110 transition-all"
                  style={{ background: tokens.hex, boxShadow: `0 0 22px ${tokens.glow}` }}
                >
                  create account →
                </button>
              )}
            </form>

            <div className="border-t border-ling p-[13px] flex items-center justify-center gap-2 font-mono text-[11px] text-dm">
              <IconShield size={12} />
              already have an account?&nbsp;
              <Link href="/login" className="hover:text-m2 transition-colors" style={{ color: tokens.hex }}>
                sign in →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
