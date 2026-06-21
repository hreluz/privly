'use client'

import Link from 'next/link'
import { CreateForm } from '@/components/create/create-form'

export default function CreatePage() {
  return (
    <div className="px-9 py-[30px] max-w-[1080px] w-full">
      <div className="font-mono text-[12px] text-dm mb-1.5 flex items-center gap-2">
        <Link href="/dashboard" className="cursor-pointer hover:text-tx transition-colors">
          ~/links
        </Link>
        {' '}/ new
      </div>
      <h1 className="font-mono font-bold text-[25px] tracking-[-0.8px] text-br m-0 mb-[26px]">
        Wrap a link
      </h1>
      <CreateForm />
    </div>
  )
}
