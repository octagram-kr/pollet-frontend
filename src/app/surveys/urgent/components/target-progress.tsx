'use client'

import { cn } from '@/lib/utils'
import { UserFillIcon } from '@/components/icons'

export default function TargetProgress({
  current,
  target,
  className,
}: {
  current: number
  target: number
  className?: string
}) {
  const pct = Math.max(
    0,
    Math.min(100, Math.round((current / Math.max(1, target)) * 100)),
  )

  return (
    <div className={className}>
      <div className="flex items-end justify-between">
        <div className="flex items-center text-label-4 font-label-4 leading-label-4 text-text-strong">
          {pct}
          <p className="text-label-6 font-label-6 leading-label-6">%</p>
        </div>
        <div className="inline-flex items-center text-label-8 font-label-8 leading-label-8 tracking-label-8">
          <UserFillIcon className="w-4 fill-fill-deep" />
          <p className="text-text-default">{current}</p>
          <p className="text-text-subtle">/{target}</p>
        </div>
      </div>

      <div className="h-3 w-full overflow-hidden rounded-sm bg-gray-100">
        <div
          className="h-full rounded-sm bg-mint-400 transition-[width]"
          style={{ width: `${pct}%` }}
          aria-hidden
        />
      </div>
    </div>
  )
}
