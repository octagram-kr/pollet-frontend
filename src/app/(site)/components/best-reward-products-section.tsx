import { SectionHeader } from '@/app/(site)/components/section-header'
import { ProductCard } from '@/app/(site)/components/product-card'
import { ResponsiveSliderGrid } from '@/components/ui/responsive-slider-grid'
import { ProductItem } from '@/types/product'

export function BestRewardProductsSection({
  items,
  cardHeightClass = 'h-[320px] md:h-[340px] lg:h-[360px]',
}: {
  items: ProductItem[]
  cardHeightClass?: string
}) {
  return (
    <section>
      <SectionHeader
        title="BEST! 리워드 추천 상품"
        moreHref="/reward-shop"
      />
      <ResponsiveSliderGrid>
        {items.map((p) => (
          <ProductCard
            key={p.id}
            name={p.name}
            image={p.image}
            pricePoint={p.pricePoint}
            discountPoint={p.discountPoint}
            heightClass={cardHeightClass}
          />
        ))}
      </ResponsiveSliderGrid>
    </section>
  )
}
