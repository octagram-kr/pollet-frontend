import { Suspense } from 'react'
import SurveyCounterSection from '../components/counter-seciton'
import RecommendationBannerSection from './components/recommendation-banner-seciton'
import SortControlSection from '../components/sort-control-section'
import SurveyList, { SurveyListFilters } from '../components/survey-list'

export default function ForYouSurveysPage() {
  const profile = {
    username: '과제울렁증극복하기',
    gender: 'female' as const,
    age: '20', // 내부 표준값(예: '20' → 화면에선 '20대'로 표기)
    job: '대학생',
    tags: ['AI', '여행', '패션뷰티'], // 최근 참여 태그 3개
  }

  const filters: SurveyListFilters = {
    gender: profile.gender,
    age: profile.age,
    job: profile.job,
    tags: profile.tags,
  }

  return (
    <main>
      <Suspense fallback={<div>로딩중...</div>}>
        <SurveyCounterSection initialTotal={1280} />
      </Suspense>
      <Suspense fallback={null}>
        <RecommendationBannerSection
          username={profile.username}
          gender={profile.gender}
          age={`${profile.age}대`}
          job={profile.job}
          tags={profile.tags}
        />
      </Suspense>
      <Suspense fallback={null}>
        <SortControlSection />
      </Suspense>
      <Suspense fallback={null}>
        <SurveyList filters={filters} />
      </Suspense>
    </main>
  )
}
