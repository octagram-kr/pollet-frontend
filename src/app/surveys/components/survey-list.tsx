'use client'

import { useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import SurveyCard, { Survey } from './survey-card'

/** 임시 데이터(연동 시 API 응답으로 교체) */
const MOCK: Survey[] = [
  {
    id: 's1',
    rewardType: 'gifticon', // 'point' | 'gifticon'
    rewardLabel: '커피',
    durationMin: 3,
    thumbnail: null, // or string url
    title: '제목은 두줄까지 보이며 공백포함 30자 제한 있음, 태그 한 줄 5개제한',
    tags: ['AI', '교육', '금융', '헬스케어', '여행', '패션뷰티'],
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
    tags: ['20대', '여자', '직장인', '식품', '금융'],
    options: ['iOS 사용', '안드로이드 사용', '둘다 사용', '해당 없음'],
  },
]

export default function SurveyList({ className }: { className?: string }) {
  const sp = useSearchParams()
  const qview = (sp.get('qview') as 'on' | 'off' | null) ?? 'off'

  // URL에서 선택된 필터/태그를 메모 (칩 색상 판단)
  const selected = useMemo(() => {
    const selTags = new Set((sp.get('tags') || '').split(',').filter(Boolean))
    const filterChips: string[] = []

    // 성별
    const gender = sp.get('gender')
    if (gender === 'male') filterChips.push('남자')
    else if (gender === 'female') filterChips.push('여자')

    // 연령
    const ages = (sp.get('ages') || '').split(',').filter(Boolean)
    filterChips.push(...ages.map((a) => (a === '60+' ? '60대 이상' : `${a}대`)))

    // 직업
    const jobs = (sp.get('jobs') || '').split(',').filter(Boolean)
    filterChips.push(...jobs)

    // 포인트 범위
    const pmin = sp.get('pmin')
    const pmax = sp.get('pmax')
    if (pmin || pmax) filterChips.push(`${pmin ?? 0}개-${pmax ?? '∞'}개`)

    // 기프티콘
    if (sp.get('gifticon') === '1') filterChips.push('기프티콘')

    // 소요시간
    const dur = (sp.get('dur') || '').split(',').filter(Boolean)
    filterChips.push(...dur.map((d) => (d === '30+' ? '30분 이상' : `${d}분`)))

    return { selTags, filterChips }
  }, [sp])

  return (
    <section className="mt-8">
      <ul className="mx-auto max-w-7xl grid grid-cols-4 gap-x-6 gap-y-8">
        {MOCK.map((s) => (
          <li key={s.id}>
            <SurveyCard
              survey={s}
              qview={qview}
              selectedTags={selected.selTags}
              filterChips={selected.filterChips}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}
