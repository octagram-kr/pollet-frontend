'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import {
  GiftIcon,
  StarcandyIcon,
  CelebrateIcon,
  SadIcon,
  RightIcon,
} from '@/components/icons'

export type UserSelection = {
  gender: 'male' | 'female' | 'all' | null
  age: string | null
  job: string | null
  selectedTags: Set<string>
}

export type SurveyCardSlots = {
  overlayBottomLeft?: React.ReactNode
  footer?: React.ReactNode
}

export type Survey = {
  id: string
  rewardType: 'point' | 'gifticon'
  rewardLabel: string
  durationMin: number
  thumbnail: string | null
  title: string
  // 설문 고유 속성
  gender: 'male' | 'female'
  age: '10' | '20' | '30' | '40' | '50' | '60+'
  job: string
  tag1: string
  tag2: string
  // 질문 보기 on
  options?: string[]
  // 마감임박용 데이터
  endsAt?: string | Date
  targetCount?: number
  currentCount?: number
}

type Chip = {
  label: string
  tone: 'mint' | 'pink' | 'muted'
  matched: boolean
  order: number
}

export default function SurveyCard({
  survey,
  qview, // 'on' | 'off'
  selection,
  slots,
  showUrgentUI = false,
}: {
  survey: Survey
  qview: 'on' | 'off'
  selection: UserSelection
  slots?: SurveyCardSlots
  showUrgentUI?: boolean
}) {
  // 질문 선택 결과: 'unknown' 최초, 이후 'eligible' | 'ineligible'
  const [result, setResult] = useState<'unknown' | 'eligible' | 'ineligible'>(
    'unknown',
  )
  // 제목
  const title = useMemo(() => limitChars(survey.title, 30), [survey.title])

  // 칩
  const chips = useMemo(() => {
    const tagSet = selection.selectedTags ?? new Set<string>()

    // helper: tone 계산
    const getTone = (
      cond: boolean,
      match: boolean,
      type: 'mint' | 'pink',
    ): 'mint' | 'pink' | 'muted' => (cond ? (match ? type : 'muted') : 'muted')

    // 1) 성별
    const genderSelected =
      selection.gender !== null && selection.gender !== 'all'
    const genderMatch = genderSelected && selection.gender === survey.gender
    const genderChip: Chip = {
      label: survey.gender === 'male' ? '남자' : '여자',
      tone: getTone(genderSelected, genderMatch, 'mint'),
      matched: Boolean(genderMatch),
      order: 0,
    }

    // 2) 연령
    const ageSelected = !!selection.age
    const ageMatch = ageSelected && selection.age === survey.age
    const ageLabel = survey.age === '60+' ? '60대 이상' : `${survey.age}대`
    const ageChip: Chip = {
      label: ageLabel,
      tone: getTone(ageSelected, ageMatch, 'mint'),
      matched: Boolean(ageMatch),
      order: 1,
    }

    // 3) 직업
    const jobSelected = !!selection.job
    const jobMatch = jobSelected && selection.job === survey.job
    const jobChip: Chip = {
      label: survey.job,
      tone: getTone(jobSelected, jobMatch, 'mint'),
      matched: Boolean(jobMatch),
      order: 2,
    }

    // 4) 태그1
    const hasTagFilter = tagSet.size > 0
    const tag1Match = hasTagFilter && tagSet.has(survey.tag1)
    const tag1Chip: Chip = {
      label: `#${survey.tag1}`,
      tone: getTone(hasTagFilter, tag1Match, 'pink'),
      matched: Boolean(tag1Match),
      order: 3,
    }

    // 5) 태그2
    const tag2Match = hasTagFilter && tagSet.has(survey.tag2)
    const tag2Chip: Chip = {
      label: `#${survey.tag2}`,
      tone: getTone(hasTagFilter, tag2Match, 'pink'),
      matched: Boolean(tag2Match),
      order: 4,
    }

    return [genderChip, ageChip, jobChip, tag1Chip, tag2Chip].sort((a, b) => {
      if (a.matched !== b.matched) return a.matched ? -1 : 1
      return a.order - b.order
    })
  }, [survey, selection])

  // 옵션(최대 4, 15자, 1줄)
  const options = useMemo(
    () => (survey.options ?? []).slice(0, 4).map((o) => limitChars(o, 15)),
    [survey.options],
  )

  return (
    <Link
      href={`/surveys/${survey.id}`}
      className="block"
    >
      <article className="rounded-sm border-2 border-stroke-subtler bg-fill-white shadow-md hover:cursor-pointer">
        {/* 썸네일 + 좌/우 상단 뱃지 */}
        <div className="relative aspect-[4/3]">
          {/* reward */}
          <span
            className={cn(
              'absolute left-3 top-4 inline-flex items-center gap-0.5 rounded-xl border border-stroke-primary bg-fill-primary-subtle px-2 text-label-5 font-label-5 leading-label-5 tracking-label-5',
            )}
          >
            {/* 간단한 아이콘 */}
            {survey.rewardType === 'gifticon' ? (
              <GiftIcon className="size-5 fill-fill-primary-active" />
            ) : (
              <StarcandyIcon className="size-5 fill-fill-primary-active" />
            )}
            {survey.rewardLabel}
          </span>

          {/* duration */}
          <span className="absolute right-3 top-4 inline-flex items-center gap-0.5 rounded-xl border border-stroke-subtle bg-fill-white px-2 py-0.5 text-label-6 font-label-6 leading-label-6 text-text-default">
            <p className="text-label-5 font-label-5 leading-label-5 tracking-label-5 text-text-secondary">
              {survey.durationMin}
            </p>
            분
          </span>

          {/* 썸네일 이미지 자리(있으면 Image 대체) */}
          {survey.thumbnail ? (
            <Image
              src={'/images/sample-1.png'}
              alt=""
              fill
            />
          ) : null}

          {/* 타이머 배지 */}
          {showUrgentUI && slots?.overlayBottomLeft && (
            <div className="absolute left-3 bottom-3">
              {slots.overlayBottomLeft}
            </div>
          )}
        </div>

        {/* 본문 */}
        <div className="space-y-3 p-4">
          {/* 제목 */}
          <h3
            className={cn(
              'line-clamp-2 text-title-3 font-title-3 leading-title-3 text-text-strong',
            )}
            title={survey.title}
          >
            {title}
          </h3>

          {/* qview off → 칩 / qview on → 옵션 or 결과문구 */}
          {qview === 'off' ? (
            <ChipsOneLine chips={chips} />
          ) : (
            <QuizArea
              options={options}
              result={result}
              onPick={(idx) => {
                // TODO: 실제 로직으로 대체
                // 지금은 짝수 인덱스 선택 → eligible, 홀수 → ineligible
                setResult(idx % 2 === 0 ? 'eligible' : 'ineligible')
              }}
            />
          )}
          {/* 마감임박용 진행도 */}
          {showUrgentUI && slots?.footer}
        </div>
      </article>
    </Link>
  )
}

/* ------------------------------------------------------------------ */
/* Sub components                                                     */
/* ------------------------------------------------------------------ */

function ChipsOneLine({ chips }: { chips: Chip[] }) {
  return (
    <div className={cn('relative overflow-hidden')}>
      <div
        className={cn('flex flex-nowrap items-center gap-2', 'overflow-hidden')}
      >
        {chips.map((c, i) => (
          <span
            key={`${c.label}-${i}`}
            className={cn(
              'shrink-0 inline-flex items-center px-0.5 text-text-default',
              c.tone === 'mint' && ' bg-bg-mint-lighter',
              c.tone === 'pink' && ' bg-bg-pink-light',
              c.tone === 'muted' && 'text-text-subtle',
            )}
          >
            <p className="text-label-8 font-label-8 leading-label-8 tracking-label-8">
              {c.label}
            </p>
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-bg-base to-transparent" />
    </div>
  )
}

function QuizArea({
  options,
  result,
  onPick,
}: {
  options: string[]
  result: 'unknown' | 'eligible' | 'ineligible'
  onPick: (idx: number) => void
}) {
  if (result !== 'unknown') {
    const ok = result === 'eligible'
    return (
      <div className="rounded-2xl border-2 border-stroke-subtle bg-bg-subtle px-2 py-4">
        <div className="mb-1 flex items-center justify-center">
          {/* 상태 아이콘 */}
          {ok ? (
            <CelebrateIcon className="fill-fill-deep" />
          ) : (
            <SadIcon className="fill-fill-deep" />
          )}
        </div>

        <p className="text-center text-body-5 font-body-5 leading-body-5 tracking-body-5 text-text-default">
          {ok
            ? '축하드려요! 설문 대상입니다.'
            : '아쉽지만 설문 대상자가 아닙니다.'}
          <br />
          {ok
            ? '지금 바로 설문조사에 참여하세요!'
            : '다른 설문을 찾아보는 건 어때요?'}
        </p>

        <div className="mt-2 text-center">
          <a
            href="#"
            className={cn(
              'inline-flex items-center gap-1 text-label-8 font-label-8 leading-label-8 tracking-label-8 text-text-primary hover:cursor-pointer underline',
            )}
          >
            {ok ? '설문하러 가기' : '다른 설문보러 가기'}
            <RightIcon className="w-4 fill-fill-deep" />
          </a>
        </div>
      </div>
    )
  }

  // 아직 결과 전: 선택지
  return (
    <ul className="space-y-1">
      {options.map((o, idx) => (
        <li key={idx}>
          <button
            type="button"
            onClick={() => onPick(idx)}
            className="block w-full rounded-xs border border-stroke-subtle px-3 py-1 text-left text-body-6 font-body-6 leading-body-6 tracking-body-6 text-text-default hover:cursor-pointer"
            title={o}
          >
            <span className="line-clamp-1">{o}</span>
          </button>
        </li>
      ))}
    </ul>
  )
}

/* ------------------------------------------------------------------ */
/* helpers                                                            */
/* ------------------------------------------------------------------ */

function limitChars(s: string, max: number) {
  if (s.length <= max) return s
  return s.slice(0, max).trimEnd() + '…'
}
