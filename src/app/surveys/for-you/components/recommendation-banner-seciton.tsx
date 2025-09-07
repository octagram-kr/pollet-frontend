'use client'

import { cn } from '@/lib/utils'

export type RecommendationProps = {
  gender: 'male' | 'female'
  age: string // '20대'
  job: string // '대학생'
  tags: string[] // 최근 태그 3개
  username: string
}

export default function RecommendationBannerSection({
  gender,
  age,
  job,
  tags,
  username,
  className,
}: RecommendationProps & { className?: string }) {
  return (
    <section
      className={cn(
        'mt-8 flex items-center justify-center gap-6 bg-fill-subtle py-8',
        className,
      )}
    >
      {/* 좌측 썸네일 자리 (임시) */}
      <div className="h-45 w-45 bg-fill-active" />

      <div className="flex flex-col w-fit">
        <p className="w-[375px] text-label-2 font-label-2 leading-label-2 text-text-default">
          <span className="text-label-3 font-label-3 leading-label-3">
            {username}
          </span>
          님의 최근 설문을 바탕으로 맞춤 설문을 추천해드릴게요!
        </p>

        <div className="mt-4 w-fit flex flex-col gap-3">
          <div className="flex gap-4">
            <Chip tone="mint">#{gender === 'male' ? '남자' : '여자'}</Chip>
            <Chip tone="mint">#{age}</Chip>
            <Chip tone="mint">#{job}</Chip>
          </div>
          <div className="flex gap-4">
            {tags.map((t, i) => (
              <Chip
                key={i}
                tone="pink"
              >
                #{t}
              </Chip>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Chip({
  children,
  tone,
}: {
  children: React.ReactNode
  tone: 'mint' | 'pink'
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-xl border px-4 py-0.5 text-label-2 font-label-2 leading-label-2',
        tone === 'mint' &&
          'border-stroke-primary-subtle bg-fill-primary-disabled',
        tone === 'pink' &&
          'border-stroke-secondary-subtle bg-fill-secondary-disabled',
      )}
    >
      {children}
    </span>
  )
}
