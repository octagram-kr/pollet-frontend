import { StarcandyFillIcon } from '@/components/icons'
import Image from 'next/image'

export function ProductCard({
  brandname,
  name,
  image,
  pricePoint,
}: {
  brandname: string
  name: string
  image: string
  pricePoint: number
}) {
  return (
    <div className="flex flex-col h-[388px]">
      <div className="relative h-[282px] w-full overflow-hidden rounded-sm">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col px-4 py-3">
        <span className="text-caption-4 font-caption-4 leading-caption-4 tracking-caption-4 text-text-default">
          {brandname}
        </span>
        <h3 className="line-clamp-2 text-label-4 font-label-4 leading-label-4 text-text-default">
          {name}
        </h3>
        <div className="mt-1 flex items-center gap-1">
          <StarcandyFillIcon className="fill-fill-primary" />
          <span className="text-label-1 font-label-1 leading-label-1 tracking-label-1 text-text-strong">
            {pricePoint.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  )
}
