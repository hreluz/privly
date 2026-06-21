interface GeoPoint {
  name: string
  count: string
  pct: number
}

interface Props {
  data: GeoPoint[]
}

export function GeoBreakdown({ data }: Props) {
  return (
    <div className="bg-panel border border-line rounded-xl p-[18px]">
      <div className="font-mono text-[12px] text-sf mb-[18px]">top locations</div>
      <div className="flex flex-col gap-[13px]">
        {data.map((g, i) => (
          <div key={i}>
            <div className="flex justify-between font-mono text-[12px] mb-[5px]">
              <span className="text-tx">{g.name}</span>
              <span className="text-m2">{g.count}</span>
            </div>
            <div className="h-[5px] bg-line rounded-[3px] overflow-hidden">
              <div
                className="h-full rounded-[3px]"
                style={{ width: `${g.pct}%`, background: 'var(--accent)' }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
