'use client'

import { useEffect, useState } from 'react'
import { ChoiceOption } from './types'
import { CloseIcon, RadioDefaultIcon, RadioFillIcon } from '@/components/icons'

type Props = {
  open: boolean
  options: ChoiceOption[]
  selectedId?: string | null
  onClose: () => void
  onApply: (optionId: string) => void
}

export default function InterviewRequestModal({
  open,
  options,
  selectedId,
  onClose,
  onApply,
}: Props) {
  const [picked, setPicked] = useState<string>(selectedId ?? '')

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  useEffect(() => setPicked(selectedId ?? ''), [selectedId, open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center">
      <div
        className="absolute inset-0 bg-dim"
        onClick={onClose}
      />
      <div className="relative w-[384px] rounded-md bg-fill-white p-8">
        <div className="mb-1 flex items-start justify-between">
          <h3 className="text-title-2 font-title-2 leading-title-2 text-text-default">
            인터뷰 요청 설정
          </h3>
          <button
            onClick={onClose}
            className="p-1 text-fill-deep"
          >
            <CloseIcon className="w-[28px]" />
          </button>
        </div>
        <p className="mb-8 text-caption-4 font-caption-4 leading-caption-4 tracking-caption-4 text-text-subtle">
          해당 문항을 선택한 응답자에게 인터뷰를 요청합니다.
        </p>

        <div className="max-h-[360px] space-y-3 overflow-auto pr-1">
          {options.map((o) => {
            const active = picked === o.id
            return (
              <button
                key={o.id}
                type="button"
                onClick={() => setPicked(o.id)}
                className={`flex w-full items-center gap-3 rounded-xs border px-4 py-4 text-left transition
                  ${active ? 'border-stroke-primary' : 'border-stroke-subtle hover:bg-gray-50'}
                `}
              >
                <span>
                  {active ? (
                    <RadioFillIcon className="w-5 text-fill-deep" />
                  ) : (
                    <RadioDefaultIcon className="w-5 text-text-subtle" />
                  )}
                </span>

                <span className="text-label-6 font-label-6 leading-label-6 text-text-subtle">
                  {o.label || '질문지 작성란입니다'}
                </span>
              </button>
            )
          })}
        </div>

        <button
          type="button"
          disabled={!picked}
          onClick={() => picked && onApply(picked)}
          className="mt-8 w-full rounded-xs bg-fill-primary px-4 py-3 text-label-7 font-label-7 leading-label-7 text-text-default disabled:opacity-40"
        >
          적용하기
        </button>
      </div>
    </div>
  )
}
