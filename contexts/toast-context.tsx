'use client'

import { createContext, useCallback, useContext, useRef, useState } from 'react'

interface ToastContextValue {
  fire: (msg: string) => void
}

const ToastContext = createContext<ToastContextValue>({ fire: () => {} })

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState<string | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const fire = useCallback((msg: string) => {
    setMessage(msg)
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setMessage(null), 2200)
  }, [])

  return (
    <ToastContext.Provider value={{ fire }}>
      {children}
      {message && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[10000] bg-panel3 border border-[var(--accent-dim)] text-[var(--accent)] font-mono text-[13px] px-[18px] py-[11px] rounded-[9px] shadow-[0_12px_40px_-10px_rgba(0,0,0,0.7)] flex items-center gap-[9px] animate-rise pointer-events-none">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
            <path d="M20 6 9 17l-5-5" />
          </svg>
          {message}
        </div>
      )}
    </ToastContext.Provider>
  )
}

export const useToast = () => useContext(ToastContext)
