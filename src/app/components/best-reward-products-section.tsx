import { SectionHeader } from '@/app/components/section-header'
import { ProductCard } from '@/app/components/product-card'
import { ResponsiveSliderGrid } from '@/components/ui/responsive-slider-grid'
import { ProductItem } from '@/types/product'

export function BestRewardProductsSection({ items }: { items: ProductItem[] }) {
  return (
    <section>
      <SectionHeader
        title="BEST! 리워드 추천 상품"
        moreHref="/"
      />
      <ResponsiveSliderGrid>
        {items.map((p) => (
          <ProductCard
            key={p.id}
            brandname={p.brandname}
            name={p.name}
            image={p.image}
            pricePoint={p.pricePoint}
          />
        ))}
      </ResponsiveSliderGrid>
    </section>
  )
}
