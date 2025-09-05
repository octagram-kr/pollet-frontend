import { SurveyCard } from '@/app/components/survey-card'
import { SectionHeader } from '@/app/components/section-header'
import { ResponsiveSliderGrid } from '@/components/ui/responsive-slider-grid'
import { SurveyItem } from '@/types/survey'

export function SurveyPreviewSection({
  items,
}: {
  items: (SurveyItem & { answers: string[] })[]
}) {
  return (
    <section>
      <SectionHeader
        title="이런 설문조사는 어때요?"
        moreHref="/all-survey"
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
            variant="withAnswers"
            answers={s.answers}
            tags={s.tags}
          />
        ))}
      </ResponsiveSliderGrid>
    </section>
  )
}
