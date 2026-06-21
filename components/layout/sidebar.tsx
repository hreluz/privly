'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { IconGrid, IconPlus, IconChart, IconGear, IconLogout } from '@/components/ui/icons'
import { useAccent } from '@/hooks/use-accent'
import { useAuth } from '@/hooks/use-auth'
import { accentMap } from '@/lib/utils'

const NAV_ITEMS = [
  { key: 'dashboard', label: 'dashboard', href: '/dashboard',          Icon: IconGrid  },
  { key: 'create',    label: 'new link',  href: '/dashboard/create',   Icon: IconPlus  },
  { key: 'analytics', label: 'analytics', href: '/dashboard',          Icon: IconChart },
  { key: 'settings',  label: 'settings',  href: '/settings',           Icon: IconGear  },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { accent } = useAccent()
  const tokens = accentMap(accent)
  const { currentUser, logout } = useAuth()

  async function handleLogout() {
    await logout()
    router.push('/login')
  }

  const displayName = currentUser?.name ?? 'kael.r'
  const displayEmail = currentUser?.email ?? 'kael@proton.me'
  const avatarLetter = displayName.charAt(0).toLowerCase()

  function isActive(key: string) {
    if (key === 'analytics') return pathname.startsWith('/dashboard/links/')
    if (key === 'dashboard')  return pathname === '/dashboard'
    if (key === 'create')     return pathname === '/dashboard/create'
    if (key === 'settings')   return pathname === '/settings'
    return false
  }

  return (
    <div className="w-[236px] flex-none border-r border-line bg-panel2 flex flex-col sticky top-0 h-screen">
      <Link
        href="/"
        className="flex items-center gap-2.5 font-mono font-bold text-[16px] tracking-[-0.5px] text-br p-5 cursor-pointer hover:opacity-80"
      >
        <div
          className="w-6 h-6 rounded-[7px] border-[1.5px] flex items-center justify-center"
          style={{ borderColor: tokens.hex, color: tokens.hex, boxShadow: `0 0 12px ${tokens.glow}` }}
        >
          <IconLockSmall />
        </div>
        privly
      </Link>

      <nav className="px-3 py-1.5 flex flex-col gap-0.5">
        {NAV_ITEMS.map(({ key, label, href, Icon }) => {
          const active = isActive(key)
          return (
            <Link
              key={key}
              href={href}
              className="flex items-center gap-[11px] px-3 py-[9px] rounded-lg cursor-pointer font-mono text-[13px] hover:text-tx transition-colors"
              style={{
                color: active ? '#eafff2' : '#6f8278',
                background: active ? 'rgba(70,224,138,0.07)' : 'transparent',
              }}
            >
              <span className="w-[15px] flex" style={{ color: active ? tokens.hex : '#5b6b62' }}>
                <Icon size={15} />
              </span>
              {label}
            </Link>
          )
        })}
      </nav>

      <div className="mt-auto p-3.5">
        <div className="bg-panel3 border border-line rounded-[10px] p-[13px]">
          <div className="font-mono text-[11px] text-dm mb-2">PLAN · PRO</div>
          <div className="h-[5px] bg-line rounded-[3px] overflow-hidden mb-2">
            <div className="h-full w-[62%] rounded-[3px]" style={{ background: tokens.hex }} />
          </div>
          <div className="font-mono text-[11px] text-m2">62 / 100 links</div>
        </div>
        <div className="flex items-center gap-1 mt-3">
          <Link
            href="/settings"
            className="flex items-center gap-2.5 flex-1 px-1.5 py-2 rounded-lg cursor-pointer hover:bg-panel3 min-w-0"
          >
            <div
              className="w-[30px] h-[30px] rounded-lg border border-line4 flex-none flex items-center justify-center font-mono text-[12px]"
              style={{ background: 'linear-gradient(135deg,#1c2a23,#0e1411)', color: tokens.hex }}
            >
              {avatarLetter}
            </div>
            <div className="leading-[1.25] min-w-0">
              <div className="text-[12px] text-tx font-medium truncate">{displayName}</div>
              <div className="font-mono text-[10px] text-dm truncate">{displayEmail}</div>
            </div>
          </Link>
          <button
            onClick={handleLogout}
            title="sign out"
            className="p-2 rounded-lg text-dm hover:text-danger hover:bg-panel3 transition-colors flex-none cursor-pointer"
          >
            <IconLogout size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}

function IconLockSmall() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
      <rect x="4" y="10" width="16" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  )
}
