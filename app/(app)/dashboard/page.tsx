'use client'

import { useState } from 'react'
import Link from 'next/link'
import { IconPlus } from '@/components/ui/icons'
import { StatCardsRow } from '@/components/dashboard/stat-cards-row'
import { VariantSwitcher, type Variant } from '@/components/dashboard/variant-switcher'
import { LinksTable } from '@/components/dashboard/links-table'
import { LinksCards } from '@/components/dashboard/links-cards'
import { LinksConsole } from '@/components/dashboard/links-console'
import { useLinks } from '@/hooks/use-links'
import { useAccent } from '@/hooks/use-accent'
import { accentMap } from '@/lib/utils'

export default function DashboardPage() {
  const { links } = useLinks()
  const { accent } = useAccent()
  const tokens = accentMap(accent)
  const [variant, setVariant] = useState<Variant>('table')

  const active = links.filter(l => l.status === 'active' || l.status === 'armed').length

  return (
    <div className="px-9 py-[30px] max-w-[1180px] w-full">
      <div className="flex items-end justify-between mb-[26px] flex-wrap gap-4">
        <div>
          <div className="font-mono text-[12px] text-dm mb-1.5">
            ~/links · {active} active
          </div>
          <h1 className="font-mono font-bold text-[27px] tracking-[-0.8px] text-br m-0">
            Good evening, kael
            <span className="animate-blink" style={{ color: tokens.hex }}>_</span>
          </h1>
        </div>
        <Link
          href="/dashboard/create"
          className="flex items-center gap-2 font-mono text-[13px] font-semibold text-ink px-[18px] py-[11px] rounded-[9px] cursor-pointer hover:brightness-110"
          style={{ background: tokens.hex, boxShadow: `0 0 20px ${tokens.glow}` }}
        >
          <IconPlus size={15} /> new link
        </Link>
      </div>

      <StatCardsRow links={links} accentHex={tokens.hex} />

      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div className="font-mono text-[13px] text-sf">your links</div>
        <VariantSwitcher active={variant} onChange={setVariant} accentHex={tokens.hex} />
      </div>

      {variant === 'table'   && <LinksTable   links={links} accentHex={tokens.hex} />}
      {variant === 'cards'   && <LinksCards   links={links} accentHex={tokens.hex} />}
      {variant === 'console' && <LinksConsole links={links} accentHex={tokens.hex} />}
    </div>
  )
}
