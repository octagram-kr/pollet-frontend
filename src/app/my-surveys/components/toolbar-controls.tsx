import Link from 'next/link'
import { SingleIcon, ShowGridIcon } from '@/components/icons'
import FilterPopover from '@/app/my-surveys/components/filter-popover'

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
  // q 명시 시 동기화, 비어있으면 제거
  if (q !== undefined) {
    if (q) sp.set('q', q)
    else sp.delete('q')
  }
  // view 기본값(list)이면 제거, grid면 설정
  if (view === 'grid') sp.set('view', 'grid')
  else sp.delete('view')
  // status 미지정이면 제거
  if (status) sp.set('status', status)
  else sp.delete('status')

  sp.delete('page')

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
  const isList = !isGrid

  const listHref = buildHref(path, { q, view: 'list', status })
  const gridHref = buildHref(path, { q, view: 'grid', status })

  const baseBtn = 'inline-flex items-center gap-2 transition-colors'
  const active = 'text-fill-primary hover:opacity/80'
  const inactive = 'text-fill-deep hover:opacity/80'

  return (
    <div className="flex items-center gap-3">
      {/* 바둑판 보기 토글 */}

      <Link
        href={listHref}
        aria-label="리스트 보기"
        aria-pressed={isList}
        className={`${baseBtn} ${isList ? active : inactive}`}
      >
        <SingleIcon className="size-7" />
      </Link>

      <Link
        href={gridHref}
        aria-label="바둑판 보기"
        aria-pressed={isGrid}
        className={`${baseBtn} ${isGrid ? active : inactive}`}
      >
        <ShowGridIcon className="size-7" />
      </Link>

      {/* 필터 (진행중/종료) */}
      <FilterPopover
        path={path}
        q={q}
        view={view}
        status={status}
      />
    </div>
  )
}
