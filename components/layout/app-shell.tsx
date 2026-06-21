'use client'

import { useAccent } from '@/hooks/use-accent'
import { Sidebar } from './sidebar'

export function AppShell({ children }: { children: React.ReactNode }) {
  const { scanlines } = useAccent()

  return (
    <div className="relative min-h-screen overflow-x-hidden font-sans text-tx" style={{ background: '#070a08' }}>
      {scanlines && (
        <div
          className="pointer-events-none fixed inset-0 z-[9999] opacity-50 mix-blend-multiply"
          style={{
            background:
              'repeating-linear-gradient(0deg,rgba(0,0,0,0)0px,rgba(0,0,0,0)2px,rgba(0,0,0,0.16)3px,rgba(0,0,0,0)4px)',
          }}
        />
      )}
      <div className="flex min-h-screen relative z-[1]">
        <Sidebar />
        <main className="flex-1 min-w-0 flex flex-col">{children}</main>
      </div>
    </div>
  )
}
