'use client'

import { useAccent } from '@/hooks/use-accent'
import { accentMap } from '@/lib/utils'
import { Toggle } from '@/components/ui/toggle'
import type { AccentName } from '@/lib/types'

const ACCENTS: { name: AccentName; label: string }[] = [
  { name: 'green',  label: 'green' },
  { name: 'cyan',   label: 'cyan' },
  { name: 'violet', label: 'violet' },
  { name: 'amber',  label: 'amber' },
]

export function AccentPicker() {
  const { accent, setAccent, scanlines, setScanlines } = useAccent()

  return (
    <div className="bg-panel border border-line rounded-xl p-5">
      <div className="font-mono text-[13px] text-br mb-1.5">appearance</div>
      <div className="text-[12px] text-mu mb-4">accent color and display options</div>

      <div className="flex items-center gap-3 mb-5">
        {ACCENTS.map(a => {
          const tokens = accentMap(a.name)
          const on = accent === a.name
          return (
            <button
              key={a.name}
              onClick={() => setAccent(a.name)}
              className="flex flex-col items-center gap-1.5 cursor-pointer"
            >
              <div
                className="w-8 h-8 rounded-full border-[2px] transition-all"
                style={{
                  background: tokens.hex,
                  borderColor: on ? '#eafff2' : 'transparent',
                  boxShadow: on ? `0 0 12px ${tokens.glow}` : 'none',
                }}
              />
              <span className="font-mono text-[10px]" style={{ color: on ? '#eafff2' : '#5b6b62' }}>
                {a.label}
              </span>
            </button>
          )
        })}
      </div>

      <div className="flex items-center gap-[13px] py-3 border-t border-linr cursor-pointer" onClick={() => setScanlines(!scanlines)}>
        <Toggle on={scanlines} onClick={() => setScanlines(!scanlines)} />
        <div className="flex-1">
          <div className="text-[13px] text-tx">CRT scanlines</div>
          <div className="text-[12px] text-mu mt-0.5">retro overlay effect on all screens</div>
        </div>
      </div>
    </div>
  )
}
