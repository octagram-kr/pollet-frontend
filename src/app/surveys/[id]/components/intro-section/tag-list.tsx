export default function TagList({ tags }: { tags: string[] }) {
  return (
    <div className="mt-3 justify-center flex flex-wrap gap-4.25">
      {tags.map((t) => (
        <span
          key={t}
          className="rounded-xl bg-fill-white px-4 py-0.5 text-label-2 font-label-2 text-text-default border border-stroke-subtle"
        >
          #{t}
        </span>
      ))}
    </div>
  )
}
