export function RewardInfo({
  type,
  value,
}: {
  type: 'point' | 'gifticon'
  value: number
}) {
  return (
    <div className="text-sm text-gray-600">
      {type === 'point' ? `${value.toLocaleString()} P` : `기프티콘 ${value}개`}
    </div>
  )
}
