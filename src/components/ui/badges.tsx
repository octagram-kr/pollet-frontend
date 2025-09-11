import type { SurveyStatus } from '@/types/survey'
import { GiftIcon, StarcandyIcon } from '../icons'

interface Props {
  status: SurveyStatus
  widthClass?: string
}

export default function StatusBadge({
  status,
  widthClass = 'w-[70px]',
}: Props) {
  const isOngoing = status === 'ongoing'
  const label = isOngoing ? '진행중' : '종료'
  const base = `rounded-xl border px-3 py-0.5 inline-flex items-center justify-center shrink-0 ${widthClass}`
  return (
    <span
      className={
        isOngoing
          ? `${base} bg-fill-primary-subtle border-stroke-primary text-text-strong`
          : `${base} bg-gray-300 border-stroke-default text-text-strong`
      }
    >
      {label}
    </span>
  )
}

export function PointBadge({ value }: { value: number }) {
  return (
    <span className="flex gap-0.5 item-center rounded-xl bg-fill-primary-subtle border border-stroke-primary px-2 ">
      <StarcandyIcon className="w-4 fill-fill-primary-active" />
      <span className="text-text-strong text-label-5 font-label-5 leading-label-5 tracking-label-5">
        {value.toLocaleString()}
      </span>
    </span>
  )
}

export function GifticonBadge({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-xl bg-fill-primary-subtle border border-stroke-primary px-2">
      <GiftIcon className="w-4 fill-fill-primary-active" />
      <span className="text-text-strong text-label-5 font-label-5 leading-label-5 tracking-label-5 truncate">
        {name}
      </span>
    </span>
  )
}

export function MinuteBadge({ minutes }: { minutes: number }) {
  return (
    <span className="border border-stroke-subtle rounded-xl bg-fill-white px-2 py-1 text-text-default text-label-6 font-label-6 leading-label-6">
      <span className="text-label-5 font-label-5 leading-label-5 tracking-label-5 text-text-secondary">
        {minutes}
      </span>
      분
    </span>
  )
}
