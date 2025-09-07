'use client'

import { useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import SurveyCard, { Survey, UserSelection } from '../../components/survey-card'
import CountdownBadge from './countdown-badge'
import TargetProgress from './target-progress'
import Pagination from '../../components/pagnation'

const PAGE_SIZE = 12
const URGENT_WINDOW_MS = 120 * 60 * 60 * 1000 // 120시간 = 5일

/** 임시 데이터(연동 시 API 응답으로 교체) */
const MOCK: Survey[] = Array.from({ length: 100 }).map((_, i) => ({
  id: `s${i + 1}`,
  rewardType: i % 2 ? 'point' : 'gifticon',
  rewardLabel: i % 2 ? `${(i + 1) * 100}P` : '커피',
  durationMin: [3, 5, 10, 15][i % 4],
  thumbnail: null,
  title: `카드 ${i + 1} — 제목은 두줄까지 보이며 30자 제한`,
  gender: i % 3 === 0 ? 'male' : 'female',
  age: (['10', '20', '30', '40', '50', '60+'] as const)[i % 6],
  job: ['대학생', '직장인', '프리랜서', '자영업자'][i % 4],
  tag1: ['AI', '교육', '금융', '헬스케어'][i % 4],
  tag2: ['여행', '라이프스타일', '엔터테인먼트', '웰빙'][i % 4],
  // 마감시각: 1시간 ~ 7일 사이로 흩뿌림
  endsAt: new Date(Date.now() + (i + 1) * 3.5 * 60 * 60 * 1000).toISOString(),
  // 달성도: 일부는 이미 달성되도록 섞음
  currentCount: 50 + (i % 8) * 12,
  targetCount: 100,
  options: ['옵션 A', '옵션 B', '옵션 C', '옵션 D'],
}))

// "마감임박" 조건: (1) 마감까지 120시간 이내 & 아직 마감 전, (2) current < target
function isUrgent(s: Survey, now = Date.now()) {
  if (!s.endsAt || s.targetCount == null || s.currentCount == null) return false
  const end = new Date(s.endsAt).getTime()
  if (Number.isNaN(end)) return false
  const current = Number(s.currentCount)
  const target = Number(s.targetCount)
  if (!Number.isFinite(current) || !Number.isFinite(target) || target <= 0)
    return false
  if (current >= target) return false
  const remain = end - now
  return remain > 0 && remain <= URGENT_WINDOW_MS
}

export default function SurveyListUrgent({
  className,
}: {
  className?: string
}) {
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

  // 마감임박 기준으로 필터 + 남은 시간 오름차순 정렬
  const urgentItems = useMemo(() => {
    const now = Date.now()
    return MOCK.filter((s) => isUrgent(s, now)).sort(
      (a, b) => new Date(a.endsAt!).getTime() - new Date(b.endsAt!).getTime(),
    )
  }, [])

  const page = Math.max(1, Number(sp.get('page') || 1))
  const total = MOCK.length
  const start = (page - 1) * PAGE_SIZE
  const end = Math.min(start + PAGE_SIZE, total)
  const pageItems = urgentItems.slice(start, end)

  return (
    <section className={className}>
      <ul className="mt-8 mx-auto max-w-7xl grid grid-cols-4 gap-x-6 gap-y-8">
        {pageItems.map((s) => (
          <li key={s.id}>
            <SurveyCard
              survey={s}
              qview={qview}
              selection={selection}
              showUrgentUI
              slots={{
                overlayBottomLeft: s.endsAt ? (
                  <CountdownBadge endsAt={s.endsAt} />
                ) : null,
                footer:
                  s.currentCount != null && s.targetCount != null ? (
                    <TargetProgress
                      current={s.currentCount}
                      target={s.targetCount}
                    />
                  ) : null,
              }}
            />
          </li>
        ))}
      </ul>
      <Pagination
        total={total}
        pageSize={PAGE_SIZE}
        className="mx-auto max-w-7xl"
      />
    </section>
  )
}
