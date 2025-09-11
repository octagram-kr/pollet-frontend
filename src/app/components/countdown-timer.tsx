'use client'

import { TimeIcon } from '@/components/icons'
import { useEffect, useMemo, useState } from 'react'

export function CountdownTimer({ until }: { until: string | Date }) {
  const target = useMemo(() => new Date(until).getTime(), [until])
  const invalid = Number.isNaN(target)

  const [left, setLeft] = useState<number | null>(null)

  useEffect(() => {
    if (invalid) {
      setLeft(0)
      return
    }

    const calc = () => target - Date.now()

    // 첫 계산: 클라이언트에서만
    setLeft(calc())

    if (calc() <= 0) return

    const id = setInterval(() => {
      const next = calc()
      setLeft(next <= 0 ? 0 : next)
      if (next <= 0) clearInterval(id)
    }, 1000)

    return () => clearInterval(id)
  }, [target, invalid])

  // left가 null이면 아직 클라이언트에서 렌더링 전
  if (left === null)
    return (
      <span
        className="rounded-xl px-2 text-label-5 font-label-5 tracking-label-5 text-text-default"
        aria-live="polite"
        style={{ visibility: 'hidden' }}
        suppressHydrationWarning
      >
        00:00:00
      </span>
    )

  const totalSec = Math.max(0, Math.floor(left / 1000))
  const h = Math.floor(totalSec / 3600)
  const m = Math.floor((totalSec % 3600) / 60)
  const s = totalSec % 60
  const formatted = `${h.toString().padStart(2, '0')}:${m
    .toString()
    .padStart(2, '0')}:${s.toString().padStart(2, '0')}`

  const isOver = invalid || left <= 0

  return (
    <span
      className={[
        'flex gap-1 rounded-xl px-2 text-label-5 font-label-5 tracking-label-5 border border-stroke-subtle bg-fill-white',
        isOver ? ' text-gray-600' : 'text-text-default',
      ].join(' ')}
      aria-live="polite"
    >
      <TimeIcon className="w-[18px]" />
      {isOver ? '마감' : formatted}
    </span>
  )
}
