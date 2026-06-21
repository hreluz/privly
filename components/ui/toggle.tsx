interface ToggleProps {
  on: boolean
  onClick: () => void
}

export function Toggle({ on, onClick }: ToggleProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-9 h-[21px] rounded-full flex-none relative transition-colors duration-200 cursor-pointer"
      style={{ background: on ? 'var(--accent)' : '#1d2722' }}
      aria-checked={on}
      role="switch"
    >
      <span
        className="absolute top-0.5 w-[17px] h-[17px] rounded-full transition-all duration-200"
        style={{
          left: on ? '17px' : '2px',
          background: on ? '#070a08' : '#6f8278',
        }}
      />
    </button>
  )
}
