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
  return (
    <details className="relative inline-block">
      <summary className="list-none cursor-pointer inline-flex items-center gap-2 rounded-md px-3 py-2 hover:bg-gray-100 whitespace-nowrap">
        {/* <Filter className="size-5" /> */}
        <span className="hidden sm:inline">필터</span>
      </summary>
      <div className="absolute right-0 mt-2 w-40 rounded-md border bg-white shadow">
        <Link
          href={buildHref(path, { q, view, status: 'ongoing' })}
          className="block px-3 py-2 text-sm hover:bg-gray-50"
        >
          진행중만
        </Link>
        <Link
          href={buildHref(path, { q, view, status: 'closed' })}
          className="block px-3 py-2 text-sm hover:bg-gray-50"
        >
          종료만
        </Link>
      </div>
    </details>
  )
}
