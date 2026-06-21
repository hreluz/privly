'use client'

import { IconLock, IconFire, IconLink } from '@/components/ui/icons'
import type { CreateLinkForm } from '@/lib/types'

interface Props {
  form: CreateLinkForm
  accentHex: string
  accentDim: string
  accentGlow: string
}

export function GatewayPreview({ form, accentHex, accentDim, accentGlow }: Props) {
  const alias = form.alias || 'your-link'

  const PreviewIcon = form.oneTime ? IconFire : form.usePassword ? IconLock : IconLink

  const title = form.oneTime
    ? 'One-time link'
    : form.usePassword
    ? 'Password required'
    : "You're being redirected"

  const sub = form.oneTime
    ? "This link burns after a single view. Open it only when you're ready."
    : form.usePassword
    ? 'This destination is protected. Enter the password to continue.'
    : 'Privly is forwarding you safely — no ads, no trackers, no wait.'

  const badges: string[] = []
  if (form.useLimit)  badges.push(`max ${form.limit || '∞'} opens`)
  if (form.useExpiry) badges.push(`expires ${form.expiry || 'soon'}`)
  if (form.useGeo)    badges.push(`geo: ${form.geo || 'restricted'}`)
  if (form.oneTime)   badges.push('one-time')
  if (badges.length === 0) badges.push('privacy-gated')

  return (
    <div className="sticky top-[30px]">
      <div className="font-mono text-[11px] text-dm uppercase tracking-[0.6px] mb-3">
        visitor preview
      </div>
      <div className="bg-panel border border-line2 rounded-[14px] overflow-hidden shadow-[0_24px_60px_-30px_rgba(0,0,0,0.8)]">
        <div className="flex items-center gap-[7px] px-[14px] py-[11px] border-b border-line">
          <span className="w-[9px] h-[9px] rounded-full bg-danger" />
          <span className="w-[9px] h-[9px] rounded-full bg-warn" />
          <span className="w-[9px] h-[9px] rounded-full" style={{ background: accentHex }} />
          <span className="ml-1.5 font-mono text-[11px] text-dm">privly.to/{alias}</span>
        </div>

        <div className="px-6 py-[30px] text-center">
          <div
            className="w-[52px] h-[52px] mx-auto mb-[18px] rounded-[14px] border flex items-center justify-center"
            style={{
              borderColor: accentDim,
              background: 'rgba(70,224,138,0.05)',
              color: accentHex,
              boxShadow: `0 0 24px ${accentGlow}`,
            }}
          >
            <PreviewIcon size={24} />
          </div>

          <div className="font-mono text-[15px] text-br font-semibold mb-2">{title}</div>
          <div className="text-[13px] text-m2 leading-[1.5] mb-[18px] max-w-[240px] mx-auto">{sub}</div>

          {form.usePassword && (
            <div className="bg-ink border border-line2 rounded-[9px] p-3 font-mono text-[14px] text-ft tracking-[4px] mb-3">
              ••••••••
            </div>
          )}

          <div
            className="font-mono text-[13px] text-ink p-[11px] rounded-[9px] font-semibold"
            style={{ background: accentHex }}
          >
            unlock →
          </div>

          {badges.length > 0 && (
            <div className="mt-[18px] flex flex-wrap gap-1.5 justify-center">
              {badges.map(b => (
                <span key={b} className="font-mono text-[10px] text-m2 border border-line2 bg-panel3 px-2 py-[3px] rounded-[5px]">
                  {b}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="font-mono text-[11px] text-ft text-center mt-[14px] leading-[1.6]">
        visitors see only what you allow.<br />nothing is logged to third parties.
      </div>
    </div>
  )
}
