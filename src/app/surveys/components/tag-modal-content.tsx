'use client'

import { cn } from '@/lib/utils'
import { ResetIcon } from '@/components/icons'

export default function TagModalContent({
  tags,
  selected,
  maxSelectable = 3,
  onToggle,
  onClear,
  onApply,
}: {
  tags: string[]
  selected: Set<string>
  maxSelectable?: number
  onToggle: (tag: string) => void
  onClear: () => void
  onApply: () => void
}) {
  const canAdd = (t: string) => selected.has(t) || selected.size < maxSelectable

  return (
    <>
      <p className="text-caption-4 font-caption-4 leading-caption-4 tracking-caption-4 text-text-subtle">
        최대 {maxSelectable}개까지 설정 가능합니다
      </p>
      <div className="mt-8">
        <div className="w-full flex flex-wrap gap-x-4 gap-y-5">
          {tags.map((t) => {
            const active = selected.has(t)
            const disabled = !active && !canAdd(t)
            return (
              <button
                key={t}
                type="button"
                onClick={() => !disabled && onToggle(t)}
                disabled={disabled}
                className={cn(
                  'rounded-xl border px-2 py-0.5 text-label-8 font-label-8 leading-label-8 text-text-default tracking-label-8 transition',
                  active
                    ? 'border-stroke-primary bg-fill-primary-subtle'
                    : 'border-stroke-subtle bg-fill-white hover:bg-bg-subtle',
                  !disabled && 'hover:cursor-pointer',
                  disabled && 'opacity-50 cursor-not-allowed',
                )}
                aria-pressed={active}
              >
                <div className="flex items-center">
                  <p className="text-label-2 font-label-2 leading-label-2 tracking-label-5">
                    #
                  </p>
                  <p>{t}</p>
                </div>
              </button>
            )
          })}
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <button
            type="button"
            onClick={onApply}
            className="w-full rounded-xs bg-fill-primary px-4 py-3 text-label-4 font-label-4 leading-label-4 text-text-default hover:cursor-pointer"
          >
            설정하기
          </button>
          <button
            type="button"
            onClick={onClear}
            className="inline-flex items-center gap-1 self-center text-caption-3 font-caption-3 leading-caption-3 tracking-caption-3 text-text-default hover:cursor-pointer"
          >
            <ResetIcon className="w-5.5 h-5.5 fill-fill-strong" />
            선택 초기화
          </button>
        </div>
      </div>
    </>
  )
}
