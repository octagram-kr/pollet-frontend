import SurveyCounterSection from './components/counter-seciton'
import TagChipsSection from './components/tag-chips-section'
import SortControlSection from './components/sort-control-section'
import SurveyList from './components/survey-list'

export default function SurveysPage() {
  return (
    <>
      <SurveyCounterSection initialTotal={1280} />
      <TagChipsSection />
      <SortControlSection />
      <SurveyList />
    </>
  )
}
