'use client'

import type { Survey } from '@/types/survey'
import SurveyTitle from './survey-title'
import TagList from './tag-list'
import SurveyDescription from './survey-description'
import StartSurveyButton from './start-survey-button'

export default function SurveyIntroSection({ survey }: { survey: Survey }) {
  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm md:p-8">
      <SurveyTitle title={survey.title} />
      <TagList tags={survey.tags} />
      <SurveyDescription text={survey.description} />
      <StartSurveyButton surveyId={survey.id} />
    </section>
  )
}
