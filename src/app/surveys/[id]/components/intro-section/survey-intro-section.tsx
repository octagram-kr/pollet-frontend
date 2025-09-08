'use client'

import type { Survey } from '@/types/survey'
import SurveyTitle from './survey-title'
import TagList from './tag-list'
import SurveyDescription from './survey-description'
import StartSurveyButton from './start-survey-button'

export default function SurveyIntroSection({ survey }: { survey: Survey }) {
  return (
    <section className="flex h-full flex-col rounded-r-lg bg-white pl-6 pr-15 py-12">
      <SurveyTitle title={survey.title} />
      <TagList tags={survey.tags} />
      <div className="mt-auto pt-6">
        <SurveyDescription text={survey.description} />
      </div>

      <div className="mt-auto pt-6">
        <StartSurveyButton surveyId={survey.id} />
      </div>
    </section>
  )
}
