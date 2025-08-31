import { SurveyCard } from '@/app/components/survey-card'
import { SectionHeader } from '@/app/components/section-header'
import { ResponsiveSliderGrid } from '@/components/ui/responsive-slider-grid'
import { SurveyItem } from '@/types/survey'

export function NewestSurveySection({
  items,
}: {
  items: (SurveyItem & { answers: string[] })[]
}) {
  return (
    <section>
      <SectionHeader
        title="방금 올라온 따끈따끈한 설문조사"
        moreHref="/all-survey?tab=newest"
      />
      <ResponsiveSliderGrid>
        {items.map((s) => (
          <SurveyCard
            key={s.id}
            id={s.id}
            title={s.title}
            thumbnail={s.thumbnail}
            reward={s.reward}
            duration={s.duration}
            tags={s.tags}
            variant="withAnswers"
            answers={s.answers}
          />
        ))}
      </ResponsiveSliderGrid>
    </section>
  )
}
