'use client'

import Image from 'next/image'
import Link from 'next/link'
import { TagList } from '@/app/components/tag-list'
import { CountdownTimer } from '@/app/components/countdown-timer'
import { ProgressSection } from '@/app/components/progress-section'
import { AnswerSection } from '@/app/components/answer-section'
import { PointBadge, MinuteBadge, GifticonBadge } from '@/components/ui/badges'

export type SurveyCardVariant = 'default' | 'withAnswers' | 'urgent'

export interface SurveyCardProps {
  id: string
  title: string
  thumbnail: string
  reward: { type: 'point' | 'gifticon'; value: number; giftName?: string }
  duration: number
  tags?: string[]
  questions?: string[]
  answers?: string[]
  countdownUntil?: string | Date
  progress?: { rate: number; current: number; target: number }
  variant?: SurveyCardVariant
}

export function SurveyCard({
  id,
  title,
  thumbnail,
  reward,
  duration,
  tags = [],
  answers = [],
  countdownUntil,
  progress,
  variant = 'default',
}: SurveyCardProps) {
  const isUrgent = variant === 'urgent'

  /** 본문 영역 렌더링(분기 모음) */
  const renderBody = () => {
    switch (variant) {
      case 'withAnswers':
        return answers.length ? <AnswerSection items={answers} /> : null
      case 'urgent':
        return (
          <div className="space-y-2">
            {tags.length > 0 && <TagList tags={tags} />}
            {progress && (
              <ProgressSection
                rate={progress.rate}
                current={progress.current}
                target={progress.target}
              />
            )}
          </div>
        )
      default:
        return tags.length ? <TagList tags={tags} /> : null
    }
  }

  return (
    <div className="flex flex-col border border-stroke-subtler bg-fill-white rounded-sm">
      <Link
        href={`/surveys/${id}`}
        className="block"
      >
        {/* 썸네일(고정 높이) */}
        <div className="relative rounded-t-sm h-40 w-full overflow-hidden">
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-cover"
          />

          {/* 좌상단: 포인트 or 기프티콘 종류 */}
          <div className="absolute left-2 top-2">
            {reward.type === 'gifticon' ? (
              <GifticonBadge name={reward.giftName ?? '기프티콘'} />
            ) : (
              <PointBadge value={reward.value} />
            )}
          </div>

          {/* 우상단: 소요 시간 */}
          <div className="absolute right-2 top-2">
            <MinuteBadge minutes={duration} />
          </div>

          {/* 하단 좌측: 긴급 타이머(urgent만) */}
          {isUrgent && countdownUntil && (
            <div className="absolute left-2 bottom-2">
              <CountdownTimer until={countdownUntil} />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3 p-4">
          <h3 className="h-[52px] line-clamp-2 text-text-strong text-title-3 font-title-3 leading-title-3">
            {title}
          </h3>
          {renderBody()}
        </div>
      </Link>
    </div>
  )
}
