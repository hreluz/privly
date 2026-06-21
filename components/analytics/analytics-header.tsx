'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { IconEye, IconCopy, IconCheck, IconBan } from '@/components/ui/icons'
import { StatusBadge } from '@/components/ui/status-badge'
import { useToast } from '@/hooks/use-toast'
import { useLinks } from '@/hooks/use-links'
import { useState } from 'react'
import type { Link as LinkType } from '@/lib/types'

interface Props {
  link: LinkType
}

export function AnalyticsHeader({ link }: Props) {
  const router = useRouter()
  const { fire } = useToast()
  const { revokeLink } = useLinks()
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard?.writeText('https://privly.to/' + link.alias).catch(() => {})
    setCopied(true)
    fire('link copied')
    setTimeout(() => setCopied(false), 2000)
  }

  function handleRevoke() {
    revokeLink(link.id)
    fire('link revoked — gateway now returns 410')
    router.push('/dashboard')
  }

  return (
    <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
      <div>
        <div className="font-mono text-[12px] text-dm mb-2.5 flex items-center gap-2">
          <Link href="/dashboard" className="cursor-pointer hover:text-tx transition-colors">
            ~/links
          </Link>
          {' '}/ {link.alias}
        </div>
        <h1 className="font-mono font-bold text-[25px] tracking-[-0.8px] text-br m-0 mb-2 flex items-center gap-2.5">
          privly.to/{link.alias}
          <StatusBadge status={link.status} />
        </h1>
        <div className="text-[13px] text-dm font-mono">→ {link.destination}</div>
      </div>

      <div className="flex gap-2">
        <Link
          href={`/${link.alias}`}
          className="flex items-center gap-[7px] font-mono text-[12px] text-tx bg-panel3 border border-line3 px-[14px] py-[9px] rounded-lg cursor-pointer hover:border-linh transition-colors"
        >
          <IconEye size={14} /> preview
        </Link>
        <button
          onClick={handleCopy}
          className="flex items-center gap-[7px] font-mono text-[12px] text-tx bg-panel3 border border-line3 px-[14px] py-[9px] rounded-lg cursor-pointer hover:border-linh transition-colors"
        >
          {copied ? <IconCheck size={14} /> : <IconCopy size={14} />}
          {copied ? 'copied!' : 'copy link'}
        </button>
        <button
          onClick={handleRevoke}
          className="flex items-center gap-[7px] font-mono text-[12px] text-danger bg-[rgba(232,97,90,0.08)] border border-[rgba(232,97,90,0.25)] px-[14px] py-[9px] rounded-lg cursor-pointer hover:bg-[rgba(232,97,90,0.14)] transition-colors"
        >
          <IconBan size={14} /> revoke
        </button>
      </div>
    </div>
  )
}
