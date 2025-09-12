'use client'

import { useEffect, useMemo } from 'react'
import HelpTooltip from './help-tooltip'

interface Props {
  // 편집 페이지에서 등록된 값 (읽기 전용)
  startDate: string // YYYY-MM-DD
  endDate: string // YYYY-MM-DD
  targetCount: number

  /** 계산된 최종 금액을 부모로 알려줌(원 단위) */
  onComputedChange?: (fee: number) => void
}

export function PlatformFeeSection({
  startDate,
  endDate,
  targetCount,
  onComputedChange,
}: Props) {
  // 날짜 계산 (포함일수)
  const totalDays = useMemo(() => {
    const s = new Date(startDate)
    const e = new Date(endDate)
    if (isNaN(s.getTime()) || isNaN(e.getTime())) return 0
    const diff = Math.floor((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24))
    return Math.max(0, diff) + 1
  }, [startDate, endDate])

  // 인원 기준 추가요금
  const baseFee = 3000
  const extraPeople = Math.max(0, targetCount - 50)
  const extraBlocks = extraPeople > 0 ? Math.ceil(extraPeople / 10) : 0
  const extraFee = extraBlocks * 1000

  // 기간 규칙
  const isDouble = totalDays > 0 && totalDays < 5
  const multiplier = isDouble ? 2 : 1

  // 최종 금액
  const finalFee = (baseFee + extraFee) * multiplier

  useEffect(() => {
    onComputedChange?.(finalFee)
  }, [finalFee, onComputedChange])

  // helpers
  const won = (n: number) => `${n.toLocaleString('ko-KR')}P`

  return (
    <section className="mb-12">
      <h2 className="mb-4 text-heading-2 font-heading-2 leading-heading-2 tracking-heading-2 text-text-strong">
        플랫폼 사용료
      </h2>

      <div className="rounded-sm border border-stroke-subtle bg-fill-white px-6 py-5">
        {/* 설문 기간 줄 */}
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="text-body-4 font-body-4 leading-body-4 tracking-body-4 text-text-default">
            설문 기간
          </span>
          <span className="flex items-center gap-1">
            <HelpTooltip
              message={
                '종료 기간이 5일 미만인 설문은 등록 즉시 마감 임박 설문에 노출되고,\n사용료가 2배로 적용됩니다.'
              }
            />
          </span>
          <span className="px-1 text-body-5 font-body-5 leading-body-5 tracking-body-5 text-text-subtle">
            {startDate} ~ {endDate}
          </span>
          <span className="text-body-5 font-body-5 leading-body-5 tracking-body-5 text-text-subtle">
            ( {totalDays}일 )
          </span>
        </div>

        {/* 라벨 */}
        <div className="text-body-4 font-body-4 leading-body-4 tracking-body-4 text-text-default">
          <span className="flex items-center gap-1">
            플랫폼 사용료
            <HelpTooltip
              message={
                '목표 인원 수 50명 이하일 경우 기본 사용료는 3,000원이며,\n초과 시 10명 단위로 올림하여 10명당 1,000원이 추가됩니다.'
              }
            />
          </span>
        </div>

        {/* 수식 박스 */}
        <div className="flex justify-between items-center gap-2">
          {/* 수식 */}
          <div className="text-body-5 font-body-5 leading-body-5 tracking-body-5 text-text-default">
            <span>기본 요금 </span>
            <span className="text-gray-900">{won(baseFee)}</span>
            <span className="mx-1"> + </span>
            <span>추가 요금 </span>
            <span className="text-gray-900">{won(extraFee)}</span>
            {isDouble && (
              <>
                <span className="mx-1"> × </span>
                <span className="">2 배</span>
              </>
            )}
          </div>

          {/* 금액 박스 */}
          <div className="flex items-center">
            <div className="inline-flex min-w-[258px] items-center justify-between gap-6 rounded-xs bg-bg-white px-4 py-1 border border-stroke-subtler">
              <span className="text-body-5 font-body-5 leading-body-5 tracking-body-5 text-text-default">
                총
              </span>
              <span className="text-body-2 font-body-2 leading-body-2 tracking-body-2 text-text-default">
                {won(finalFee)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
