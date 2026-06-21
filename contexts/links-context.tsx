'use client'

import { createContext, useCallback, useContext, useState } from 'react'
import { mockLinks } from '@/lib/mock-data'
import type { CreateLinkForm, Link } from '@/lib/types'

interface LinksContextValue {
  links: Link[]
  createLink: (form: CreateLinkForm) => Link
  revokeLink: (id: string) => void
}

const LinksContext = createContext<LinksContextValue>({
  links: [],
  createLink: () => ({} as Link),
  revokeLink: () => {},
})

export function LinksProvider({ children }: { children: React.ReactNode }) {
  const [links, setLinks] = useState<Link[]>(mockLinks)

  const createLink = useCallback((form: CreateLinkForm): Link => {
    const alias = (form.alias || 'link-' + Math.random().toString(36).slice(2, 7))
      .replace(/[^a-z0-9-]/gi, '-')
      .toLowerCase()
    const link: Link = {
      id: 'lk' + Date.now(),
      alias,
      destination: form.destination || 'https://example.com/your-file',
      password: form.usePassword ? (form.password || '••••') : null,
      limit: form.useLimit ? parseInt(form.limit) || 100 : null,
      used: 0,
      expiry: form.useExpiry ? 'in ' + (form.expiry || '14 days') : 'no expiry',
      oneTime: form.oneTime,
      geo: form.useGeo ? (form.geo || 'US') : null,
      notify: form.notify,
      status: form.oneTime ? 'armed' : 'active',
      daily: [0, 0, 0, 0, 0, 0, 0],
      visits: [],
    }
    setLinks(prev => [link, ...prev])
    return link
  }, [])

  const revokeLink = useCallback((id: string) => {
    setLinks(prev => prev.filter(l => l.id !== id))
  }, [])

  return (
    <LinksContext.Provider value={{ links, createLink, revokeLink }}>
      {children}
    </LinksContext.Provider>
  )
}

export const useLinksContext = () => useContext(LinksContext)
