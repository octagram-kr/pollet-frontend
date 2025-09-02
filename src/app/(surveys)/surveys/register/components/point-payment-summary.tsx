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
  const won = (n: number) => `${n.toLocaleString()}원`
  const deficit = remainingPoints < 0

  return (
    <section className="mb-6">
      <h2 className="mb-2 text-lg font-semibold">포인트 결제 내역</h2>

      <div className="rounded-xl border border-gray-200 bg-white p-4">
        {/* 사용 가능 포인트 */}
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm text-gray-700">사용 가능 포인트</span>
          <input
            type="number"
            min={0}
            value={usablePoints}
            onChange={(e) => onChangeUsablePoints(Number(e.target.value || 0))}
            className="hidden" /* 값은 상단/다른 곳에서 세팅, 표시는 숫자만 */
          />
          <div className="text-2xl font-bold text-gray-900">
            {won(usablePoints)}
          </div>
        </div>

        {/* 총 결제 포인트 */}
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm text-gray-700">총 결제 포인트</span>
          <div className="text-2xl font-bold text-gray-900">
            {won(totalPaymentPoints)}
          </div>
        </div>

        {/* 내역 상세 (세로 가이드) */}
        <div className="mb-3 ml-1 border-l-2 border-gray-200 pl-4">
          <Row
            label="리워드 지급 비용"
            value={won(usedForRewardPoints)}
            muted
          />
          <Row
            label="플랫폼 사용료"
            value={won(platformFeePoints)}
            muted
          />
        </div>

        {/* 결제 후 남은 포인트 */}
        <div className="mt-2 rounded-md bg-gray-100 px-3 py-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-800">결제 후 남은 포인트</span>
            <div
              className={`text-2xl font-bold ${deficit ? 'text-red-600' : 'text-gray-900'}`}
            >
              {won(remainingPoints)}
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
      <span className={`text-sm ${muted ? 'text-gray-500' : 'text-gray-700'}`}>
        {label}
      </span>
      <span
        className={`text-base ${muted ? 'text-gray-500' : 'text-gray-900'}`}
      >
        {value}
      </span>
    </div>
  )
}
