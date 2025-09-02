import { SurveyCard } from '@/app/(site)/components/survey-card'
import { SectionHeader } from '@/app/(site)/components/section-header'
import { ResponsiveSliderGrid } from '@/components/ui/responsive-slider-grid'
import { SurveyItem } from '@/types/survey'

export function WaitingSurveySection({
  items,
}: {
  items: (SurveyItem & { answers: string[] })[]
}) {
  return (
    <section>
      <SectionHeader
        title="응답자를 기다리고 있어요!"
        subtitle="기간이 설정됐지만 아직 응답자가 충분하지 않은 설문이에요"
        moreHref="/all-survey?tab=waiting"
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
