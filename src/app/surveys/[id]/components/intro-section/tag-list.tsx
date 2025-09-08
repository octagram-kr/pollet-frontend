export default function TagList({ tags }: { tags: string[] }) {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {tags.map((t) => (
        <span
          key={t}
          className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
        >
          #{t}
        </span>
      ))}
    </div>
  )
}
