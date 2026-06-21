'use client'

import Link from 'next/link'
import { IdentityCard } from '@/components/settings/identity-card'
import { AccentPicker } from '@/components/settings/accent-picker'
import { PrivacyToggles } from '@/components/settings/privacy-toggles'
import { DangerZone } from '@/components/settings/danger-zone'

export default function SettingsPage() {
  return (
    <div className="px-9 py-[30px] max-w-[760px] w-full">
      <div className="font-mono text-[12px] text-dm mb-1.5">~/settings</div>
      <h1 className="font-mono font-bold text-[25px] tracking-[-0.8px] text-br m-0 mb-[26px]">
        Account
      </h1>

      <div className="flex flex-col gap-[14px]">
        <IdentityCard />
        <AccentPicker />
        <PrivacyToggles />
        <DangerZone />

        <Link
          href="/"
          className="font-mono text-[12px] text-mu p-2.5 text-center cursor-pointer hover:text-tx transition-colors"
        >
          $ sign out
        </Link>
      </div>
    </div>
  )
}
