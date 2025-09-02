'use client'

import { useEffect, useMemo } from 'react'

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
  const won = (n: number) => `${n.toLocaleString('ko-KR')}원`

  return (
    <section className="mb-6">
      <h2 className="mb-2 text-lg font-semibold">플랫폼 사용료</h2>

      <div className="rounded-xl border border-gray-200 bg-white p-4">
        {/* 설문 기간 줄 */}
        <div className="mb-3 flex flex-wrap items-center gap-2 text-sm">
          <span className="font-semibold text-gray-800">설문 기간</span>
          <span className="rounded bg-gray-50 px-3 py-1 text-gray-900">
            {startDate} ~ {endDate}
          </span>
          <span className="font-semibold text-gray-800">
            (총 {totalDays}일)
          </span>
          {isDouble && (
            <span className="rounded bg-gray-300 px-2.5 py-1 text-[12px] font-semibold text-gray-800">
              플랫폼 사용료 2배 적용 ⓘ
            </span>
          )}
        </div>

        {/* 라벨 */}
        <div className="mb-2 text-base text-gray-800">
          <span className="font-semibold">플랫폼 사용료</span>{' '}
          <span className="align-middle text-gray-400">ⓘ</span>
        </div>

        {/* 수식 박스 */}
        <div className="flex flex-col gap-2">
          {/* 수식 */}
          <div className="text-lg text-gray-700">
            <span>기본 요금 </span>
            <b className="text-gray-900">{won(baseFee)}</b>
            <span className="mx-1 text-gray-400"> + </span>
            <span>추가 요금 </span>
            <b className="text-gray-900">{won(extraFee)}</b>
            <span className="text-sm text-gray-500">
              {' '}
              (추가 인원 {extraPeople.toLocaleString()}명)
            </span>
            {isDouble && (
              <>
                <span className="mx-1 text-gray-400"> × </span>
                <b className="text-gray-900">2 배</b>
              </>
            )}
          </div>

          {/* 금액 박스 */}
          <div className="flex justify-end">
            <div className="inline-flex min-w-[180px] items-center gap-6 rounded bg-gray-100 px-8 py-3">
              <span className="text-xl font-semibold text-gray-600">=</span>
              <span className="text-2xl font-bold text-gray-900">
                {won(finalFee)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
