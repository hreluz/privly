'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { IconLock, IconShield } from '@/components/ui/icons'
import { useAuth } from '@/hooks/use-auth'
import { useAccent } from '@/hooks/use-accent'
import { useToast } from '@/hooks/use-toast'
import { accentMap } from '@/lib/utils'
import type { LoginForm as LoginFormType } from '@/lib/types'

const blank: LoginFormType = { email: '', password: '' }

export function LoginForm() {
  const router = useRouter()
  const { login, status, error, currentUser } = useAuth()
  const { accent, scanlines } = useAccent()
  const { fire } = useToast()
  const tokens = accentMap(accent)

  const [form, setForm] = useState<LoginFormType>(blank)
  const [focused, setFocused] = useState<keyof LoginFormType | null>(null)

  useEffect(() => {
    if (status === 'authenticated' && currentUser) {
      fire('signed in · welcome, ' + currentUser.name)
      router.push('/dashboard')
    }
  }, [status, currentUser, fire, router])

  function set<K extends keyof LoginFormType>(key: K, val: string) {
    setForm(f => ({ ...f, [key]: val }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    await login(form)
  }

  const isLoading = status === 'loading'

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
              <div className="font-mono text-[17px] text-br font-semibold mb-2.5">Sign in</div>
              <div className="text-[13px] text-sf leading-[1.55] mb-6">
                Enter your credentials to access your dashboard.
              </div>

              <div className="flex flex-col gap-[14px] mb-[18px]">
                <div>
                  <label className="font-mono text-[11px] text-dm block mb-[6px]">email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => set('email', e.target.value)}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused(null)}
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                    className="w-full bg-ink border rounded-[10px] p-[14px] text-br font-mono text-[13px] outline-none transition-colors"
                    style={{
                      borderColor:
                        error && !form.email
                          ? '#e8615a'
                          : focused === 'email'
                          ? tokens.hex
                          : '#1d2722',
                    }}
                  />
                </div>

                <div>
                  <label className="font-mono text-[11px] text-dm block mb-[6px]">password</label>
                  <input
                    type="password"
                    value={form.password}
                    onChange={e => set('password', e.target.value)}
                    onFocus={() => setFocused('password')}
                    onBlur={() => setFocused(null)}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    required
                    className="w-full bg-ink border rounded-[10px] p-[14px] text-br font-mono text-[13px] tracking-[2px] outline-none transition-colors"
                    style={{
                      borderColor:
                        error
                          ? '#e8615a'
                          : focused === 'password'
                          ? tokens.hex
                          : '#1d2722',
                    }}
                  />
                </div>
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
                  signing in…
                </div>
              ) : (
                <button
                  type="submit"
                  className="w-full font-mono text-[14px] font-semibold text-ink p-[14px] rounded-[10px] cursor-pointer hover:brightness-110 transition-all"
                  style={{ background: tokens.hex, boxShadow: `0 0 22px ${tokens.glow}` }}
                >
                  sign in →
                </button>
              )}
            </form>

            <div className="border-t border-ling p-[13px] flex items-center justify-center gap-2 font-mono text-[11px] text-dm">
              <IconShield size={12} />
              don&apos;t have an account?&nbsp;
              <Link href="/register" className="hover:text-m2 transition-colors" style={{ color: tokens.hex }}>
                register →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
