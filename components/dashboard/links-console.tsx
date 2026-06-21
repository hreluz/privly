'use client'

import { useRouter } from 'next/navigation'
import { statusMeta, accessText } from '@/lib/utils'
import { LiveFeed } from './live-feed'
import type { Link } from '@/lib/types'

interface Props {
  links: Link[]
  accentHex: string
}

export function LinksConsole({ links, accentHex }: Props) {
  const router = useRouter()

  return (
    <div className="grid grid-cols-[1.5fr_1fr] gap-[14px]">
      <div className="bg-panel border border-line rounded-xl overflow-hidden">
        <div className="px-4 py-[11px] border-b border-line font-mono text-[11px] text-dm">
          $ privly ls --all
        </div>
        <div className="font-mono text-[13px]">
          {links.map(link => {
            const sm = statusMeta(link.status)
            return (
              <div
                key={link.id}
                onClick={() => router.push(`/dashboard/links/${link.id}`)}
                className="flex items-center gap-3 px-4 py-[11px] border-b border-linr cursor-pointer hover:bg-[#0d1310] transition-colors"
              >
                <span
                  className="w-[7px] h-[7px] rounded-full flex-none"
                  style={{ background: sm.color, boxShadow: `0 0 6px ${sm.color}` }}
                />
                <span className="text-br flex-none">/{link.alias}</span>
                <span className="text-t3 flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
                  {link.destination}
                </span>
                <span className="text-m2 flex-none">{accessText(link.used, link.limit)}</span>
                <span className="flex-none w-[78px] text-right" style={{ color: sm.color }}>
                  {sm.label}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      <LiveFeed links={links} accentHex={accentHex} />
    </div>
  )
}
