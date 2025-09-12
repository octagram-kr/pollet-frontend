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
  totalGifticonWon: number
}

export function UsedForRewardSection({
  rewardType,
  targetCount,
  estimatedMinutes,
  pointPerMinute,
  gifticonCount,
  gifticon,
  totalWon,
  totalGifticonWon,
}: Props) {
  const won = (n: number) => `${n.toLocaleString()}P`
  const gifticonUnits = gifticonCount > 0 ? targetCount / gifticonCount : 0

  return (
    <section className="mb-12">
      <div className="rounded-sm border border-stroke-subtle bg-fill-white px-6 py-3">
        <div className="flex items-center justify-between gap-2">
          {/* 수식 영역 */}
          <div className="text-left text-text-default">
            {rewardType === 'point' ? (
              <span className="text-body-5 font-body-5 leading-body-5 tracking-body-5">
                목표 인원 수{' '}
                <span className="text-body-1 font-body-1 leading-body-1 tracking-body-1">
                  {targetCount.toLocaleString()}
                </span>
                명 &nbsp;×&nbsp; 예상 소요 시간{' '}
                <span className="text-body-1 font-body-1 leading-body-1 tracking-body-1">
                  {estimatedMinutes}
                </span>
                분 &nbsp;×&nbsp; 지급 포인트{' '}
                <span className="text-body-1 font-body-1 leading-body-1 tracking-body-1">
                  {pointPerMinute}
                </span>
                P
              </span>
            ) : (
              <>
                <span className="text-body-5 font-body-5 leading-body-5 tracking-body-5">
                  리워드 지급 인원&nbsp;{' '}
                  <span className="text-body-1 font-body-1 leading-body-1 tracking-body-1">
                    {gifticonUnits.toLocaleString()}
                  </span>
                  명 &nbsp;×&nbsp; 기프티콘 비용&nbsp;{' '}
                  <span className="text-body-1 font-body-1 leading-body-1 tracking-body-1">
                    {won(gifticon.price)}
                  </span>
                </span>
              </>
            )}
          </div>

          {/* 금액 */}

          <div className="flex justify-between w-[258px] h-11 items-center gap-6 rounded bg-bg-white border border-stroke-subtler px-6 py-3">
            <span className="text-body-5 font-body-5 leading-body-5 tracking-body-5 text-text-default">
              총
            </span>
            <span className="text-body-2 font-body-2 leading-body-2 tracking-body-2 text-text-default">
              {rewardType === 'point' ? won(totalWon) : won(totalGifticonWon)}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
