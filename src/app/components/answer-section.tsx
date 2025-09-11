'use client'

export function AnswerSection({
  items,
  className = '',
}: {
  items: string[]
  className?: string
}) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {items.slice(0, 4).map((a, i) => (
        <span
          key={i}
          className="rounded-xs border border-stroke-subtle strokesub px-3 py-0.5 text-body-6 font-body-6 leading-body-6 tracking-body-6 text-text-default"
        >
          {a}
        </span>
      ))}
    </div>
  )
}
