import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type TextRow = {
  label: string
  value: ReactNode
  className?: string
}

type PeriodRow = {
  label: string
  from: string
  to: string
  className?: string
}

type Props = TextRow | PeriodRow

export default function InfoRow(props: Props) {
  const isPeriod = 'from' in props && 'to' in props

  return (
    <div className={cn('flex items-center gap-4', props.className)}>
      <div className="w-[128px] flex items-center">
        <span className="text-body-4 font-body-4 leading-body-4 tracking-body-4 text-text-strong">
          {props.label}
        </span>
      </div>

      <div className="text-body-6 font-body-6 leading-body-6 tracking-body-6 text-text-default">
        {isPeriod ? `${props.from} ~ ${props.to}` : props.value}
      </div>
    </div>
  )
}
