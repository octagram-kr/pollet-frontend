export default function RetentionPeriodInfo({ months }: { months: number }) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2">
      <span className="text-gray-600">응답 보유 기간</span>
      <span className="font-semibold">{months}개월</span>
    </div>
  )
}
