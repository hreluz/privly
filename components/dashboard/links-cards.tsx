'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { IconLock, IconEye } from '@/components/ui/icons'
import { StatusBadge } from '@/components/ui/status-badge'
import { Sparkline } from '@/components/ui/sparkline'
import { accessText, statusMeta } from '@/lib/utils'
import type { Link as LinkType } from '@/lib/types'

interface Props {
  links: LinkType[]
  accentHex: string
}

export function LinksCards({ links, accentHex }: Props) {
  const router = useRouter()

  return (
    <div className="grid grid-cols-3 gap-[14px]">
      {links.map(link => {
        const sm = statusMeta(link.status)
        return (
          <div
            key={link.id}
            onClick={() => router.push(`/dashboard/links/${link.id}`)}
            className="bg-panel border border-line rounded-xl p-[17px] cursor-pointer flex flex-col gap-[14px] hover:border-line4 transition-colors"
          >
            <div className="flex items-start justify-between gap-2.5">
              <div className="min-w-0">
                <div className="font-mono text-[14px] text-br font-semibold mb-1 flex items-center gap-[7px]">
                  /{link.alias}
                  {link.password && <IconLock size={12} className="text-warn" />}
                </div>
                <div className="text-[12px] text-dm whitespace-nowrap overflow-hidden text-ellipsis">
                  {link.destination}
                </div>
              </div>
              <StatusBadge status={link.status} />
            </div>

            <Sparkline data={link.daily} accentHex={accentHex} />

            <div className="flex items-center justify-between pt-[13px] border-t border-ling">
              <div>
                <div className="font-mono text-[16px] text-br font-semibold">
                  {accessText(link.used, link.limit)}
                </div>
                <div className="font-mono text-[10px] text-dm uppercase tracking-[0.5px]">opens</div>
              </div>
              <div className="text-right">
                <div className="font-mono text-[13px] text-tx">{link.visits.length}</div>
                <div className="font-mono text-[10px] text-dm uppercase tracking-[0.5px]">visitors</div>
              </div>
              <Link
                href={`/${link.alias}`}
                onClick={e => e.stopPropagation()}
                className="text-dm flex p-[7px] rounded-[7px] border border-linc hover:text-[var(--accent)] hover:border-line4 transition-colors"
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
