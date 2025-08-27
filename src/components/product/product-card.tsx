import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export function ProductCard({
  name,
  image,
  pricePoint,
  discountPoint,
  heightClass = 'h-[320px] md:h-[340px] lg:h-[360px]',
}: {
  name: string
  image: string
  pricePoint: number
  discountPoint?: number
  heightClass?: string
}) {
  const hasDiscount =
    typeof discountPoint === 'number' && discountPoint! < pricePoint
  return (
    <Card className={cn('flex flex-col', heightClass)}>
      <div className="relative h-40 w-full overflow-hidden rounded-xl">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex min-h-0 flex-1 flex-col pt-3">
        <h3 className="line-clamp-2 text-sm font-medium text-gray-800">
          {name}
        </h3>
        <div className="mt-auto flex items-baseline gap-2">
          {hasDiscount ? (
            <>
              <span className="text-base font-semibold text-blue-600">
                {discountPoint!.toLocaleString()} P
              </span>
              <span className="text-xs text-gray-400 line-through">
                {pricePoint.toLocaleString()} P
              </span>
            </>
          ) : (
            <span className="text-base font-semibold text-gray-900">
              {pricePoint.toLocaleString()} P
            </span>
          )}
        </div>
      </div>
    </Card>
  )
}
