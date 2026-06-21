'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { accentMap } from '@/lib/utils'
import type { AccentName } from '@/lib/types'

interface AccentContextValue {
  accent: AccentName
  setAccent: (name: AccentName) => void
  scanlines: boolean
  setScanlines: (on: boolean) => void
}

const AccentContext = createContext<AccentContextValue>({
  accent: 'green',
  setAccent: () => {},
  scanlines: true,
  setScanlines: () => {},
})

export function AccentProvider({ children }: { children: React.ReactNode }) {
  const [accent, setAccentState] = useState<AccentName>('green')
  const [scanlines, setScanlinesState] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('privly-accent') as AccentName | null
    const storedScanlines = localStorage.getItem('privly-scanlines')
    if (stored && ['green', 'cyan', 'violet', 'amber'].includes(stored)) {
      setAccentState(stored)
    }
    if (storedScanlines !== null) {
      setScanlinesState(storedScanlines === 'true')
    }
  }, [])

  useEffect(() => {
    const tokens = accentMap(accent)
    const root = document.documentElement
    root.style.setProperty('--accent', tokens.hex)
    root.style.setProperty('--accent-dim', tokens.dim)
    root.style.setProperty('--accent-glow', tokens.glow)
  }, [accent])

  function setAccent(name: AccentName) {
    setAccentState(name)
    localStorage.setItem('privly-accent', name)
  }

  function setScanlines(on: boolean) {
    setScanlinesState(on)
    localStorage.setItem('privly-scanlines', String(on))
  }

  return (
    <AccentContext.Provider value={{ accent, setAccent, scanlines, setScanlines }}>
      {children}
    </AccentContext.Provider>
  )
}

export const useAccent = () => useContext(AccentContext)
