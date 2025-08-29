import Link from 'next/link'
// import { Grid2X2 } from 'lucide-react'
import FilterPopover from '@/components/my-surveys/filter-popover'

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
  const [base, existing] = path.split('?')
  const sp = new URLSearchParams(existing)
  if (q) sp.set('q', q)
  if (view === 'grid') sp.set('view', 'grid')
  if (status) sp.set('status', status)
  const qs = sp.toString()
  return qs ? `${base}?${qs}` : base
}

export default function ToolbarControls({
  path,
  q,
  view = 'list',
  status,
}: Props) {
  const isGrid = view === 'grid'

  // Grid 토글
  const gridHref = isGrid
    ? buildHref(path, { q, view: 'list', status }) // 다시 리스트로
    : buildHref(path, { q, view: 'grid', status })

  // 전체 보기 (status 제거)
  const allHref = buildHref(path, { q, view })

  return (
    <div className="flex items-center gap-3">
      {/* 1) 바둑판 보기 토글 */}
      <Link
        href={gridHref}
        aria-label="바둑판 보기 전환"
        className={`inline-flex items-center gap-2 rounded-md px-3 py-2 hover:bg-gray-100 ${isGrid ? 'text-gray-900' : 'text-gray-700'}`}
      >
        {/* <Grid2X2 className="size-5" /> */}
        <span className="hidden whitespace-nowrap sm:inline">
          {isGrid ? '리스트 보기' : '바둑판 보기'}
        </span>
      </Link>

      {/* 2) 전체 보기 (필터 제거) */}
      <Link
        href={allHref}
        className="inline-flex items-center px-3 py-2 rounded-md hover:bg-gray-100 whitespace-nowrap"
      >
        전체 보기
      </Link>

      {/* 3) 필터 (진행중/종료) */}
      <FilterPopover
        path={path}
        q={q}
        view={view}
        status={status}
      />
    </div>
  )
}
