'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { TagList } from '@/components/survey/tag-list'
import { CountdownTimer } from '@/components/survey/countdown-timer'
import { ProgressSection } from '@/components/survey/progress-section'
import { QuestionList } from '@/components/survey/question-list'
import { AnswerSection } from '@/components/survey/answer-section'
import { PointBadge, MinuteBadge, GifticonBadge } from '@/components/ui/badges'
import { cn } from '@/lib/utils'

export type SurveyCardVariant =
  | 'default'
  | 'withQuestions'
  | 'withAnswers'
  | 'urgent'

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
  heightClass?: string // ex) 'h-[360px] md:h-[380px] lg:h-[400px]'
}

export function SurveyCard({
  id,
  title,
  thumbnail,
  reward,
  duration,
  tags = [],
  questions = [],
  answers = [],
  countdownUntil,
  progress,
  variant = 'default',
  heightClass = 'h-[360px] md:h-[380px] lg:h-[400px]',
}: SurveyCardProps) {
  const isUrgent = variant === 'urgent'

  /** 본문 영역 렌더링(분기 모음) */
  const renderBody = () => {
    switch (variant) {
      case 'withAnswers':
        return answers.length ? <AnswerSection items={answers} /> : null
      case 'withQuestions':
        return questions.length ? <QuestionList items={questions} /> : null
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
      default: // 'default'
        return tags.length ? <TagList tags={tags} /> : null
    }
  }

  return (
    <Card className={cn('flex flex-col', heightClass)}>
      <Link
        href={`/survey/${id}`}
        className="block"
      >
        {/* 썸네일(고정 높이) */}
        <div className="relative h-40 w-full overflow-hidden rounded-xl">
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

        {/* 본문 */}
        <div className="flex min-h-0 flex-1 flex-col gap-2 pt-3">
          {/* 제목은 2줄 고정 */}
          <h3 className="line-clamp-2 text-base font-semibold">{title}</h3>
          {/* 분기 렌더 */}
          {renderBody()}
        </div>
      </Link>
    </Card>
  )
}
