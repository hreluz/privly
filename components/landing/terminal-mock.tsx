'use client'

import { useAccent } from '@/hooks/use-accent'
import { accentMap } from '@/lib/utils'

export function TerminalMock() {
  const { accent } = useAccent()
  const tokens = accentMap(accent)

  return (
    <div className="bg-panel border border-line2 rounded-[14px] overflow-hidden shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] animate-flicker">
      <div className="flex items-center gap-[7px] px-[15px] py-[13px] border-b border-line bg-panel3">
        <span className="w-[11px] h-[11px] rounded-full bg-danger" />
        <span className="w-[11px] h-[11px] rounded-full bg-warn" />
        <span className="w-[11px] h-[11px] rounded-full" style={{ background: tokens.hex }} />
        <span className="ml-2 font-mono text-[11px] text-dm">privly — gateway.sh</span>
      </div>
      <div className="p-5 font-mono text-[13px] leading-[1.85]">
        <div className="text-dm">
          <span style={{ color: tokens.hex }}>$</span> privly wrap https://drive.google.com/...
        </div>
        <div className="text-tx ml-0.5">
          ↳ created <span style={{ color: tokens.hex }}>privly.to/q4-report</span>
        </div>
        <div className="text-dm mt-2.5">
          <span style={{ color: tokens.hex }}>$</span> privly set --password --max 100 --expire 14d
        </div>
        <div className="text-tx">
          {'  '}<span className="text-warn">✓</span> password ······· set
        </div>
        <div className="text-tx">
          {'  '}<span className="text-warn">✓</span> access limit{'  '}47 / 100
        </div>
        <div className="text-tx">
          {'  '}<span className="text-warn">✓</span> expires in{'   '}12 days
        </div>
        <div className="text-dm mt-2.5">
          <span style={{ color: tokens.hex }}>$</span> privly who
        </div>
        <div className="text-tx">
          {'  '}47 opens · 9 countries · 0 leaks
        </div>
        <div className="text-dm mt-1">
          {'  '}last:{' '}
          <span className="text-tx">San Francisco, US · 7m ago</span>{' '}
          <span className="animate-blink" style={{ color: tokens.hex }}>↗</span>
        </div>
      </div>
    </div>
  )
}
