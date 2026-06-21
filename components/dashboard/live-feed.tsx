import { ago } from '@/lib/utils'
import type { Link } from '@/lib/types'

interface Props {
  links: Link[]
  accentHex: string
}

export function LiveFeed({ links, accentHex }: Props) {
  const feed = links
    .flatMap(l => l.visits.map(v => ({ ...v, alias: l.alias })))
    .sort((a, b) => a.mins - b.mins)
    .slice(0, 8)

  return (
    <div className="bg-panel border border-line rounded-xl overflow-hidden">
      <div className="px-4 py-[11px] border-b border-line font-mono text-[11px] text-dm flex items-center gap-2">
        <span
          className="w-1.5 h-1.5 rounded-full animate-pulse-glow"
          style={{ background: accentHex }}
        />
        live access feed
      </div>
      <div className="py-1.5">
        {feed.map((e, i) => (
          <div key={i} className="flex items-baseline gap-[9px] px-4 py-2 font-mono text-[12px]">
            <span className="text-t3 flex-none w-[42px]">
              {ago(e.mins).replace(' ago', '')}
            </span>
            <span
              className="flex-none"
              style={{ color: e.result === 'blocked' ? '#e8615a' : accentHex }}
            >
              {e.result === 'blocked' ? '✗' : '✓'}
            </span>
            <span className="text-n9 leading-[1.4]">
              {(e.result === 'blocked' ? 'blocked ' : 'opened ') + '/' + e.alias + ' · ' + e.flag + ' ' + e.city}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
