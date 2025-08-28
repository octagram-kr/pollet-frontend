export function PointBadge({ value }: { value: number }) {
  return (
    <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-gray-200">
      {value.toLocaleString()} P
    </span>
  )
}

export function GifticonBadge({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-gray-200">
      {/* <Gift className="h-3.5 w-3.5" aria-hidden /> */}
      <span className="max-w-[7.5rem] truncate">{name}</span>
    </span>
  )
}

export function MinuteBadge({ minutes }: { minutes: number }) {
  return (
    <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-gray-200">
      {minutes}분
    </span>
  )
}
