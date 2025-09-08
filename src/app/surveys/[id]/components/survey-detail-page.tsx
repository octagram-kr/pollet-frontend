// components/surveys/survey-detail/survey-detail-page.tsx
'use client'

import type { Survey } from '@/types/survey'
import ContentContainer from './content-container'
import SurveyInfoCard from './survey-info-card'
import SurveyIntroSection from './intro-section/survey-intro-section'

export default function SurveyDetailPage({ survey }: { survey: Survey }) {
  return (
    <main className="bg-[#D8F5EE]">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <ContentContainer
          left={<SurveyInfoCard survey={survey} />}
          right={<SurveyIntroSection survey={survey} />}
        />
      </div>
    </main>
  )
}
