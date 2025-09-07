'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import {
  GiftIcon,
  StarcandyIcon,
  CelebrateIcon,
  SadIcon,
  RightIcon,
} from '@/components/icons'

export type Survey = {
  id: string
  rewardType: 'point' | 'gifticon'
  rewardLabel: string // 뱃지 표시 텍스트
  durationMin: number
  thumbnail: string | null
  title: string
  tags: string[]
  options?: string[] // qview=on일 때 노출(최대 4개)
}

export default function SurveyCard({
  survey,
  qview, // 'on' | 'off'
  selectedTags, // URL에서 선택된 태그
  filterChips, // URL에서 유도된 필터 칩 문자열 배열
}: {
  survey: Survey
  qview: 'on' | 'off'
  selectedTags: Set<string>
  filterChips: string[]
}) {
  // 질문 선택 결과: 'unknown' 최초, 이후 'eligible' | 'ineligible'
  const [result, setResult] = useState<'unknown' | 'eligible' | 'ineligible'>(
    'unknown',
  )

  // 제목 30자 제한(공백 포함) + 2줄 클램프
  const title = useMemo(() => limitChars(survey.title, 30), [survey.title])

  // 칩(최대 5): 1) 필터칩(민트) 우선 → 2) 선택된 태그(분홍) → 3) 나머지 태그(회색)
  const chips = useMemo(() => {
    const res: { label: string; tone: 'mint' | 'pink' | 'muted' }[] = []
    for (const f of filterChips) {
      if (res.length >= 5) break
      res.push({ label: f, tone: 'mint' })
    }
    for (const t of survey.tags) {
      if (res.length >= 5) break
      if (
        selectedTags.has(t) &&
        !res.some((c) => c.label === `#${t}` || c.label === t)
      ) {
        res.push({ label: `#${t}`, tone: 'pink' })
      }
    }
    for (const t of survey.tags) {
      if (res.length >= 5) break
      if (!selectedTags.has(t)) {
        res.push({ label: `#${t}`, tone: 'muted' })
      }
    }
    return res.slice(0, 5)
  }, [filterChips, selectedTags, survey.tags])

  // 옵션(최대 4, 15자, 1줄)
  const options = useMemo(
    () => (survey.options ?? []).slice(0, 4).map((o) => limitChars(o, 15)),
    [survey.options],
  )

  return (
    <div className="rounded-sm border-2 border-stroke-subtler bg-fill-white shadow-md hover:stroke-stroke-primary hover:cursor-pointer">
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
          // <img
          //   src={survey.thumbnail}
          //   alt=""
          //   className="absolute inset-0 h-full w-full object-cover"
          // />
          <Image
            src={'/images/sample-1.png'}
            alt=""
            fill
          />
        ) : null}
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
          <ChipsRow chips={chips} />
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
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Sub components                                                     */
/* ------------------------------------------------------------------ */

function ChipsRow({
  chips,
}: {
  chips: { label: string; tone: 'mint' | 'pink' | 'muted' }[]
}) {
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
