export default function Duration({ minutes }: { minutes: number }) {
  return (
    <span className="absolute right-3 top-4 inline-flex items-center rounded-xl bg-fill-white border border-stroke-subtle px-3 py-0.5 text-text-default">
      <span className="text-label-1 font-label-1 leading-label-1 tracking-label-1 text-text-secondary tabular-nums">
        {minutes}
      </span>
      <span className="ml-0.5 text-label-4 font-label-4">분</span>
    </span>
  )
}
