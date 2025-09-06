import SurveyCounterSection from './components/counter-seciton'
import TagChipsSection from './components/tag-chips-section'

export default function SurveysPage() {
  return (
    <>
      <SurveyCounterSection initialTotal={1280} />
      <TagChipsSection />
    </>
  )
}
