'use client'

import { useParams } from 'next/navigation'
import { useLink } from '@/hooks/use-link'
import { useAccent } from '@/hooks/use-accent'
import { accentMap } from '@/lib/utils'
import { getLinkAnalytics } from '@/services/analytics'
import { AnalyticsHeader } from '@/components/analytics/analytics-header'
import { SummaryRow } from '@/components/analytics/summary-row'
import { OpensChart } from '@/components/analytics/opens-chart'
import { GeoBreakdown } from '@/components/analytics/geo-breakdown'
import { AccessLog } from '@/components/analytics/access-log'
import { use } from 'react'

export default function AnalyticsPage() {
  const { id } = useParams<{ id: string }>()
  const link = useLink(id)
  const { accent } = useAccent()
  const tokens = accentMap(accent)

  if (!link) {
    return (
      <div className="px-9 py-[30px]">
        <div className="font-mono text-[13px] text-dm">Link not found.</div>
      </div>
    )
  }

  const analytics = use(getLinkAnalytics(link))

  return (
    <div className="px-9 py-[30px] max-w-[1080px] w-full">
      <AnalyticsHeader link={link} />
      <SummaryRow items={analytics.summary} />

      <div className="grid grid-cols-[1.4fr_1fr] gap-[14px] mb-5">
        <OpensChart data={analytics.chart} />
        <GeoBreakdown data={analytics.geo} />
      </div>

      <AccessLog visits={analytics.visits} />
    </div>
  )
}
