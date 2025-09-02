'use client'

import { useState } from 'react'
import { SurveyCard } from '@/app/(site)/components/survey-card'
import { SectionHeader } from '@/app/(site)/components/section-header'
import { cn } from '@/lib/utils'
import type { SurveyItem } from '@/types/survey'

type UrgentItem = SurveyItem & {
  countdownUntil: string | Date
  progress: { rate: number; current: number; target: number }
}

export function UrgentCarouselSection({
  items, // 9개 이상 권장
  visible = { base: 1, sm: 2, lg: 3 },
  className,
}: {
  items: UrgentItem[]
  visible?: { base: number; sm: number; lg: number } // 반응형 가시 카드 수
  className?: string
}) {
  const [start, setStart] = useState(0)
  const len = items.length

  const stepPrev = () => setStart((s) => (s - 3 + len) % len)
  const stepNext = () => setStart((s) => (s + 3) % len)

  // 현재 시작 인덱스에서 가시 카드 수만큼 뽑기(모듈러)
  const pick = (count: number) =>
    Array.from({ length: count }, (_, i) => items[(start + i) % len])

  return (
    <section className={cn('relative', className)}>
      <SectionHeader
        title="마감 임박 설문조사"
        moreHref="/all-survey?tab=urgent"
      />

      {/* 모바일/태블릿: 가로 슬라이드 */}
      <div className="-mx-6 lg:hidden">
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-1">
          {items.map((s, i) => (
            <div
              key={`${s.id}-m-${i}`}
              className="snap-start shrink-0 w-[82%] sm:w-[60%] md:w-[48%]"
            >
              <SurveyCard
                id={s.id}
                title={s.title}
                thumbnail={s.thumbnail}
                reward={s.reward}
                duration={s.duration}
                tags={s.tags}
                variant="urgent"
                countdownUntil={s.countdownUntil}
                progress={s.progress}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 데스크톱: 3개 노출 + 좌/우 버튼으로 9개 순환 */}
      <button
        type="button"
        onClick={stepPrev}
        aria-label="이전 설문"
        className="absolute left-0 top-1/2 z-10 hidden -translate-x-1/2 rounded-full bg-black/40 px-3 py-2 text-white backdrop-blur hover:bg-black/60 lg:block"
      >
        ‹
      </button>

      <button
        type="button"
        onClick={stepNext}
        aria-label="다음 설문"
        className="absolute right-0 top-1/2 z-10 hidden translate-x-1/2 rounded-full bg-black/40 px-3 py-2 text-white backdrop-blur hover:bg-black/60 lg:block"
      >
        ›
      </button>

      <div className="hidden lg:grid lg:grid-cols-3 lg:gap-6">
        {pick(visible.lg).map((s, i) => (
          <SurveyCard
            key={`${s.id}-lg-${i}`}
            id={s.id}
            title={s.title}
            thumbnail={s.thumbnail}
            reward={s.reward}
            duration={s.duration}
            tags={s.tags}
            variant="urgent"
            countdownUntil={s.countdownUntil}
            progress={s.progress}
          />
        ))}
      </div>
    </section>
  )
}
