import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement> & { size?: number }

function icon(content: React.ReactNode, strokeWidth = 2) {
  return function Icon({ size = 24, className, ...props }: IconProps) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        className={className}
        {...props}
      >
        {content}
      </svg>
    )
  }
}

export const IconGrid = icon(
  <>
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </>
)

export const IconPlus = icon(<path d="M12 5v14M5 12h14" />, 2.2)

export const IconChart = icon(
  <>
    <path d="M3 3v18h18" />
    <path d="M7 14l3-3 3 3 5-6" />
  </>
)

export const IconGear = icon(
  <>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2v3M12 19v3M5 5l2 2M17 17l2 2M2 12h3M19 12h3M5 19l2-2M17 7l2-2" />
  </>
)

export const IconTable = icon(
  <>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M3 10h18M9 4v16" />
  </>
)

export const IconCards = icon(
  <>
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </>
)

export const IconTerm = icon(
  <>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M7 9l3 3-3 3M13 15h4" />
  </>
)

export const IconLock = icon(
  <>
    <rect x="4" y="10" width="16" height="11" rx="2" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
  </>
)

export const IconUnlock = icon(
  <>
    <rect x="4" y="10" width="16" height="11" rx="2" />
    <path d="M8 10V6a4 4 0 0 1 7.5-2" />
  </>
)

export const IconLink = icon(
  <>
    <path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1" />
    <path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" />
  </>
)

export const IconFire = icon(
  <>
    <path d="M12 2s4 4 4 8a4 4 0 0 1-8 0c0-1 .5-2 1-3 0 2 1 3 2 3s1-1 1-2c0-3 0-4 0-4Z" />
    <path d="M7 14a5 5 0 0 0 10 0c0-3-2-5-2-5" />
  </>
)

export const IconClock = icon(
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </>
)

export const IconBan = icon(
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="m5.5 5.5 13 13" />
  </>
)

export const IconGlobe = icon(
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
  </>
)

export const IconCopy = icon(
  <>
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M5 15V5a2 2 0 0 1 2-2h8" />
  </>
)

export const IconCheck = icon(<path d="M20 6 9 17l-5-5" />, 2.4)

export const IconEye = icon(
  <>
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </>
)

export const IconShield = icon(
  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
)

export const IconArrow = icon(<path d="M5 12h14M13 6l6 6-6 6" />, 2.6)
