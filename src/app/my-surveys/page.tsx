import SearchInput from '@/app/my-surveys/components/search-input'
import CreateSurveyCard from '@/app/my-surveys/components/create-survey-card'
import SurveyList from '@/app/my-surveys/components/survey-list'
import ToolbarControls from '@/app/my-surveys/components/toolbar-controls'
import type { SurveyItem, SurveyCardExtras } from '@/types/survey'

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
  searchParams: Promise<{ q?: string; view?: string; status?: string }>
}) {
  const searchParams = await props.searchParams
  const q = typeof searchParams.q === 'string' ? searchParams.q : ''
  const view: 'list' | 'grid' = searchParams.view === 'grid' ? 'grid' : 'list'
  const status =
    searchParams.status === 'ongoing' || searchParams.status === 'closed'
      ? searchParams.status
      : undefined

  // TODO: q를 이용해 서버에서 실제 데이터 필터/조회
  let items = q ? mock.filter((it) => it.title.includes(q)) : mock
  if (status) {
    items = items.filter(
      (it) => (extrasById[it.id]?.status ?? 'ongoing') === status,
    )
  }

  return (
    <main className="flex-1">
      <div className="mx-auto max-w-6xl flex flex-col min-h-[calc(100vh-280px)] justify-center px-6 space-y-6">
        {/* 페이지 타이틀 */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h2 className="text-2xl font-semibold">내 설문 목록</h2>
          <div className="flex items-center gap-4">
            <SearchInput
              action="/my-surveys"
              defaultValue={q}
              hiddenParams={{
                view: view === 'grid' ? 'grid' : undefined,
                status,
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
        {view === 'list' ? <CreateSurveyCard /> : null}

        {/* 설문 리스트 */}
        <SurveyList
          items={items}
          extrasById={extrasById}
          view={view}
          showNewTile={view === 'grid'}
        />
      </div>
    </main>
  )
}
