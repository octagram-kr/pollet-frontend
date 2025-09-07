'use client'

import { useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import SurveyCard, { Survey, UserSelection } from './survey-card'

/** 임시 데이터(연동 시 API 응답으로 교체) */
const MOCK: Survey[] = [
  {
    id: 's1',
    rewardType: 'gifticon', // 'point' | 'gifticon'
    rewardLabel: '커피',
    durationMin: 3,
    thumbnail: null,
    title: '제목은 두줄까지 보이며 공백포함 30자 제한 있음, 태그 한 줄 5개제한',
    gender: 'female',
    age: '20',
    job: '대학생',
    tag1: 'AI',
    tag2: '여행',
    options: [
      '항목은 공백포함 15자 제한 1줄만보임',
      '항목은 공백포함 15자 제한 1줄만보임',
      '항목은 공백포함 15자 제한 1줄만보임',
      '항목은 공백포함 15자 제한 1줄만보임',
    ],
  },
  {
    id: 's2',
    rewardType: 'point',
    rewardLabel: '1,000',
    durationMin: 5,
    thumbnail: null,
    title: '사용자 대상 여부 판단용 질문이 포함된 설문',
    gender: 'male',
    age: '30',
    job: '직장인',
    tag1: '라이프스타일',
    tag2: '웰빙',
    options: ['예', '아니오', '모름'],
  },
]

export default function SurveyList({ className }: { className?: string }) {
  const sp = useSearchParams()
  const qview = (sp.get('qview') as 'on' | 'off' | null) ?? 'off'

  // 사용자 선택 상태
  const selection = useMemo<UserSelection>(() => {
    // 1) 성별
    const gender =
      (sp.get('gender') as 'male' | 'female' | 'all' | null) ?? 'all'

    // 2) 연령
    const age = sp.get('age') as string | null

    // 3) 직업
    const job = sp.get('job') || null

    // 4~5) 태그
    const selectedTags = new Set(
      (sp.get('tags') || '').split(',').filter(Boolean),
    )
    return { gender, age, job, selectedTags }
  }, [sp])

  return (
    <section className={className}>
      <ul className="mt-8 mx-auto max-w-7xl grid grid-cols-4 gap-x-6 gap-y-8">
        {MOCK.map((s) => (
          <li key={s.id}>
            <SurveyCard
              survey={s}
              qview={qview}
              selection={selection}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}
