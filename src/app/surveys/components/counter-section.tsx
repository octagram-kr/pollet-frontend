'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { SearchIcon } from '@/components/icons'
import { cn } from '@/lib/utils'

/**
 * SurveyCounterSection
 * - 좌측: 조건에 맞는 설문 총량(실시간 자리)
 * - 우측: 검색 입력(쿼리스트링 ?q= 로 반영, 디바운스)
 *
 * 실제 총량은 /api/surveys/count?{조건들} 같은 엔드포인트를 붙여
 * SWR(fetch)로 교체. 우선은 부모에서 내려주는 initialTotal을 사용.
 */
export default function SurveyCounterSection({
  className,
  initialTotal = 0,
}: {
  className?: string
  initialTotal?: number
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // 현재 URL의 q 값을 초기 검색어로 사용
  const q = searchParams.get('q') ?? ''
  const [keyword, setKeyword] = useState(q)

  // 총량 표시
  const [total, setTotal] = useState(initialTotal)

  // TODO: 실제 구현 시, 아래 useEffect를 SWR(fetch)로 바꿔서
  // `keyword` 또는 기타 필터 변경 시 서버 카운트 재검증
  useEffect(() => {
    // 데모용 가짜 변화: 글자 수에 따라 총량이 살짝 변하는 효과
    const base = Math.max(0, initialTotal)
    const fake = Math.max(0, base - keyword.length * 3)
    setTotal(fake)
  }, [keyword, initialTotal])

  // 검색 디바운스 -> URL ?q= 반영(스크롤 유지)
  useEffect(() => {
    const t = setTimeout(() => {
      const currQ = searchParams.get('q') ?? ''
      if (currQ === keyword) return
      const sp = new URLSearchParams(searchParams.toString())
      if (keyword) sp.set('q', keyword)
      else sp.delete('q')
      const qs = sp.toString()
      const href = qs ? `${pathname}?${qs}` : pathname
      router.replace(href, { scroll: false })
    }, 300)
    return () => clearTimeout(t)
  }, [keyword, pathname, router, searchParams])

  return (
    <section className={cn(className)}>
      <div className="mx-auto flex max-w-7xl items-center justify-between pt-16">
        {/* 좌측: 총량 */}
        <div className="flex items-baseline">
          <span className="tabular-nums text-title-1 font-title-1 leading-title-1 text-text-strong">
            {Intl.NumberFormat('ko-KR').format(total)}개의 설문조사가 기다리고
            있어요!
          </span>
        </div>

        {/* 검색 입력 */}
        <div className="w-full h-full max-w-[282px] max-h-[42px]">
          <label className="relative block">
            <span className="sr-only">설문 검색</span>
            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="검색어를 입력하세요"
              inputMode="search"
              className={cn(
                'w-full rounded-xl text-body-5 font-body-5 tracking-body-5 bg-fill-subtle pl-5 pr-2 py-2 outline-none',
                'placeholder:text-text-subtle',
                'focus:border-stroke-muted focus:ring-4 focus:ring-bg-subtle',
                'transition-colors',
              )}
            />
            {/* 검색 아이콘 */}
            <SearchIcon className="absolute right-3 top-1/2 h-6 w-6 -translate-y-1/2 fill-fill-black" />
          </label>
        </div>
      </div>
    </section>
  )
}
