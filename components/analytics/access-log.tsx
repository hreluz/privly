interface VisitRow {
  time: string
  flag: string
  location: string
  ip: string
  device: string
  result: string
  resultColor: string
  resultGlyph: string
}

interface Props {
  visits: VisitRow[]
}

export function AccessLog({ visits }: Props) {
  return (
    <div className="bg-panel border border-line rounded-xl overflow-hidden">
      <div className="px-[18px] py-[13px] border-b border-line font-mono text-[12px] text-sf flex items-center justify-between">
        <span>access log</span>
        <span className="text-[11px] text-dm">most recent first</span>
      </div>
      <div className="grid grid-cols-[0.9fr_1.4fr_1.1fr_1.4fr_0.9fr] gap-[14px] px-[18px] py-2.5 border-b border-linr font-mono text-[10px] text-dm uppercase tracking-[0.5px]">
        <div>time</div>
        <div>location</div>
        <div>ip</div>
        <div>device</div>
        <div>result</div>
      </div>
      {visits.map((v, i) => (
        <div
          key={i}
          className="grid grid-cols-[0.9fr_1.4fr_1.1fr_1.4fr_0.9fr] gap-[14px] px-[18px] py-[13px] border-b border-linr items-center font-mono text-[12px]"
        >
          <div className="text-m2">{v.time}</div>
          <div className="text-tx">{v.flag} {v.location}</div>
          <div className="text-mu">{v.ip}</div>
          <div className="text-n9">{v.device}</div>
          <div>
            <span className="inline-flex items-center gap-[5px]" style={{ color: v.resultColor }}>
              {v.resultGlyph} {v.result}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
