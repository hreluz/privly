import { mockLinks } from '@/lib/mock-data'
import { ago } from '@/lib/utils'
import type { Link } from '@/lib/types'

export interface ChartPoint {
  label: string
  value: string
  h: number
}

export interface GeoPoint {
  name: string
  count: string
  pct: number
}

export interface VisitRow {
  time: string
  flag: string
  location: string
  ip: string
  device: string
  result: string
  resultColor: string
  resultGlyph: string
}

export interface LinkAnalytics {
  chart: ChartPoint[]
  geo: GeoPoint[]
  visits: VisitRow[]
  summary: { label: string; value: string; color: string }[]
}

export async function getLinkAnalytics(link: Link): Promise<LinkAnalytics> {
  const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
  const dmax = Math.max(1, ...link.daily)

  const chart: ChartPoint[] = link.daily.map((d, i) => ({
    value: String(d),
    h: Math.round((d / dmax) * 100),
    label: days[i],
  }))

  const geoMap: Record<string, number> = {}
  const flagOf: Record<string, string> = {}
  link.visits.forEach(v => {
    geoMap[v.country] = (geoMap[v.country] || 0) + 1
    flagOf[v.country] = v.flag
  })
  const gmax = Math.max(1, ...Object.values(geoMap))
  const geo: GeoPoint[] = Object.entries(geoMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([name, count]) => ({
      name: (flagOf[name] || '') + ' ' + name,
      count: String(count),
      pct: Math.round((count / gmax) * 100),
    }))

  const visits: VisitRow[] = link.visits.map(v => ({
    time: ago(v.mins),
    flag: v.flag,
    location: v.city + ', ' + v.cc,
    ip: v.ip,
    device: v.device,
    result: v.result === 'blocked' ? 'blocked' : 'opened',
    resultColor: v.result === 'blocked' ? '#e8615a' : '#46e08a',
    resultGlyph: v.result === 'blocked' ? '✗' : '✓',
  }))

  const blocked = link.visits.filter(v => v.result === 'blocked').length
  const countries = [...new Set(link.visits.map(v => v.country))]

  const summary = [
    { label: 'total opens',      value: String(link.used),           color: '#eafff2' },
    { label: 'unique visitors',  value: String(link.visits.length),   color: '#eafff2' },
    { label: 'countries',        value: String(countries.length),     color: '#eafff2' },
    { label: 'blocked',          value: String(blocked),              color: blocked > 0 ? '#e8615a' : '#eafff2' },
  ]

  return { chart, geo, visits, summary }
}

export interface FeedEntry {
  time: string
  glyph: string
  color: string
  text: string
}

export async function getLiveFeed(): Promise<FeedEntry[]> {
  const raw = mockLinks
    .flatMap(l => l.visits.map(v => ({ ...v, alias: l.alias })))
    .sort((a, b) => a.mins - b.mins)
    .slice(0, 8)

  return raw.map(e => ({
    time: ago(e.mins).replace(' ago', ''),
    glyph: e.result === 'blocked' ? '✗' : '✓',
    color: e.result === 'blocked' ? '#e8615a' : '#46e08a',
    text: (e.result === 'blocked' ? 'blocked ' : 'opened ') + '/' + e.alias + ' · ' + e.flag + ' ' + e.city,
  }))
}
