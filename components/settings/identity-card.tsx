'use client'

import { useAccent } from '@/hooks/use-accent'
import { accentMap } from '@/lib/utils'
import { IconCheck } from '@/components/ui/icons'

export function IdentityCard() {
  const { accent } = useAccent()
  const tokens = accentMap(accent)

  return (
    <div className="bg-panel border border-line rounded-xl p-5">
      <div className="font-mono text-[13px] text-br mb-4">identity</div>
      <div className="flex items-center gap-[14px] mb-4">
        <div
          className="w-[46px] h-[46px] rounded-[11px] border border-line4 flex items-center justify-center font-mono text-[18px]"
          style={{ background: 'linear-gradient(135deg,#1c2a23,#0e1411)', color: tokens.hex }}
        >
          k
        </div>
        <div>
          <div className="text-[14px] text-tx font-medium">kael.r</div>
          <div className="font-mono text-[12px] text-dm">kael@proton.me</div>
        </div>
      </div>
      <div
        className="flex items-center gap-2 font-mono text-[12px] border px-3 py-[9px] rounded-lg"
        style={{
          color: tokens.hex,
          background: 'rgba(70,224,138,0.06)',
          borderColor: tokens.dim,
        }}
      >
        <IconCheck size={13} /> two-factor authentication is enabled
      </div>
    </div>
  )
}
