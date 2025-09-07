'use client'

import { cn } from '@/lib/utils'
import { UserIcon, StarcandyIcon, ClockIcon } from '@/components/icons'

export type FilterCardIcon = 'user' | 'starcandy' | 'clock'

export default function FilterCard({
  icon,
  title,
  onClick,
  muted = false,
  className,
}: {
  icon: FilterCardIcon
  title: string
  onClick: () => void
  muted?: boolean
  className?: string
}) {
  const iconCls = cn(
    'h-19.5 w-19.5',
    muted ? 'fill-fill-active' : 'fill-fill-primary',
  )
  return (
    <button
      type="button"
      onClick={onClick}
      aria-haspopup="dialog"
      aria-label={`${title} 필터 열기`}
      className={cn(
        'w-[220px] flex flex-col items-center justify-center gap-3 rounded-sm border-2 border-stroke-subtle bg-fill-white px-8 py-6 shadow-sm',
        'hover:bg-bg-subtle hover:cursor-pointer transition-colors',
        className,
      )}
    >
      {icon === 'user' && <UserIcon className={iconCls} />}
      {icon === 'starcandy' && <StarcandyIcon className={iconCls} />}
      {icon === 'clock' && <ClockIcon className={iconCls} />}
      <span className="text-label-4 font-label-4 leading-label-4 text-text-default">
        {title}
      </span>
    </button>
  )
}
