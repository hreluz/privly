interface ChartPoint {
  label: string
  value: string
  h: number
}

interface Props {
  data: ChartPoint[]
}

export function OpensChart({ data }: Props) {
  return (
    <div className="bg-panel border border-line rounded-xl p-[18px]">
      <div className="font-mono text-[12px] text-sf mb-[18px]">opens · last 7 days</div>
      <div className="flex items-end gap-2.5 h-[130px]">
        {data.map((d, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
            <div className="font-mono text-[11px] text-m2">{d.value}</div>
            <div
              className="w-full rounded-t-[4px] min-h-[4px]"
              style={{
                height: `${d.h}%`,
                background: 'linear-gradient(180deg,var(--accent),rgba(70,224,138,0.25))',
              }}
            />
            <div className="font-mono text-[10px] text-dm">{d.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
