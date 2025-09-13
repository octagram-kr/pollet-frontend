'use client'

import Image from 'next/image'
import type { SurveySummary } from './survey-to-register'
import type { RewardType } from '@/types/survey'
import { PointBadge, GifticonBadge, MinuteBadge } from '@/components/ui/badges'

interface Props {
  survey: SurveySummary
  rewardType: RewardType
  // 뱃지 연동 값
  pointValue?: number // 포인트 리워드일 때 표시(1인당 총 지급 포인트)
  gifticonName?: string // 기프티콘 리워드일 때 표시
  estimatedMinutes?: number // 우측 상단 시간 뱃지
}

/** 우측: 등록화면 미리보기(두 개의 프리뷰 카드) */
export function RegistrationPreview({
  survey,
  rewardType,
  pointValue = 0,
  gifticonName = '기프티콘',
  estimatedMinutes = 0,
}: Props) {
  const RewardBadge =
    rewardType === 'point' ? (
      <PointBadge value={Math.max(0, Math.round(pointValue))} />
    ) : (
      <GifticonBadge name={gifticonName} />
    )
  return (
    <section className="mb-8">
      <h2 className="mb-3 text-lg font-semibold">등록화면 미리 보기</h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* 카드 1: 썸네일 + 제목 + 태그 */}
        <article className="rounded-xl border border-gray-200 bg-white p-3">
          <div className="relative">
            <div className="absolute left-2 top-2">{RewardBadge}</div>
            <div className="absolute right-2 top-2">
              <MinuteBadge minutes={estimatedMinutes} />
            </div>

            <div className="h-36 w-full overflow-hidden rounded-md bg-gray-100">
              <Image
                src={survey.thumbnailUrl}
                alt="설문 썸네일"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          <h3 className="mt-3 line-clamp-2 text-sm font-semibold leading-5 text-gray-900">
            {survey.title}
          </h3>

          {survey.tags?.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {survey.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-gray-300 px-2 py-0.5 text-[11px] text-gray-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </article>
      </div>
    </section>
  )
}
