'use client'

import { useToast } from '@/hooks/use-toast'

export function DangerZone() {
  const { fire } = useToast()

  return (
    <div className="bg-[rgba(232,97,90,0.04)] border border-[rgba(232,97,90,0.2)] rounded-xl p-5">
      <div className="font-mono text-[13px] text-danger mb-1.5">danger zone</div>
      <div className="text-[12px] text-sf mb-4 leading-[1.5]">
        Purge all links and visit logs, or delete your account. These actions cannot be
        undone — privly keeps no backups of your data.
      </div>
      <div className="flex gap-2.5 flex-wrap">
        <button
          onClick={() => fire('all logs purged')}
          className="font-mono text-[12px] text-danger border border-[rgba(232,97,90,0.3)] px-[14px] py-[9px] rounded-lg cursor-pointer hover:bg-[rgba(232,97,90,0.1)] transition-colors"
        >
          purge all logs
        </button>
        <button
          onClick={() => fire('account deletion requested')}
          className="font-mono text-[12px] text-danger border border-[rgba(232,97,90,0.3)] px-[14px] py-[9px] rounded-lg cursor-pointer hover:bg-[rgba(232,97,90,0.1)] transition-colors"
        >
          delete account
        </button>
      </div>
    </div>
  )
}
