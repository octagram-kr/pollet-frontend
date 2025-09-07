import { Suspense } from 'react'
import SurveyCounterSection from '../components/counter-section'
import SurveyList from './components/survey-list-urgent'

export default function UrgentSurveysPage() {
  return (
    <main>
      <Suspense fallback={<div>로딩중...</div>}>
        <SurveyCounterSection initialTotal={1280} />
      </Suspense>
      <Suspense fallback={null}>
        <SurveyList />
      </Suspense>
    </main>
  )
}
