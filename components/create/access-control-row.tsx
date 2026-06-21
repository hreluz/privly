'use client'

import { Toggle } from '@/components/ui/toggle'

interface Props {
  title: string
  desc: string
  on: boolean
  onToggle: () => void
  inputValue?: string
  placeholder?: string
  onInput?: (val: string) => void
  accentHex: string
}

export function AccessControlRow({
  title,
  desc,
  on,
  onToggle,
  inputValue,
  placeholder,
  onInput,
  accentHex,
}: Props) {
  return (
    <div
      className="bg-panel border rounded-[10px] overflow-hidden transition-colors"
      style={{ borderColor: on ? '#243029' : '#16201b' }}
    >
      <div className="flex items-center gap-[13px] p-[14px] cursor-pointer" onClick={onToggle}>
        <Toggle on={on} onClick={onToggle} />
        <div className="flex-1">
          <div className="font-mono text-[13px] text-br">{title}</div>
          <div className="text-[12px] text-mu mt-0.5">{desc}</div>
        </div>
      </div>

      {on && onInput && (
        <div className="pl-[63px] pr-[14px] pb-[14px]">
          <input
            value={inputValue ?? ''}
            onChange={e => onInput(e.target.value)}
            placeholder={placeholder}
            className="w-full bg-ink border border-line2 rounded-lg px-3 py-2.5 text-br font-mono text-[13px] outline-none focus:border-[var(--accent)] transition-colors"
          />
        </div>
      )}
    </div>
  )
}
