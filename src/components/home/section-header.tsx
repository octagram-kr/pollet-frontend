import Link from 'next/link'

export function SectionHeader({
  title,
  subtitle,
  moreHref,
}: {
  title: string
  subtitle?: string
  moreHref: string
}) {
  return (
    <div className="mb-4 flex items-end justify-between">
      <div>
        <h2 className="text-xl font-semibold">{title}</h2>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      </div>
      <Link
        href={moreHref}
        className="text-sm text-blue-600 hover:underline"
      >
        더보기
      </Link>
    </div>
  )
}
