import { mockLinks } from '@/lib/mock-data'
import type { Link } from '@/lib/types'

export async function getGatewayInfo(alias: string): Promise<Link | undefined> {
  return mockLinks.find(l => l.alias === alias)
}

export async function verifyPassword(alias: string, password: string): Promise<boolean> {
  const link = mockLinks.find(l => l.alias === alias)
  if (!link) return false
  if (!link.password) return true
  return link.password === password
}
