interface StatCardProps {
  label: string
  value: string
  delta: string
  deltaColor: string
}

export function StatCard({ label, value, delta, deltaColor }: StatCardProps) {
  return (
    <div className="bg-panel border border-line rounded-xl p-[17px]">
      <div className="font-mono text-[11px] text-mu mb-[11px] uppercase tracking-[0.5px]">
        {label}
      </div>
      <div className="flex items-baseline gap-2">
        <div className="font-mono font-bold text-[26px] text-br tracking-[-1px]">{value}</div>
        <div className="font-mono text-[11px]" style={{ color: deltaColor }}>{delta}</div>
      </div>
    </div>
  )
}
