'use client'

export function TagList({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, idx) => (
        <span
          key={idx}
          className="rounded-lg bg-blue-50 px-3 py-1 text-xs text-blue-600"
        >
          {tag}
        </span>
      ))}
    </div>
  )
}
