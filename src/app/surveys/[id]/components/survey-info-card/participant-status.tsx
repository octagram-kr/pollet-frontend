import { UserIcon } from '@/components/icons'

export default function ParticipantStatus({
  value,
  max,
}: {
  value: number
  max: number
}) {
  return (
    <div className="absolute right-3 bottom-4 flex items-center justify-between rounded-lg bg-fill-white border border-stroke-subtle text-label-4 font-label-4 text-text-subtle px-3 py-0.5">
      <UserIcon className="fill-fill-strong" />
      <span className="ml-0.25 text-text-primary">{value}</span>/{max}
    </div>
  )
}
