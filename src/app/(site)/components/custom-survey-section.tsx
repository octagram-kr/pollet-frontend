import { SurveyCard } from '@/app/(site)/components/survey-card'
import { SectionHeader } from '@/app/(site)/components/section-header'
import { ResponsiveSliderGrid } from '@/components/ui/responsive-slider-grid'
import { SurveyItem } from '@/types/survey'

export function CustomSurveySection({
  items,
  cardHeightClass = 'h-[380px] md:h-[400px] lg:h-[420px]',
}: {
  items: SurveyItem[]
  cardHeightClass?: string
}) {
  return (
    <section>
      <SectionHeader
        title="맞춤 설문조사"
        moreHref="/all-survey?tab=custom"
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
            variant="default"
            heightClass={cardHeightClass}
          />
        ))}
      </ResponsiveSliderGrid>
    </section>
  )
}
