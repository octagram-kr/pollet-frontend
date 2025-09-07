'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'
import { LeftIcon, RightIcon } from '@/components/icons'

export default function Pagination({
  total,
  pageSize = 12,
  className,
}: {
  total: number
  pageSize?: number
  className?: string
}) {
  const router = useRouter()
  const pathname = usePathname()
  const sp = useSearchParams()

  const page = Math.max(1, Number(sp.get('page') || 1))
  const pageCount = Math.max(1, Math.ceil(total / pageSize))
  if (pageCount <= 1) return null

  const go = (p: number) => {
    const next = Math.min(Math.max(1, p), pageCount)
    const nsp = new URLSearchParams(sp.toString())
    if (next === 1) nsp.delete('page')
    else nsp.set('page', String(next))
    router.replace(`${pathname}?${nsp.toString()}`, { scroll: false })
  }

  const WINDOW = Math.min(5, pageCount)
  // 중앙 정렬 시도 → 가장자리에서 좌/우로 붙도록 보정
  let start = page - Math.floor(WINDOW / 2)
  start = Math.max(1, Math.min(start, pageCount - WINDOW + 1))
  const items = Array.from({ length: WINDOW }, (_, i) => start + i)

  return (
    <nav
      className={cn('my-32 flex items-center justify-center gap-2', className)}
      aria-label="페이지네이션"
    >
      {/* 이전 */}
      <IconButton
        label="이전"
        disabled={page === 1}
        onClick={() => go(page - 1)}
      >
        <LeftIcon className="fill-fill-active" />
      </IconButton>

      {/* 번호들 */}
      <ol className="flex items-center">
        {items.map((it) => (
          <li
            key={it}
            className="size-10.5 flex items-center justify-center text-label-4 font-label-4 leading-label-4"
          >
            <button
              type="button"
              aria-current={page === it ? 'page' : undefined}
              onClick={() => go(it)}
              className={cn(
                'transition-colors hover:cursor-pointer',
                // 비활성
                'text-text-subtler',
                // 활성
                page === it && 'text-text-default',
              )}
            >
              {it}
            </button>
          </li>
        ))}
      </ol>

      {/* 다음 */}
      <IconButton
        label="다음"
        disabled={page === pageCount}
        onClick={() => go(page + 1)}
      >
        <RightIcon className="fill-fill-active" />
      </IconButton>
    </nav>
  )
}

function IconButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string
  disabled?: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={cn('hover:cursor-pointer', disabled && 'hover:cursor-auto')}
    >
      {children}
    </button>
  )
}
