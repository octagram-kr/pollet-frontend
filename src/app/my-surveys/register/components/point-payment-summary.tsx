'use client'

interface Props {
  usablePoints: number
  onChangeUsablePoints: (n: number) => void
  usedForRewardPoints: number
  platformFeePoints: number
  totalPaymentPoints: number
  remainingPoints: number
}

export function PointPaymentSummary({
  usablePoints,
  onChangeUsablePoints,
  usedForRewardPoints,
  platformFeePoints,
  totalPaymentPoints,
  remainingPoints,
}: Props) {
  const won = (n: number) => `${n.toLocaleString()}P`
  const deficit = remainingPoints < 0

  return (
    <section className="mb-[140px]">
      <h2 className="mb-4 text-heading-2 font-heading-2 leading-heading-2 tracking-heading-2 text-text-strong">
        최종 결제 내역
      </h2>

      <div className="rounded-sm border border-stroke-subtle bg-fill-white px-6 py-5">
        {/* 사용 가능 포인트 */}
        <div className="mb-5 flex items-center justify-between">
          <span className="text-body-4 font-body-4 leading-body-4 tracking-body-4 text-text-default">
            사용 가능 포인트
          </span>
          <input
            type="number"
            min={0}
            value={usablePoints}
            onChange={(e) => onChangeUsablePoints(Number(e.target.value || 0))}
            className="hidden" /* 값은 상단/다른 곳에서 세팅, 표시는 숫자만 */
          />
          <div className="text-body-1 font-body-1 leading-body-1 tracking-body-1 text-text-default">
            {won(usablePoints)}
          </div>
        </div>

        {/* 총 결제 포인트 */}
        <div className="mb-2 flex items-center justify-between">
          <span className="text-body-4 font-body-4 leading-body-4 tracking-body-4 text-text-default">
            총 결제 포인트
          </span>
          <div className="text-body-1 font-body-1 leading-body-1 tracking-body-1 text-text-default">
            {won(totalPaymentPoints)}
          </div>
        </div>

        {/* 내역 상세 (세로 가이드) */}
        <div className="mb-3 ml-1 border-l-2 border-gray-200 pl-4">
          <Row
            label="서베이 리워드 지급 비용"
            value={won(usedForRewardPoints)}
            muted
          />
          <Row
            label="플랫폼 사용료"
            value={won(platformFeePoints)}
            muted
          />
        </div>

        <hr className="my-5 border-stroke-subtle" />

        {/* 최종 결제 포인트 */}
        <div className="mt-2">
          <div className="flex items-center justify-between">
            <span className="text-body-4 font-body-4 leading-body-4 tracking-body-4 text-text-default">
              총 결제 포인트
            </span>
            <div className="inline-flex min-w-[258px] items-center justify-between gap-6 rounded-xs bg-bg-white px-4 py-1 border border-stroke-subtler">
              <span className="text-body-5 font-body-5 leading-body-5 tracking-body-5 text-text-default">
                총
              </span>
              <span className="text-body-2 font-body-2 leading-body-2 tracking-body-2 text-text-default">
                {won(totalPaymentPoints)}
              </span>
            </div>
          </div>
          {deficit && (
            <p className="mt-1 text-xs text-red-600">
              * 포인트가 부족합니다. 충전 후 진행해 주세요.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}

function Row({
  label,
  value,
  muted = false,
}: {
  label: string
  value: string
  muted?: boolean
}) {
  return (
    <div className="flex items-center justify-between py-1">
      <span
        className={`text-body-5 font-body-5 leading-body-5 tracking-body-5 ${muted ? 'text-text-subtle' : 'text-gray-700'}`}
      >
        {label}
      </span>
      <span
        className={`text-body-1 font-body-1 leading-body-1 tracking-body-1 ${muted ? 'text-text-subtle' : 'text-gray-900'}`}
      >
        {value}
      </span>
    </div>
  )
}
