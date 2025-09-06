'use client'

import { cn } from '@/lib/utils'
import { OptionIcon } from '@/components/icons'

export default function TagList({
  tags,
  maxVisible = 9,
  selected,
  onToggle,
  onClear,
  onOpenTagModal,
  className,
}: {
  tags: string[]
  maxVisible?: number
  selected: Set<string>
  onToggle: (tag: string) => void
  onClear: () => void
  onOpenTagModal: () => void
  className?: string
}) {
  const hasSelection = selected.size > 0
  const visible = tags.slice(0, maxVisible)

  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      {/* ALL */}
      <button
        type="button"
        onClick={onClear}
        className={cn(
          'inline-flex items-center rounded-xl border px-4 py-0.5 text-text-default text-label-2 font-label-2 leading-label-2 transition hover:cursor-pointer',
          hasSelection
            ? 'border-stroke-subtle bg-fill-white hover:bg-bg-subtle'
            : 'border-stroke-primary bg-fill-primary-subtle',
        )}
        aria-pressed={!hasSelection}
      >
        ALL
      </button>

      {/* Tags */}
      {visible.map((t) => {
        const active = selected.has(t)
        return (
          <button
            key={t}
            type="button"
            onClick={() => onToggle(t)}
            className={cn(
              'inline-flex items-center rounded-xl border px-4 py-0.5 text-text-default text-label-2 font-label-2 leading-label-2 transition hover:cursor-pointer',
              active
                ? 'border-stroke-primary-subtle bg-fill-primary-disabled'
                : 'border-stroke-subtle bg-fill-white hover:bg-bg-subtle',
            )}
            aria-pressed={active}
          >
            #{t}
            {active}
          </button>
        )
      })}

      {/* 마지막 버튼: 태그 모달 */}
      <button
        type="button"
        onClick={onOpenTagModal}
        className="ml-auto inline-flex items-center justify-center rounded-xl border border-stroke-primary bg-fill-primary-subtle px-3 hover:opacity-90 hover:cursor-pointer"
        aria-haspopup="dialog"
        title="태그 더보기"
      >
        <OptionIcon className="h-8 w-8 text-fill-deep" />
      </button>
    </div>
  )
}
