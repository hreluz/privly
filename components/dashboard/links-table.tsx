'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { IconEye, IconLock, IconGlobe } from '@/components/ui/icons'
import { StatusBadge } from '@/components/ui/status-badge'
import { ago, accessText, accessPct, barColor, statusMeta } from '@/lib/utils'
import type { Link as LinkType } from '@/lib/types'

interface Props {
  links: LinkType[]
  accentHex: string
}

export function LinksTable({ links, accentHex }: Props) {
  const router = useRouter()

  return (
    <div className="bg-panel border border-line rounded-xl overflow-hidden">
      <div className="grid grid-cols-[2.4fr_1.2fr_1.3fr_1fr_40px] gap-4 px-[18px] py-[11px] border-b border-line font-mono text-[11px] text-dm uppercase tracking-[0.5px]">
        <div>link</div><div>status</div><div>access</div><div>last open</div><div />
      </div>

      {links.map(link => {
        const sm      = statusMeta(link.status)
        const pct     = accessPct(link.used, link.limit)
        const lastOpen = link.visits[0] ? ago(link.visits[0].mins) : '—'
        const bc      = barColor(link.status, accentHex)

        return (
          <div
            key={link.id}
            onClick={() => router.push(`/dashboard/links/${link.id}`)}
            className="grid grid-cols-[2.4fr_1.2fr_1.3fr_1fr_40px] gap-4 px-[18px] py-[15px] border-b border-linr cursor-pointer items-center hover:bg-[#0d1310] transition-colors"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-[3px]">
                <span className="font-mono text-[14px] text-br font-medium">
                  privly.to/{link.alias}
                </span>
                {link.password && (
                  <IconLock size={12} className="text-warn" />
                )}
                {link.oneTime && (
                  <span className="font-mono text-[10px] text-danger border border-[rgba(232,97,90,0.3)] px-[5px] py-[1px] rounded">
                    1×
                  </span>
                )}
                {link.geo && (
                  <IconGlobe size={12} className="text-mu" />
                )}
              </div>
              <div className="text-[12px] text-dm whitespace-nowrap overflow-hidden text-ellipsis">
                → {link.destination}
              </div>
            </div>

            <div>
              <StatusBadge status={link.status} />
            </div>

            <div>
              <div className="font-mono text-[12px] text-tx mb-[5px]">
                {accessText(link.used, link.limit)}
              </div>
              <div className="h-1 bg-line rounded-[3px] overflow-hidden max-w-[110px]">
                <div className="h-full rounded-[3px]" style={{ width: `${pct}%`, background: bc }} />
              </div>
            </div>

            <div className="font-mono text-[12px] text-m2">{lastOpen}</div>

            <div className="flex justify-end gap-1.5">
              <Link
                href={`/${link.alias}`}
                onClick={e => e.stopPropagation()}
                title="preview gateway"
                className="text-dm flex p-1 rounded-[5px] hover:text-[var(--accent)] transition-colors"
              >
                <IconEye size={15} />
              </Link>
            </div>
          </div>
        )
      })}
    </div>
  )
}
