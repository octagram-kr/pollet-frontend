import type { Survey } from '@/types/survey'
import { StarcandyIcon } from '@/components/icons'

export default function RewardInfo({ reward }: { reward: Survey['reward'] }) {
  const label =
    reward.type === 'point' ? `${reward.value}${reward.unit ?? ''}` : '기프티콘'
  return (
    <span className="absolute left-3 top-4 inline-flex items-center gap-1 rounded-xl bg-fill-primary-subtle border border-stroke-primary px-3 py-0.5 text-label-1 font-label-1 leading-label-1 tracking-label-1 text-text-strong tabular-nums">
      <StarcandyIcon className="fill-fill-primary-active" />
      {label}
    </span>
  )
}
