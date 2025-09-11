import { SurveyCard } from '@/app/components/survey-card'
import { SectionHeader } from '@/app/components/section-header'
import { ResponsiveSliderGrid } from '@/components/ui/responsive-slider-grid'
import { SurveyItem } from '@/types/survey'

export function CustomSurveySection({ items }: { items: SurveyItem[] }) {
  return (
    <section>
      <SectionHeader
        title="맞춤 설문조사"
        moreHref="/surveys/for-you"
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
          />
        ))}
      </ResponsiveSliderGrid>
    </section>
  )
}
