'use client'

import { useEffect, useMemo, useState } from 'react'
import { cn } from '@/lib/utils'
import { TimeIcon } from '@/components/icons'

export default function CountdownBadge({
  endsAt, // ISO string or Date
  className,
}: {
  endsAt: string | Date
  className?: string
}) {
  const end = useMemo(() => new Date(endsAt).getTime(), [endsAt])
  const [now, setNow] = useState<number>(() => Date.now())

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [])

  const remain = Math.max(0, end - now)
  const expired = remain <= 0
  const hh = Math.floor(remain / 3_600_000)
  const mm = Math.floor((remain % 3_600_000) / 60_000)
  const ss = Math.floor((remain % 60_000) / 1000)
  const text = expired
    ? '마감'
    : [hh, mm, ss].map((v) => String(v).padStart(2, '0')).join(':')

  return (
    <span
      className={cn(
        'inline-flex items-center align-middle gap-1 rounded-xl border px-2 text-label-5 font-label-5 leading-label-5 tracking-label-5',
        'backdrop-blur-sm',
        expired
          ? 'border-stroke-subtle bg-fill-subtle text-text-subtle'
          : 'border-stroke-subtle bg-fill-white text-text-default',
        className,
      )}
    >
      {/* 시계 아이콘 */}
      <TimeIcon className="size-5 fill-fill-strong" />
      {text}
    </span>
  )
}
