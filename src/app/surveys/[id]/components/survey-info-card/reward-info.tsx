import type { Survey } from '@/types/survey'
import { StarcandyIcon } from '@/components/icons'

export default function RewardInfo({ reward }: { reward: Survey['reward'] }) {
  const label =
    reward.type === 'point' ? `${reward.value}${reward.unit ?? ''}` : '기프티콘'
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-[#E7FFF9] px-3 py-1 text-sm font-semibold text-[#0DB2A4]">
      <StarcandyIcon />
      {label}
    </span>
  )
}
