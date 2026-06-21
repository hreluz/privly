'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { IconArrow } from '@/components/ui/icons'
import { AccessControlRow } from './access-control-row'
import { GatewayPreview } from './gateway-preview'
import { useLinks } from '@/hooks/use-links'
import { useToast } from '@/hooks/use-toast'
import { useAccent } from '@/hooks/use-accent'
import { accentMap } from '@/lib/utils'
import type { CreateLinkForm } from '@/lib/types'

function blankForm(): CreateLinkForm {
  return {
    destination: '',
    alias: '',
    usePassword: false,
    password: '',
    useLimit: false,
    limit: '100',
    useExpiry: false,
    expiry: '14 days',
    oneTime: false,
    useGeo: false,
    geo: 'US, CA, GB',
    notify: true,
  }
}

export function CreateForm() {
  const router = useRouter()
  const { createLink } = useLinks()
  const { fire } = useToast()
  const { accent } = useAccent()
  const tokens = accentMap(accent)

  const [form, setForm] = useState<CreateLinkForm>(blankForm)

  function set<K extends keyof CreateLinkForm>(key: K, val: CreateLinkForm[K]) {
    setForm(f => ({ ...f, [key]: val }))
  }

  function toggle<K extends keyof CreateLinkForm>(key: K) {
    setForm(f => ({ ...f, [key]: !f[key] }))
  }

  function handleCreate() {
    const link = createLink(form)
    fire('link created · privly.to/' + link.alias)
    router.push('/dashboard')
  }

  const controls: {
    title: string; desc: string; toggleKey: keyof CreateLinkForm
    inputKey?: keyof CreateLinkForm; placeholder?: string
  }[] = [
    { title: 'Password protection', desc: 'require a secret before redirect',      toggleKey: 'usePassword', inputKey: 'password', placeholder: 'enter a password' },
    { title: 'Access limit',        desc: 'auto-disable after N opens',            toggleKey: 'useLimit',    inputKey: 'limit',    placeholder: '100' },
    { title: 'Expiry',              desc: 'stop working after a set time',         toggleKey: 'useExpiry',   inputKey: 'expiry',   placeholder: '14 days' },
    { title: 'One-time view',       desc: 'burn the link after the first open',    toggleKey: 'oneTime' },
    { title: 'Geo restriction',     desc: 'allow only selected countries',         toggleKey: 'useGeo',      inputKey: 'geo',      placeholder: 'US, CA, GB' },
    { title: 'Email on access',     desc: 'notify me when someone opens it',       toggleKey: 'notify' },
  ]

  return (
    <div className="grid grid-cols-[1fr_0.82fr] gap-7 items-start">
      <div className="flex flex-col gap-5">
        <div>
          <label className="font-mono text-[12px] text-sf block mb-2">destination url</label>
          <input
            value={form.destination}
            onChange={e => set('destination', e.target.value)}
            placeholder="https://drive.google.com/file/d/..."
            className="w-full bg-panel border border-line2 rounded-[9px] px-[14px] py-[13px] text-br font-mono text-[13px] outline-none focus:border-[var(--accent)] transition-colors"
          />
        </div>

        <div>
          <label className="font-mono text-[12px] text-sf block mb-2">custom alias</label>
          <div className="flex items-center bg-panel border border-line2 rounded-[9px] overflow-hidden focus-within:border-[var(--accent)] transition-colors">
            <span className="font-mono text-[13px] text-dm pl-[14px] py-[13px]">privly.to/</span>
            <input
              value={form.alias}
              onChange={e => set('alias', e.target.value)}
              placeholder="q4-report"
              className="flex-1 bg-transparent border-none py-[13px] pr-[14px] pl-0.5 font-mono text-[13px] outline-none"
              style={{ color: tokens.hex }}
            />
          </div>
        </div>

        <div className="border-t border-ling pt-1.5 font-mono text-[11px] text-dm uppercase tracking-[0.6px]">
          access controls
        </div>

        {controls.map(c => (
          <AccessControlRow
            key={c.toggleKey}
            title={c.title}
            desc={c.desc}
            on={!!form[c.toggleKey]}
            onToggle={() => toggle(c.toggleKey)}
            inputValue={c.inputKey ? String(form[c.inputKey] ?? '') : undefined}
            placeholder={c.placeholder}
            onInput={c.inputKey ? val => set(c.inputKey!, val as never) : undefined}
            accentHex={tokens.hex}
          />
        ))}

        <button
          onClick={handleCreate}
          className="flex items-center justify-center gap-[9px] font-mono text-[14px] font-semibold text-ink p-[14px] rounded-[10px] cursor-pointer mt-1 hover:brightness-110 transition-all"
          style={{ background: tokens.hex, boxShadow: `0 0 22px ${tokens.glow}` }}
        >
          <IconArrow size={16} /> create gated link
        </button>
      </div>

      <GatewayPreview
        form={form}
        accentHex={tokens.hex}
        accentDim={tokens.dim}
        accentGlow={tokens.glow}
      />
    </div>
  )
}
