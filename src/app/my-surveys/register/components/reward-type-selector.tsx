'use client'

import { GiftIcon, StarcandyIcon } from '@/components/icons'
import { RewardType } from '@/types/survey'

interface Props {
  value: RewardType
  onChange: (value: RewardType) => void
}

export function RewardTypeSelector({ value, onChange }: Props) {
  return (
    <section className="mb-12">
      <h2 className="mb-4 text-heading-2 font-heading-2 leading-heading-2 tracking-heading-2 text-text-strong">
        제공할 리워드 선택
      </h2>
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => onChange('point')}
          className={`rounded-sm border px-4 py-3 ${
            value === 'point'
              ? 'border-stroke-primary bg-fill-primary-disabled'
              : 'border-gray-300'
          }`}
        >
          <div className="flex items-center justify-center gap-3">
            <StarcandyIcon className="size-12 fill-fill-primary-active" />
            <div className="flex flex-col">
              <span
                className="text-left text-body-1 font-body-1 leading-body-1 tracking-body-1
              text-text-default"
              >
                참여자{' '}
                <span className="text-body-2 font-body-2 leading-body-2 tracking-body-2 text-text-primary">
                  모두 별사탕
                </span>{' '}
                지급
              </span>
              <span className="text-body-5 font-body-5 leading-body-5 tracking-body-5 text-text-subtle">
                ex) 100명 모두 별사탕 100개 지급
              </span>
            </div>
          </div>
        </button>
        <button
          type="button"
          onClick={() => onChange('gifticon')}
          className={`rounded-sm border px-4 py-3 ${
            value === 'gifticon'
              ? 'border-stroke-primary bg-fill-primary-disabled'
              : 'border-gray-300'
          }`}
        >
          <div className="flex items-center justify-center gap-3">
            <GiftIcon className="size-12 fill-fill-primary-active" />
            <div className="flex flex-col">
              <span
                className="text-left text-body-1 font-body-1 leading-body-1 tracking-body-1
              text-text-default"
              >
                추첨을 통한{' '}
                <span className="text-body-2 font-body-2 leading-body-2 tracking-body-2 text-text-primary">
                  기프티콘
                </span>{' '}
                지급
              </span>
              <span className="text-body-5 font-body-5 leading-body-5 tracking-body-5 text-text-subtle">
                ex) 5명 추첨 후 커피 기프티콘 지급
              </span>
            </div>
          </div>
        </button>
      </div>
    </section>
  )
}
