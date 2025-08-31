export function ProgressSection({
  rate,
  current,
  target,
}: {
  rate: number
  current: number
  target: number
}) {
  const clamped = Math.max(0, Math.min(100, Math.round(rate)))
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs text-gray-600">
        <span>{clamped}%</span>
        <span>
          {current}/{target}
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full rounded-full bg-blue-500"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  )
}
