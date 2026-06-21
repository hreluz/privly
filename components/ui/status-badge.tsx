import { statusMeta } from '@/lib/utils'
import type { LinkStatus } from '@/lib/types'

interface StatusBadgeProps {
  status: LinkStatus
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const { label, color, bg } = statusMeta(status)
  return (
    <span
      className="inline-flex items-center gap-1.5 font-mono text-[11px] px-[9px] py-1 rounded-[5px]"
      style={{ color, background: bg }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ background: color, boxShadow: `0 0 6px ${color}` }}
      />
      {label}
    </span>
  )
}
