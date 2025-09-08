import { UserFillIcon } from '@/components/icons'

export default function ParticipantStatus({
  value,
  max,
}: {
  value: number
  max: number
}) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2">
      <UserFillIcon />
      <span className="font-semibold">
        {value}/{max}
      </span>
    </div>
  )
}
