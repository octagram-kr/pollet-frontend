import SurveyCard from './survey-card'
import SurveyTile from './survey-tile'
import CreateSurveyTile from './create-survey-tile'
import type { SurveyItem, SurveyCardExtras } from '@/types/survey'

interface Props {
  items: SurveyItem[]
  /** key = survey.id */
  extrasById?: Record<string, SurveyCardExtras>
  view?: 'list' | 'grid'
  showNewTile?: boolean
}

export default function SurveyList({
  items,
  extrasById,
  view = 'list',
  showNewTile = false,
}: Props) {
  if (!items.length) {
    return (
      <div className="text-center text-sm text-gray-500 py-16">
        등록된 설문이 없습니다.
      </div>
    )
  }
  if (view === 'grid') {
    return (
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {showNewTile && <CreateSurveyTile />}
        {items.map((it) => (
          <SurveyTile
            key={it.id}
            item={it}
            extras={extrasById?.[it.id]}
          />
        ))}
      </ul>
    )
  }
  return (
    <ul className="space-y-3">
      {items.map((it) => (
        <SurveyCard
          key={it.id}
          item={it}
          extras={extrasById?.[it.id]}
        />
      ))}
    </ul>
  )
}
