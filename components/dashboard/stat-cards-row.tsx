import { StatCard } from '@/components/ui/stat-card'
import type { Link } from '@/lib/types'

interface Props {
  links: Link[]
  accentHex: string
}

export function StatCardsRow({ links, accentHex }: Props) {
  const active   = links.filter(l => l.status === 'active' || l.status === 'armed').length
  const total    = links.reduce((a, l) => a + l.used, 0)
  const blocked  = links.reduce((a, l) => a + l.visits.filter(v => v.result === 'blocked').length, 0)

  const cards = [
    { label: 'active links',      value: String(active), delta: 'live',       deltaColor: accentHex },
    { label: 'total opens',       value: String(total),  delta: '+18 today',  deltaColor: '#7a8b81' },
    { label: 'unique visitors',   value: '34',           delta: '9 countries',deltaColor: '#7a8b81' },
    { label: 'blocked attempts',  value: String(blocked),delta: 'gated',      deltaColor: '#e8615a' },
  ]

  return (
    <div className="grid grid-cols-4 gap-[14px] mb-[26px]">
      {cards.map(c => <StatCard key={c.label} {...c} />)}
    </div>
  )
}
