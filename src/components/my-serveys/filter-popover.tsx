import Link from 'next/link'
// import { Filter } from 'lucide-react'

interface Props {
  path: string
  q?: string
  view?: 'list' | 'grid'
  status?: 'ongoing' | 'closed'
}

function buildHref(
  path: string,
  {
    q,
    view,
    status,
  }: { q?: string; view?: 'list' | 'grid'; status?: 'ongoing' | 'closed' },
) {
  const sp = new URLSearchParams()
  if (q) sp.set('q', q)
  if (view === 'grid') sp.set('view', 'grid')
  if (status) sp.set('status', status)
  const qs = sp.toString()
  return qs ? `${path}?${qs}` : path
}

export default function FilterPopover({ path, q, view, status }: Props) {
  const isOngoing = status === 'ongoing'
  const isClosed = status === 'closed'
  const label =
    status === 'ongoing'
      ? '필터: 진행중'
      : status === 'closed'
        ? '필터: 종료'
        : '필터'
  return (
    <details className="relative inline-block z-10">
      <summary className="list-none cursor-pointer inline-flex items-center gap-2 rounded-md px-3 py-2 hover:bg-gray-100 whitespace-nowrap">
        {/* <Filter className="size-5" /> */}
        <span className="hidden sm:inline">{label}</span>
      </summary>
      <div className="absolute right-0 mt-2 w-40 rounded-md border bg-white shadow">
        <Link
          href={buildHref(path, { q, view, status: 'ongoing' })}
          aria-current={isOngoing ? 'page' : undefined}
          className={`block px-3 py-2 text-sm hover:bg-gray-50 ${
            isOngoing ? 'text-gray-900 font-medium' : 'text-gray-700'
          }`}
        >
          진행중만
        </Link>
        <Link
          href={buildHref(path, { q, view, status: 'closed' })}
          aria-current={isClosed ? 'page' : undefined}
          className={`block px-3 py-2 text-sm hover:bg-gray-50 ${
            isClosed ? 'text-gray-900 font-medium' : 'text-gray-700'
          }`}
        >
          종료만
        </Link>
      </div>
    </details>
  )
}
