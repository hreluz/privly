interface SparklineProps {
  data: number[]
  accentHex: string
}

export function Sparkline({ data, accentHex }: SparklineProps) {
  const max = Math.max(1, ...data)
  return (
    <div className="flex items-end gap-[3px] h-[42px]">
      {data.map((d, i) => (
        <div
          key={i}
          className="flex-1 rounded-[2px] min-h-[3px]"
          style={{
            height: `${Math.round((d / max) * 100)}%`,
            background: d > 0 ? accentHex : '#1a221d',
          }}
        />
      ))}
    </div>
  )
}
