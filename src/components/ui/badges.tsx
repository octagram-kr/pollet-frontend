import type { SurveyStatus } from '@/types/survey'

interface Props {
  status: SurveyStatus
  widthClass?: string
}

export default function StatusBadge({
  status,
  widthClass = 'w-[70px]',
}: Props) {
  const isOngoing = status === 'ongoing'
  const label = isOngoing ? '진행 중' : '종료'
  const base = `rounded px-3 py-1 text-xs font-semibold inline-flex items-center justify-center shrink-0 ${widthClass}`
  return (
    <span
      className={
        isOngoing
          ? `${base} bg-gray-700 text-white`
          : `${base} bg-gray-300 text-gray-700`
      }
    >
      {label}
    </span>
  )
}

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
