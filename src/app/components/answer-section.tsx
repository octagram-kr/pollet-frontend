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
          className="rounded-sm border px-3 py-1 text-xs text-gray-700"
        >
          {a}
        </span>
      ))}
    </div>
  )
}
