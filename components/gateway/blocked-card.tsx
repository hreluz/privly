'use client'

import Link from 'next/link'
import { IconClock, IconBan, IconFire } from '@/components/ui/icons'
import { useAccent } from '@/hooks/use-accent'
import type { Link as LinkType } from '@/lib/types'

interface Props {
  link: LinkType
}

const BLOCKED_META: Record<string, { title: string; sub: string; code: string; Icon: typeof IconBan }> = {
  expired: {
    title: 'Link expired',
    sub: 'The owner set this link to stop working after a certain time. That window has now passed.',
    code: '410 · LINK_EXPIRED',
    Icon: IconClock,
  },
  limit: {
    title: 'Access limit reached',
    sub: 'This link hit the maximum number of opens its owner allowed. No further visits are permitted.',
    code: '429 · LIMIT_REACHED',
    Icon: IconBan,
  },
  burned: {
    title: 'Link already used',
    sub: 'This was a one-time link. It was opened once and has permanently self-destructed.',
    code: '410 · ONE_TIME_BURNED',
    Icon: IconFire,
  },
}

export function BlockedCard({ link }: Props) {
  const { scanlines } = useAccent()
  const meta = BLOCKED_META[link.status] ?? BLOCKED_META.expired
  const { title, sub, code, Icon } = meta

  return (
    <div className="relative min-h-screen overflow-x-hidden font-sans text-tx" style={{ background: '#070a08' }}>
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
          style={{ background: 'radial-gradient(circle at 50% 35%,rgba(232,97,90,0.05),transparent 55%)' }}
        />
        <div className="w-full max-w-[420px] relative animate-rise">
          <div className="flex items-center justify-center gap-[9px] font-mono font-bold text-[15px] text-br mb-[22px]">
            <div className="w-[22px] h-[22px] rounded-[6px] border-[1.5px] border-lins flex items-center justify-center text-mu">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                <rect x="4" y="10" width="16" height="11" rx="2" />
                <path d="M8 10V7a4 4 0 0 1 8 0v3" />
              </svg>
            </div>
            privly
          </div>

          <div className="bg-panel border border-line2 rounded-2xl px-[30px] py-[38px] text-center shadow-[0_40px_100px_-40px_rgba(0,0,0,0.9)]">
            <div className="w-[60px] h-[60px] mx-auto mb-[22px] rounded-2xl border border-[rgba(232,97,90,0.25)] bg-[rgba(232,97,90,0.05)] flex items-center justify-center text-danger">
              <Icon size={24} />
            </div>
            <div className="font-mono text-[11px] text-dm mb-2">privly.to/{link.alias}</div>
            <div className="font-mono text-[19px] text-br font-semibold mb-3">{title}</div>
            <div className="text-[13px] text-sf leading-[1.6] mb-6 max-w-[300px] mx-auto">{sub}</div>
            <div className="bg-ink border border-line rounded-[10px] p-[14px] font-mono text-[12px] text-mu flex items-center justify-center gap-[9px]">
              <span className="text-danger">✗</span>{code}
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
