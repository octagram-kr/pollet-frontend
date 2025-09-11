import Link from 'next/link'
import SearchInput from '@/app/my-surveys/components/search-input'
import CreateSurveyCard from '@/app/my-surveys/components/create-survey-card'
import SurveyList from '@/app/my-surveys/components/survey-list'
import ToolbarControls from '@/app/my-surveys/components/toolbar-controls'
import type { SurveyItem, SurveyCardExtras } from '@/types/survey'
import { LeftIcon, RightIcon } from '@/components/icons'

// 데모용 목데이터 (API 연동 전)
const mock: SurveyItem[] = [
  {
    id: '1',
    title: '여름 아이스커피 취향 설문',
    thumbnail: '/images/sample-1.png',
    reward: { type: 'gifticon', value: 1, giftName: '커피' },
    duration: 3,
    tags: ['음료', '취향'],
  },
  {
    id: '2',
    title: '앱 사용성 만족도 조사',
    thumbnail: '/images/sample-2.png',
    reward: { type: 'point', value: 500 },
    duration: 5,
  },
  {
    id: '3',
    title: '주간 뉴스레터 피드백',
    thumbnail: '/images/sample-3.png',
    reward: { type: 'point', value: 300 },
    duration: 4,
  },
]

// 카드 보조정보 (선택)
const extrasById: Record<string, SurveyCardExtras> = {
  '1': {
    status: 'ongoing',
    period: { startAt: '2025-01-01', endAt: null },
    participants: { current: 120, target: 200 },
  },
  '2': {
    status: 'closed',
    period: { startAt: '2025-02-01', endAt: '2025-03-01' },
    participants: { current: 80, target: 80 },
  },
  '3': {
    status: 'closed',
    period: { startAt: '2025-03-10', endAt: '2025-03-31' },
    participants: { current: 45, target: 100 },
  },
}

export default async function Page(props: {
  searchParams: Promise<{
    q?: string
    view?: string
    status?: string
    page?: string
  }>
}) {
  const searchParams = await props.searchParams
  const q = typeof searchParams.q === 'string' ? searchParams.q : ''
  const view: 'list' | 'grid' = searchParams.view === 'grid' ? 'grid' : 'list'
  const status =
    searchParams.status === 'ongoing' || searchParams.status === 'closed'
      ? searchParams.status
      : undefined
  const pageRaw = Number.parseInt(searchParams.page ?? '1', 10)
  const page = Number.isFinite(pageRaw) && pageRaw > 0 ? pageRaw : 1

  // TODO: q를 이용해 서버에서 실제 데이터 필터/조회
  let items = q ? mock.filter((it) => it.title.includes(q)) : mock
  if (status) {
    items = items.filter(
      (it) => (extrasById[it.id]?.status ?? 'ongoing') === status,
    )
  }

  const LIST_COUNT = 5 // 리스트: 항상 5개
  const GRID_FIRST = 7
  const GRID_NEXT = 8 // 그리드: 1p=7, 이후 8

  const total = items.length

  const totalPages =
    view === 'list'
      ? Math.max(1, Math.ceil(total / LIST_COUNT))
      : total <= GRID_FIRST
        ? 1
        : 1 + Math.ceil((total - GRID_FIRST) / GRID_NEXT)

  const safePage = Math.min(Math.max(page, 1), totalPages)

  const offset =
    view === 'list'
      ? (safePage - 1) * LIST_COUNT
      : safePage === 1
        ? 0
        : GRID_FIRST + (safePage - 2) * GRID_NEXT

  const limit =
    view === 'list' ? LIST_COUNT : safePage === 1 ? GRID_FIRST : GRID_NEXT

  const pageItems = items.slice(offset, offset + limit)

  // 링크 빌더 (기존 쿼리 유지)
  const buildHref = (p: number) => {
    const params = new URLSearchParams()
    if (q) params.set('q', q)
    if (view === 'grid') params.set('view', 'grid')
    if (status) params.set('status', status)
    if (p > 1) params.set('page', String(p))
    return `/my-surveys${params.toString() ? `?${params.toString()}` : ''}`
  }

  const shownTotalPages = Math.max(totalPages, 1)
  const pages = Array.from({ length: shownTotalPages }, (_, i) => i + 1)

  return (
    <main className="mt-[76px] mx-auto max-w-7xl flex flex-col h-full justify-center px-6">
      {/* 페이지 타이틀 */}
      <div className="mb-[35px] flex items-center justify-between flex-wrap gap-4">
        <h2 className="text-heading-2 font-heading-2 leading-heading-2 tracking-heading-2 text-text-default">
          내 설문 목록
        </h2>
        <div className="flex items-center gap-4">
          <SearchInput
            action="/my-surveys"
            defaultValue={q}
            hiddenParams={{
              view: view === 'grid' ? 'grid' : undefined,
              status,
              page: safePage > 1 ? String(safePage) : undefined,
            }}
          />
          <ToolbarControls
            path="/my-surveys"
            q={q}
            view={view}
            status={status}
          />
        </div>
      </div>

      {/* 새 설문 만들기 카드 */}
      {view === 'list' ? <CreateSurveyCard className="mb-8" /> : null}

      {/* 설문 리스트 */}
      <SurveyList
        items={pageItems}
        extrasById={extrasById}
        view={view}
        showNewTile={view === 'grid' && safePage === 1}
      />

      <nav
        aria-label="페이지 탐색"
        className="mt-[52px] mb-[75px] flex items-center justify-center gap-2"
      >
        <Link
          href={buildHref(Math.max(safePage - 1, 1))}
          aria-disabled={safePage === 1}
          className={`p-2 ${
            safePage === 1
              ? 'pointer-events-none cursor-not-allowed text-text-subtle'
              : ' hover:bg-fill-subtle'
          }`}
        >
          <LeftIcon className="size-5" />
        </Link>

        {pages.map((p) => (
          <Link
            key={p}
            href={buildHref(p)}
            aria-current={p === safePage ? 'page' : undefined}
            className={`p-2 text-label-4 font-label-4 leading-label-4 ${
              p === safePage ? ' text-text-default' : 'text-text-subtler'
            }`}
          >
            {p}
          </Link>
        ))}

        <Link
          href={buildHref(Math.min(safePage + 1, shownTotalPages))}
          aria-disabled={safePage === shownTotalPages}
          className={`p-2 ${
            safePage === shownTotalPages
              ? 'pointer-events-none cursor-not-allowed text-text-subtle'
              : 'hover:bg-fill-subtle'
          }`}
        >
          <RightIcon className="size-5" />
        </Link>
      </nav>
    </main>
  )
}
