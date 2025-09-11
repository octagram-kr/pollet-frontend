import Link from 'next/link'

export function SectionHeader({
  title,
  moreHref,
}: {
  title: string
  moreHref: string
}) {
  return (
    <div className="mt-32 mb-4 flex items-end justify-between">
      <div>
        <h2 className="text-title-1 font-title-1 leading-title-1 text-text-strong">
          {title}
        </h2>
      </div>
      <Link
        href={moreHref}
        className="text-caption-2 font-caption-2 leading-caption-2 text-text-subtle cursor-pointer"
      >
        더보기
      </Link>
    </div>
  )
}
