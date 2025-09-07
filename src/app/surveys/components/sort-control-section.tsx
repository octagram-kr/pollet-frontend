'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'
import ToggleControl from './toggle-control'
// import SortControl, { SortValue } from './sort-control'

export default function SortControlSection({
  className,
}: {
  className?: string
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // URL → 현재 상태
  const qview = (searchParams.get('qview') as 'on' | 'off' | null) ?? 'off'
  // const sort = (searchParams.get('sort') as SortValue | null) ?? 'accuracy'

  const replaceParam = (key: string, val?: string) => {
    const sp = new URLSearchParams(searchParams.toString())
    if (!val) sp.delete(key)
    else sp.set(key, val)
    router.replace(`${pathname}?${sp.toString()}`, { scroll: false })
  }

  return (
    <section
      className={cn('mt-16', className)}
      aria-label="정렬 및 보기 설정"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        {/* 좌측: 질문 보기 토글 */}
        <ToggleControl
          value={qview}
          onChange={(v) => replaceParam('qview', v)}
        />

        {/* 우측: 정렬 선택 */}
        {/* <SortControl
          value={sort}
          onChange={(v) => replaceParam('sort', v)}
        /> */}
      </div>
    </section>
  )
}
