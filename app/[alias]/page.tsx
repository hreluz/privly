import { notFound } from 'next/navigation'
import { getGatewayInfo } from '@/services/gateway'
import { GatewayCard } from '@/components/gateway/gateway-card'
import { BlockedCard } from '@/components/gateway/blocked-card'

const BLOCKED_STATUSES = ['expired', 'limit', 'burned']

export default async function GatewayPage({
  params,
}: {
  params: Promise<{ alias: string }>
}) {
  const { alias } = await params
  const link = await getGatewayInfo(alias)

  if (!link) notFound()

  if (BLOCKED_STATUSES.includes(link.status)) {
    return <BlockedCard link={link} />
  }

  return <GatewayCard link={link} />
}
