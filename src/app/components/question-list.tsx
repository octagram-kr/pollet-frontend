export function QuestionList({
  items,
  className = '',
}: {
  items: string[]
  className?: string
}) {
  return (
    <ul
      className={`space-y-1 rounded-lg bg-gray-50 p-3 text-sm text-gray-700 ${className}`}
    >
      {items.slice(0, 4).map((q, i) => (
        <li
          key={i}
          className="flex gap-2"
        >
          <span className="mt-0.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-400" />
          <span className="line-clamp-1">{q}</span>
        </li>
      ))}
    </ul>
  )
}
