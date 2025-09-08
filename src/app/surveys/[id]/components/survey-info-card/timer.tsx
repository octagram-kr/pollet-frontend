'use client'

import { useEffect, useState } from 'react'
import { TimeIcon } from '@/components/icons'

export default function Timer({ closingAt }: { closingAt: string }) {
  const [remain, setRemain] = useState<string>('')

  useEffect(() => {
    const tick = () => {
      const end = new Date(closingAt).getTime()
      const now = Date.now()
      const ms = Math.max(end - now, 0)
      const m = Math.floor(ms / 60000) % 60
      const h = Math.floor(ms / 3600000)
      setRemain(`${h}시간 ${m}분 남음`)
    }
    tick()
    const t = setInterval(tick, 1000 * 30)
    return () => clearInterval(t)
  }, [closingAt])

  return (
    <span className="inline-flex items-center rounded-full bg-[#FFF5F5] px-2.5 py-1 text-xs font-semibold text-[#E0565B]">
      <TimeIcon />
      {remain}
    </span>
  )
}
