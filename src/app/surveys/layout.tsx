import type { ReactNode } from 'react'

import SurveyTabs from './components/survey-tabs'

export default function SurveysLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto">
      <SurveyTabs />
      <div>{children}</div>
    </div>
  )
}
