export default function SurveyorInfo({ name }: { name: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2">
      <span className="text-gray-600">설문자 정보</span>
      <span className="font-semibold">{name}</span>
    </div>
  )
}
