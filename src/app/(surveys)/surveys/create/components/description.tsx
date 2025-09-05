import { ReactNode } from 'react'

export default function Description({ children }: { children: ReactNode }) {
  return (
    <p className="text-caption-3 font-caption-3 leading-caption-3 tracking-caption-3 text-text-subtle">
      {children}
    </p>
  )
}
