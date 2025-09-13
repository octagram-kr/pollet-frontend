'use client'

import { useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import SurveyCard, { Survey, UserSelection } from './survey-card'
import Pagination from './pagnation'

const PAGE_SIZE = 12

/** 임시 데이터(연동 시 API 응답으로 교체) */
const MOCK: Survey[] = Array.from({ length: 100 }).map((_, i) => ({
  id: `s${i + 1}`,
  rewardType: i % 2 ? 'point' : 'gifticon',
  rewardLabel: i % 2 ? `${(i + 1) * 100}P` : '커피',
  durationMin: [3, 5, 10, 15][i % 4],
  thumbnail: ['AI', '교육', '금융', '헬스케어'][i % 4],
  title: `카드 ${i + 1} — 제목은 두줄까지 보이며 30자 제한`,
  gender: i % 3 === 0 ? 'male' : 'female',
  age: (['10', '20', '30', '40', '50', '60+'] as const)[i % 6],
  job: ['대학생', '직장인', '프리랜서', '자영업자'][i % 4],
  tag1: ['AI', '교육', '금융', '헬스케어'][i % 4],
  tag2: ['여행', '라이프스타일', '엔터테인먼트', '웰빙'][i % 4],
  options: ['옵션 A', '옵션 B', '옵션 C', '옵션 D'],
}))

export type SurveyListFilters = {
  gender?: 'male' | 'female'
  age?: string | null
  job?: string | null
  tags?: string[]
}

function countMatchedChips(s: Survey, filters?: SurveyListFilters) {
  if (!filters) return 0
  let cnt = 0
  if (filters.gender && s.gender === filters.gender) cnt++
  if (filters.age && s.age === filters.age) cnt++
  if (filters.job && s.job === filters.job) cnt++
  const tags = new Set((filters.tags || []).filter(Boolean))
  if (tags.size) {
    if (tags.has(s.tag1)) cnt++ // 태그1 일치 시 +1
    if (tags.has(s.tag2)) cnt++ // 태그2 일치 시 +1
  }
  cnt++
  return cnt
}

export default function SurveyList({
  items = MOCK,
  filters,
  className,
}: {
  items?: Survey[]
  filters?: SurveyListFilters
  className?: string
}) {
  const sp = useSearchParams()
  const qview = (sp.get('qview') as 'on' | 'off' | null) ?? 'off'

  // 사용자 선택 상태
  const selection: UserSelection = {
    // 1) 성별
    gender: (sp.get('gender') as 'male' | 'female' | 'all' | null) ?? 'all',
    // 2) 연령
    age: sp.get('age'),
    // 3) 직업
    job: sp.get('job'),
    // 4~5) 태그
    selectedTags: new Set((sp.get('tags') || '').split(',').filter(Boolean)),
  }
  const filtered = useMemo(() => {
    if (!filters) return items
    const tagSet = new Set((filters.tags || []).filter(Boolean))

    const base = items.filter((s) => {
      if (filters.gender && s.gender !== filters.gender) return false
      if (filters.age && s.age !== filters.age) return false
      if (filters.job && s.job !== filters.job) return false
      if (tagSet.size > 0 && !(tagSet.has(s.tag1) || tagSet.has(s.tag2)))
        return false
      return true
    })

    return base
      .map((s, i) => ({ s, i, score: countMatchedChips(s, filters) }))
      .sort((a, b) => b.score - a.score || a.i - b.i)
      .map(({ s }) => s)
  }, [items, filters])

  const page = Math.max(1, Number(sp.get('page') || 1))
  const total = filtered.length
  const start = (page - 1) * PAGE_SIZE
  const end = Math.min(start + PAGE_SIZE, total)
  const pageItems = filtered.slice(start, end)

  return (
    <section className={className}>
      {pageItems.length === 0 ? (
        <div className="mx-auto max-w-7xl py-12 text-center text-text-subtle">
          조건에 맞는 설문이 없어요. 필터를 변경해 보세요.
        </div>
      ) : (
        <ul className="mt-8 mx-auto max-w-7xl grid grid-cols-4 gap-x-6 gap-y-8">
          {pageItems.map((s) => (
            <li key={s.id}>
              <SurveyCard
                survey={s}
                qview={qview}
                selection={selection}
              />
            </li>
          ))}
        </ul>
      )}
      <Pagination
        total={total}
        pageSize={PAGE_SIZE}
        className="mx-auto max-w-7xl"
      />
    </section>
  )
}
