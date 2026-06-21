'use client'

import Link from 'next/link'
import { useAccent } from '@/hooks/use-accent'
import { accentMap } from '@/lib/utils'
import { TerminalMock } from './terminal-mock'

export function Hero() {
  const { accent } = useAccent()
  const tokens = accentMap(accent)

  return (
    <div className="grid grid-cols-[1.05fr_0.95fr] gap-14 items-center pt-[74px] pb-16">
      <div>
        <div
          className="inline-flex items-center gap-2 font-mono text-[12px] border px-3 py-1.5 rounded-full mb-[26px]"
          style={{ color: tokens.hex, borderColor: tokens.dim, background: 'rgba(70,224,138,0.05)' }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse-glow"
            style={{ background: tokens.hex, boxShadow: `0 0 8px ${tokens.hex}` }}
          />
          no ads · no tracking · no logs you don&apos;t control
        </div>

        <h1 className="font-mono font-bold text-[54px] leading-[1.04] tracking-[-1.8px] text-br m-0 mb-[22px]">
          Links you<br />actually<br />
          <span style={{ color: tokens.hex }}>control.</span>
        </h1>

        <p className="text-[17px] leading-[1.6] text-sf max-w-[430px] m-0 mb-8">
          Privly is a link gateway without the ad-wall. Wrap any URL, then gate it with a
          password, an access limit, an expiry, or a one-time burn. See exactly who opened
          it — and revoke it the instant you want.
        </p>

        <div className="flex gap-3 flex-wrap">
          <Link
            href="/register"
            className="font-mono text-[14px] font-semibold text-ink px-[22px] py-[13px] rounded-[9px] cursor-pointer hover:brightness-110"
            style={{ background: tokens.hex, boxShadow: `0 0 24px ${tokens.glow}` }}
          >
            $ create my first link
          </Link>
          <Link
            href="/q4-report"
            className="font-mono text-[14px] font-medium text-tx bg-panel3 border border-line3 px-[22px] py-[13px] rounded-[9px] cursor-pointer hover:border-linh transition-colors"
          >
            see a gated link
          </Link>
        </div>
      </div>

      <TerminalMock />
    </div>
  )
}
