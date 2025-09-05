'use client'

import type { RewardType } from '@/types/survey'
import type { Gifticon } from './reward-detail-section'

interface Props {
  rewardType: RewardType
  // point
  targetCount: number
  estimatedMinutes: number
  pointPerMinute: number
  // gifticon
  gifticonCount: number
  gifticon: Gifticon
  // 합계(원)
  totalWon: number
}

export function UsedForRewardSection({
  rewardType,
  targetCount,
  estimatedMinutes,
  pointPerMinute,
  gifticonCount,
  gifticon,
  totalWon,
}: Props) {
  const won = (n: number) => `${n.toLocaleString()}원`

  return (
    <section className="mb-6">
      <h2 className="mb-2 text-lg font-semibold">리워드 지급 비용</h2>

      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <div className="flex flex-col gap-2">
          {/* 수식 영역 */}
          <div className="text-base leading-relaxed text-gray-700">
            {rewardType === 'point' ? (
              <>
                <span className="text-gray-500">목표 인원 수 </span>
                <b className="text-gray-900">
                  {targetCount.toLocaleString()}명
                </b>
                <span className="mx-1 text-gray-400">×</span>
                <span className="text-gray-500">예상 시간 </span>
                <b className="text-gray-900">{estimatedMinutes}분</b>
                <span className="mx-1 text-gray-400">×</span>
                <span className="text-gray-500">1분 당 지급 포인트 </span>
                <b className="text-gray-900">{pointPerMinute}p</b>
              </>
            ) : (
              <>
                <span className="text-gray-500">기프티콘 지급 인원 수 </span>
                <b className="text-gray-900">
                  {gifticonCount.toLocaleString()}명
                </b>
                <span className="mx-1 text-gray-400">×</span>
                <span className="text-gray-900">{gifticon.name} </span>
                <b className="text-gray-900">{won(gifticon.price)}</b>
              </>
            )}
          </div>

          {/* = 금액 (우측 하단 배치) */}
          <div className="flex justify-end">
            <div className="inline-flex min-w-[180px] items-center gap-6 rounded bg-gray-100 px-8 py-3">
              <span className="text-xl font-semibold text-gray-600">=</span>
              <span className="text-2xl font-bold text-gray-900">
                {won(totalWon)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
