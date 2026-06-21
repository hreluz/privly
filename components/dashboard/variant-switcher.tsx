import { IconTable, IconCards, IconTerm } from '@/components/ui/icons'

export type Variant = 'table' | 'cards' | 'console'

interface Props {
  active: Variant
  onChange: (v: Variant) => void
  accentHex: string
}

const VARIANTS: { key: Variant; label: string; Icon: React.FC<{ size?: number }> }[] = [
  { key: 'table',   label: 'table',   Icon: IconTable },
  { key: 'cards',   label: 'cards',   Icon: IconCards },
  { key: 'console', label: 'console', Icon: IconTerm  },
]

export function VariantSwitcher({ active, onChange, accentHex }: Props) {
  return (
    <div className="flex items-center gap-1 bg-panel border border-line rounded-[9px] p-[3px]">
      {VARIANTS.map(({ key, label, Icon }) => {
        const on = key === active
        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            className="flex items-center gap-1.5 font-mono text-[12px] px-[11px] py-1.5 rounded-md cursor-pointer transition-colors"
            style={{
              color:      on ? '#070a08' : '#7a8b81',
              background: on ? accentHex  : 'transparent',
            }}
          >
            <Icon size={13} />
            {label}
          </button>
        )
      })}
    </div>
  )
}
