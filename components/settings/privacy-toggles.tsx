'use client'

import { useState } from 'react'
import { Toggle } from '@/components/ui/toggle'
import { useAccent } from '@/hooks/use-accent'
import { accentMap } from '@/lib/utils'

const DEFAULTS = [
  { key: 's_notify', title: 'Email me on every access',         desc: 'get a ping the moment any link is opened',                     def: false },
  { key: 's_logip',  title: 'Store visitor IP fragments',       desc: 'keep partial IPs for analytics (auto-purged in 30d)',           def: true  },
  { key: 's_redir',  title: 'Show redirect confirmation',       desc: 'visitors see a confirm screen before forwarding',               def: true  },
  { key: 's_noind',  title: 'Hide links from search engines',   desc: 'add noindex so links never get crawled',                        def: true  },
]

export function PrivacyToggles() {
  const { accent } = useAccent()
  const tokens = accentMap(accent)
  const [state, setState] = useState<Record<string, boolean>>(
    Object.fromEntries(DEFAULTS.map(d => [d.key, d.def]))
  )

  function toggle(key: string) {
    setState(s => ({ ...s, [key]: !s[key] }))
  }

  return (
    <div className="bg-panel border border-line rounded-xl p-5">
      <div className="font-mono text-[13px] text-br mb-1.5">defaults &amp; privacy</div>
      <div className="text-[12px] text-mu mb-4">applied to every new link unless overridden</div>
      {DEFAULTS.map(d => (
        <div
          key={d.key}
          onClick={() => toggle(d.key)}
          className="flex items-center gap-[13px] py-3 border-b border-linr cursor-pointer"
        >
          <Toggle on={state[d.key]} onClick={() => toggle(d.key)} />
          <div className="flex-1">
            <div className="text-[13px] text-tx">{d.title}</div>
            <div className="text-[12px] text-mu mt-0.5">{d.desc}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
