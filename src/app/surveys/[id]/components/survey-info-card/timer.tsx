'use client'

import { useEffect, useMemo, useState } from 'react'
import { TimeIcon } from '@/components/icons'

type Props = { closingAt: string | number | Date }

export default function Timer({ closingAt }: Props) {
  const end = useMemo(() => new Date(closingAt).getTime(), [closingAt])
  const valid = Number.isFinite(end)

  const [text, setText] = useState<string>('00:00:00')

  // useEffect(() => {
  //   if (!valid) return
  //   const tick = () => setText(toHms(end))
  //   tick()
  //   const t = setInterval(tick, 1000)
  //   return () => clearInterval(t)
  // }, [end, valid])
  useEffect(() => {
    if (!valid) return
    const tick = () => {
      const next = toHms(end)
      setText(next)
      if (next === '00:00:00') {
        clearInterval(t)
      }
    }
    const t = setInterval(tick, 1000)
    tick()
    return () => clearInterval(t)
  }, [end, valid])

  if (!valid) return null

  return (
    <span
      className="absolute left-3 bottom-4 inline-flex items-center rounded-xl bg-fill-white border-2 border-stroke-subtle px-3 py-0.5"
      aria-live="polite"
      aria-label={text === '00:00:00' ? '마감' : `남은 시간 ${text}`}
    >
      <TimeIcon
        className="fill-fill-strong"
        aria-hidden="true"
      />
      <span
        className="ml-1 text-label-1 font-label-1 leading-label-1 tracking-label-1 text-text-default
      suppressHydrationWarning"
      >
        {text}
      </span>
    </span>
  )
}

function toHms(endMs: number) {
  const diff = Math.max(endMs - Date.now(), 0)
  const totalSeconds = Math.floor(diff / 1000)
  const h = Math.floor(totalSeconds / 3600)
  const m = Math.floor((totalSeconds % 3600) / 60)
  const s = totalSeconds % 60
  return `${pad2(h)}:${pad2(m)}:${pad2(s)}`
}

function pad2(n: number) {
  return String(n).padStart(2, '0')
}
