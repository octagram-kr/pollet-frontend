'use client'

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
        className="rounded-full px-3 py-1 text-xs font-semibold shadow-sm bg-gray-300 text-black"
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
        'rounded-full px-3 py-1 text-xs font-semibold shadow-sm',
        isOver ? 'bg-gray-200 text-gray-600' : 'bg-gray-300 text-black',
      ].join(' ')}
      aria-live="polite"
    >
      {isOver ? '마감' : formatted}
    </span>
  )
}
