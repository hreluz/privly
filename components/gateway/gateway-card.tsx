'use client'

import Link from 'next/link'
import { IconLock, IconUnlock, IconFire, IconShield } from '@/components/ui/icons'
import { useGateway } from '@/hooks/use-gateway'
import { useAccent } from '@/hooks/use-accent'
import { accentMap } from '@/lib/utils'
import type { Link as LinkType } from '@/lib/types'

interface Props {
  link: LinkType
}

export function GatewayCard({ link }: Props) {
  const { accent, scanlines } = useAccent()
  const tokens = accentMap(accent)
  const gw = useGateway(link)

  const GateIcon = link.oneTime ? IconFire : gw.phase === 'unlocked' ? IconUnlock : IconLock

  const title =
    gw.phase === 'verifying' ? 'Verifying…'
    : gw.phase === 'unlocked' ? 'Access granted'
    : link.password ? 'Password required'
    : 'Confirm redirect'

  const sub =
    gw.phase === 'verifying'
      ? "Checking your credentials against the link owner's rules."
      : gw.phase === 'unlocked'
      ? 'Credentials accepted. Forwarding you now.'
      : link.password
      ? 'This destination is protected by the link owner. Enter the password to continue.'
      : "You're about to be forwarded to an external site. Continue when ready."

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
          style={{ background: 'radial-gradient(circle at 50% 35%,rgba(70,224,138,0.06),transparent 55%)' }}
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
            <div className="px-[30px] py-[34px] text-center">
              <div
                className="w-[60px] h-[60px] mx-auto mb-5 rounded-2xl border flex items-center justify-center"
                style={{
                  borderColor: tokens.dim,
                  background: 'rgba(70,224,138,0.05)',
                  color: tokens.hex,
                  boxShadow: `0 0 30px ${tokens.glow}`,
                }}
              >
                <GateIcon size={24} />
              </div>

              <div className="font-mono text-[11px] text-dm mb-2">privly.to/{link.alias}</div>
              <div className="font-mono text-[17px] text-br font-semibold mb-2.5">{title}</div>
              <div className="text-[13px] text-sf leading-[1.55] mb-6 max-w-[300px] mx-auto">{sub}</div>

              {gw.phase === 'locked' && link.password && (
                <div className="mb-[14px]">
                  <input
                    type="password"
                    value={gw.password}
                    onChange={e => gw.setPassword(e.target.value)}
                    onKeyDown={gw.handleKeyDown}
                    placeholder="enter password"
                    className="w-full bg-ink border rounded-[10px] p-[14px] text-br font-mono text-[14px] tracking-[2px] text-center outline-none transition-colors focus:border-[var(--accent)]"
                    style={{ borderColor: gw.error ? '#e8615a' : '#1d2722' }}
                  />
                  {gw.error && (
                    <div className="font-mono text-[12px] text-danger mt-2.5">✗ {gw.error}</div>
                  )}
                </div>
              )}

              {gw.phase === 'locked' && (
                <button
                  onClick={gw.submit}
                  className="w-full font-mono text-[14px] font-semibold text-ink p-[14px] rounded-[10px] cursor-pointer hover:brightness-110 transition-all"
                  style={{ background: tokens.hex, boxShadow: `0 0 22px ${tokens.glow}` }}
                >
                  {link.password ? 'unlock →' : 'continue securely →'}
                </button>
              )}

              {gw.phase === 'verifying' && (
                <div className="flex items-center justify-center gap-[11px] font-mono text-[13px] text-sf pt-1.5 pb-1">
                  <span
                    className="w-4 h-4 border-2 border-line2 rounded-full animate-spin-fast"
                    style={{ borderTopColor: tokens.hex }}
                  />
                  verifying credentials…
                </div>
              )}

              {gw.phase === 'unlocked' && (
                <>
                  <div className="bg-ink border border-[var(--accent-dim)] rounded-[10px] p-[13px] mb-[14px]">
                    <div className="font-mono text-[11px] text-dm mb-[5px]">destination</div>
                    <div className="font-mono text-[12px] break-all" style={{ color: tokens.hex }}>
                      {link.destination}
                    </div>
                  </div>
                  <button
                    className="w-full font-mono text-[14px] font-semibold text-ink p-[14px] rounded-[10px] cursor-pointer"
                    style={{ background: tokens.hex }}
                  >
                    continue to destination →
                    {gw.countdown > 0 && ` (${gw.countdown}s)`}
                  </button>
                </>
              )}
            </div>

            <div className="border-t border-ling p-[13px] flex items-center justify-center gap-2 font-mono text-[11px] text-dm">
              <IconShield size={12} />
              this link is privacy-gated · no ads, no trackers
            </div>
          </div>

          <Link
            href="/dashboard"
            className="block text-center mt-[18px] font-mono text-[11px] text-ft cursor-pointer hover:text-m2 transition-colors"
          >
            ← back to demo dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}
