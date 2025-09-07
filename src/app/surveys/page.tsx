import { Suspense } from 'react'
import SurveyCounterSection from './components/counter-section'
import TagChipsSection from './components/tag-chips-section'
import SortControlSection from './components/sort-control-section'
import SurveyList from './components/survey-list'

export default function AllSurveysPage() {
  return (
    <main>
      <Suspense fallback={<div>로딩중...</div>}>
        <SurveyCounterSection initialTotal={1280} />
      </Suspense>
      <Suspense fallback={null}>
        <TagChipsSection />
      </Suspense>
      <Suspense fallback={null}>
        <SortControlSection />
      </Suspense>
      <Suspense fallback={null}>
        <SurveyList />
      </Suspense>
    </main>
  )
}
