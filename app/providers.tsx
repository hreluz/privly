'use client'

import { AccentProvider } from '@/contexts/accent-context'
import { ToastProvider } from '@/contexts/toast-context'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AccentProvider>
      <ToastProvider>
        {children}
      </ToastProvider>
    </AccentProvider>
  )
}
