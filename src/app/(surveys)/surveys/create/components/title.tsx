import { ReactNode } from 'react'

export default function Title({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-heading-2 leading-heading-2 font-heading-2 tracking-heading-2 text-text-default">
      {children}
    </h2>
  )
}
