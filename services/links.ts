import { mockLinks } from '@/lib/mock-data'
import type { Link } from '@/lib/types'

export async function getLinks(): Promise<Link[]> {
  return mockLinks
}

export async function getLink(id: string): Promise<Link | undefined> {
  return mockLinks.find(l => l.id === id)
}

export async function getLinkByAlias(alias: string): Promise<Link | undefined> {
  return mockLinks.find(l => l.alias === alias)
}
