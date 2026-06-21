'use client'

import { useEffect, useRef, useState } from 'react'
import type { GatewayPhase, Link } from '@/lib/types'

interface GatewayState {
  phase: GatewayPhase
  password: string
  error: string
  countdown: number
}

export function useGateway(link: Link) {
  const [state, setState] = useState<GatewayState>({
    phase: 'locked',
    password: '',
    error: '',
    countdown: 5,
  })
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  function setPassword(pw: string) {
    setState(s => ({ ...s, password: pw, error: '' }))
  }

  function submit() {
    if (link.password && state.password !== link.password) {
      setState(s => ({ ...s, error: 'incorrect password — 2 attempts left' }))
      return
    }
    setState(s => ({ ...s, phase: 'verifying', error: '' }))
    timerRef.current = setTimeout(() => {
      setState(s => ({ ...s, phase: 'unlocked', countdown: 5 }))
      intervalRef.current = setInterval(() => {
        setState(s => {
          if (s.countdown <= 1) {
            if (intervalRef.current) clearInterval(intervalRef.current)
            return { ...s, countdown: 0 }
          }
          return { ...s, countdown: s.countdown - 1 }
        })
      }, 1000)
    }, 1300)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') submit()
  }

  return { ...state, setPassword, submit, handleKeyDown }
}
