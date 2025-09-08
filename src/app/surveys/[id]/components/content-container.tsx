import { ReactNode } from 'react'

export default function ContentContainer({
  left,
  right,
}: {
  left: ReactNode
  right: ReactNode
}) {
  return (
    <section className="grid grid-cols-[1.05fr_1.2fr]">
      {left}
      {right}
    </section>
  )
}
