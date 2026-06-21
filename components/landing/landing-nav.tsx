'use client'

import Link from 'next/link'
import { useAccent } from '@/hooks/use-accent'
import { accentMap } from '@/lib/utils'

export function LandingNav() {
  const { accent } = useAccent()
  const tokens = accentMap(accent)

  return (
    <div className="flex items-center justify-between h-[76px] border-b border-line">
      <div className="flex items-center gap-[11px] font-mono font-bold text-[18px] tracking-[-0.5px] text-br">
        <div
          className="w-[26px] h-[26px] rounded-[7px] border-[1.5px] flex items-center justify-center"
          style={{ borderColor: tokens.hex, color: tokens.hex, boxShadow: `0 0 14px ${tokens.glow}` }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
            <rect x="4" y="10" width="16" height="11" rx="2" />
            <path d="M8 10V7a4 4 0 0 1 8 0v3" />
          </svg>
        </div>
        privly
        <span className="animate-blink" style={{ color: tokens.hex }}>_</span>
      </div>
      <div className="flex items-center gap-2 font-mono text-[13px]">
        <span className="text-mu px-3 py-2 cursor-pointer hover:text-tx">docs</span>
        <span className="text-mu px-3 py-2 cursor-pointer hover:text-tx">pricing</span>
        <Link
          href="/dashboard"
          className="text-ink px-4 py-[9px] rounded-lg font-semibold cursor-pointer hover:brightness-110"
          style={{ background: tokens.hex, boxShadow: `0 0 18px ${tokens.glow}` }}
        >
          launch app →
        </Link>
      </div>
    </div>
  )
}
