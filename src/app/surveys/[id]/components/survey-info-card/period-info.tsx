export default function PeriodInfo({ from, to }: { from: string; to: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2">
      <span className="text-gray-600">설문 기간</span>
      <span className="font-semibold">
        {from} ~ {to}
      </span>
    </div>
  )
}
