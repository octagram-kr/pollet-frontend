'use client'

import { RewardType } from '@/types/survey'

interface Props {
  value: RewardType
  onChange: (value: RewardType) => void
}

export function RewardTypeSelector({ value, onChange }: Props) {
  return (
    <section className="mb-6">
      <h2 className="mb-2 text-lg font-semibold">리워드 방식 선택</h2>
      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => onChange('point')}
          className={`rounded-lg border p-4 ${
            value === 'point' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
          }`}
        >
          참여자 모두 포인트 지급
        </button>
        <button
          type="button"
          onClick={() => onChange('gifticon')}
          className={`rounded-lg border p-4 ${
            value === 'gifticon'
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300'
          }`}
        >
          참여자 추첨 기프티콘 지급
        </button>
      </div>
    </section>
  )
}
