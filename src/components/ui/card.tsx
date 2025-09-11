import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function Card({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn('rounded-sm bg-fill-white px-4 py-3 shadow-sm', className)}
    >
      {children}
    </div>
  )
}
