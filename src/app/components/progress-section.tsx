'use client'

import { UserFillIcon } from '@/components/icons'
import { cn } from '@/lib/utils'

export function ProgressSection({
  rate,
  current,
  target,
}: {
  rate: number
  current: number
  target: number
}) {
  const clamped = Math.max(0, Math.min(100, Math.round(rate)))
  const fillColor = clamped < 50 ? 'bg-fill-secondary' : 'bg-fill-primary' // < 50%: secondary, >= 50%: primary

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs text-gray-600">
        <span className="text-label-6 font-label-6 leading-label-6 text-text-default">
          <span className="text-label-4 font-label-4 leading-label-4 text-text-strong">
            {clamped}
          </span>
          %
        </span>
        <div className="flex items-center">
          <UserFillIcon className="w-4 fill-fill-deep" />
          <span className="text-label-8 font-label-8 leading-label-8 tracking-label-8 text-text-default">
            {current}
          </span>
          <span className="text-label-8 font-label-8 leading-label-8 tracking-label-8 text-text-subtle">
            /{target}
          </span>
        </div>
      </div>

      <div className="h-3 w-full overflow-hidden rounded-sm bg-fill-default">
        <div
          className={cn(
            'h-full rounded-full transition-[width] duration-300 ease-out',
            fillColor,
          )}
          style={{ width: `${clamped}%` }}
          role="progressbar"
          aria-valuenow={clamped}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  )
}
