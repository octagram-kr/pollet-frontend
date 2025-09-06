'use client'

import { cn } from '@/lib/utils'
import FilterCard, { FilterCardIcon } from './filter-card'

export default function FilterSection({
  cards,
  onAnyCardClick,
  className,
}: {
  cards: { icon: FilterCardIcon; title: string }[]
  onAnyCardClick: () => void
  className?: string
}) {
  return (
    <div className={cn('w-fit grid grid-cols-3 gap-17', className)}>
      {cards.map((c, i) => (
        <FilterCard
          key={`${c.icon}-${i}`}
          icon={c.icon}
          title={c.title}
          onClick={onAnyCardClick}
        />
      ))}
    </div>
  )
}
