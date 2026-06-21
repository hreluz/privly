interface SummaryItem {
  label: string
  value: string
  color: string
}

interface Props {
  items: SummaryItem[]
}

export function SummaryRow({ items }: Props) {
  return (
    <div className="grid grid-cols-4 gap-[14px] mb-5">
      {items.map(s => (
        <div key={s.label} className="bg-panel border border-line rounded-xl p-[17px]">
          <div className="font-mono text-[11px] text-mu mb-[11px] uppercase tracking-[0.5px]">
            {s.label}
          </div>
          <div className="font-mono font-bold text-[24px] tracking-[-1px]" style={{ color: s.color }}>
            {s.value}
          </div>
        </div>
      ))}
    </div>
  )
}
