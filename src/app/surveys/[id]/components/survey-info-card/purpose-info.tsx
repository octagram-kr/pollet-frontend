export default function PurposeInfo({ value }: { value: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2">
      <span className="text-gray-600">목적</span>
      <span className="font-semibold">{value}</span>
    </div>
  )
}
