'use client'

import { useAccent } from '@/hooks/use-accent'
import { accentMap } from '@/lib/utils'

const FEATURES = [
  { glyph: '$ lock',  title: 'Password gates',    body: 'Wrap any URL behind a secret only the right people know.' },
  { glyph: '$ limit', title: 'Access budgets',    body: 'Cap opens, set an expiry, or burn after a single view.' },
  { glyph: '$ who',   title: 'Know your visitors', body: 'See location, device and time for every open — in real time.' },
  { glyph: '$ kill',  title: 'Instant revoke',    body: 'One click kills a link everywhere. No backups, no residue.' },
]

export function FeatureRow() {
  const { accent } = useAccent()
  const tokens = accentMap(accent)

  return (
    <div className="grid grid-cols-4 gap-4 pt-2 pb-20">
      {FEATURES.map(f => (
        <div key={f.title} className="bg-panel border border-line rounded-xl p-5 hover:border-line4 transition-colors">
          <div className="font-mono text-[18px] mb-3" style={{ color: tokens.hex }}>{f.glyph}</div>
          <div className="font-mono font-semibold text-br text-[14px] mb-1.5">{f.title}</div>
          <div className="text-[13px] leading-[1.55] text-m2">{f.body}</div>
        </div>
      ))}
    </div>
  )
}
