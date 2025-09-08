'use client'

import type { Survey } from '@/types/survey'
import ContentContainer from './content-container'
import SurveyInfoCard from './survey-info-card/survey-info-card'
import SurveyIntroSection from './intro-section/survey-intro-section'

export default function SurveyDetailPage({ survey }: { survey: Survey }) {
  return (
    <main className="bg-[#D8F5EE] min-h-[calc(100vh-var(--header-h))]">
      <div className="mx-auto py-23 max-w-[1200px]">
        <ContentContainer
          left={<SurveyInfoCard survey={survey} />}
          right={<SurveyIntroSection survey={survey} />}
        />
      </div>
    </main>
  )
}
