export default function PersonalInfoCollection({
  items,
  purpose,
  retention,
}: {
  items: string[]
  purpose: string
  retention: string
}) {
  return (
    <div className="rounded-lg bg-gray-50 p-3">
      <div className="text-gray-600">개인정보 수집</div>
      <ul className="mt-1 list-disc pl-5 text-sm">
        <li>수집 항목: {items.join(', ')}</li>
        <li>수집 목적: {purpose}</li>
        <li>보유 및 이용 기간: {retention}</li>
      </ul>
    </div>
  )
}
