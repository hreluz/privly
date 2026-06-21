import { LinksProvider } from '@/contexts/links-context'
import { AppShell } from '@/components/layout/app-shell'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <LinksProvider>
      <AppShell>{children}</AppShell>
    </LinksProvider>
  )
}
