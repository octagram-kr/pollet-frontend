import StatusBadge from '@/components/ui/badges'
import type { SurveyItem, SurveyCardExtras } from '@/types/survey'

interface Props {
  item: SurveyItem
  extras?: SurveyCardExtras
}

function formatPeriod(startAt: string, endAt: string | null) {
  const s = startAt.replaceAll('-', '.')
  const e = endAt ? endAt.replaceAll('-', '.') : null
  return e ? `${s} ~ ${e}` : `${s} ~ 종료기간 없음`
}

export default function SurveyCard({ item, extras }: Props) {
  const status = extras?.status ?? 'ongoing'
  const hasPeriod = !!extras?.period
  const participants = extras?.participants

  return (
    <li className="bg-gray-100 hover:bg-gray-200 transition rounded-md">
      <button className="w-full text-left">
        <div className="flex items-center gap-5 px-6 py-5">
          {/* 항상 상태 배지 표시 */}
          <div className="pt-1 shrink-0">
            <StatusBadge status={status} />
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-gray-800">{item.title}</p>
            {hasPeriod && (
              <p className="mt-1 text-xs text-gray-600">
                {formatPeriod(extras!.period!.startAt, extras!.period!.endAt)}
              </p>
            )}
          </div>

          <div className="shrink-0 inline-flex items-center gap-2 text-xs text-gray-600">
            {participants && (
              <div className="shrink-0 inline-flex items-center gap-2 text-xs text-gray-600">
                {/* <Users className="size-4" /> */}
                <span>
                  {String(participants.current).padStart(4, '0')}/
                  {String(participants.target ?? 0).padStart(4, '0')}
                </span>
              </div>
            )}
          </div>
        </div>
      </button>
    </li>
  )
}
