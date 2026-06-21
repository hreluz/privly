import type { AccentName, AccentTokens, LinkStatus, StatusMeta } from './types'

export function ago(mins: number | null): string {
  if (mins == null) return '—'
  if (mins < 1) return 'now'
  if (mins < 60) return mins + 'm ago'
  if (mins < 1440) return Math.round(mins / 60) + 'h ago'
  return Math.round(mins / 1440) + 'd ago'
}

export function statusMeta(status: LinkStatus): StatusMeta {
  const map: Record<LinkStatus, StatusMeta> = {
    active:  { label: 'active',     color: '#46e08a', bg: 'rgba(70,224,138,0.1)' },
    limit:   { label: 'limit hit',  color: '#e0b755', bg: 'rgba(224,183,85,0.1)' },
    expired: { label: 'expired',    color: '#e8615a', bg: 'rgba(232,97,90,0.1)' },
    burned:  { label: 'burned',     color: '#e8615a', bg: 'rgba(232,97,90,0.1)' },
    armed:   { label: 'armed',      color: '#8b9c92', bg: 'rgba(139,156,146,0.1)' },
  }
  return map[status] ?? map.active
}

export function accentMap(name: AccentName): AccentTokens {
  const map: Record<AccentName, AccentTokens> = {
    green:  { hex: '#46e08a', dim: 'rgba(70,224,138,0.18)',  glow: 'rgba(70,224,138,0.28)' },
    cyan:   { hex: '#3fd2e0', dim: 'rgba(63,210,224,0.18)',  glow: 'rgba(63,210,224,0.28)' },
    violet: { hex: '#9b8cf0', dim: 'rgba(155,140,240,0.18)', glow: 'rgba(155,140,240,0.28)' },
    amber:  { hex: '#e0b755', dim: 'rgba(224,183,85,0.18)',  glow: 'rgba(224,183,85,0.28)' },
  }
  return map[name] ?? map.green
}

export function barColor(status: LinkStatus, accentHex: string): string {
  if (status === 'limit') return '#e0b755'
  if (status === 'expired' || status === 'burned') return '#e8615a'
  return accentHex
}

export function accessPct(used: number, limit: number | null): number {
  if (!limit) return Math.min(100, used)
  return Math.min(100, Math.round((used / limit) * 100))
}

export function accessText(used: number, limit: number | null): string {
  return limit ? `${used} / ${limit}` : `${used} / ∞`
}
