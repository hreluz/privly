import { useLinksContext } from '@/contexts/links-context'
import type { Link } from '@/lib/types'

export function useLink(id: string): Link | undefined {
  const { links } = useLinksContext()
  return links.find(l => l.id === id)
}
