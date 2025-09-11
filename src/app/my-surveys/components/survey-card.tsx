import { UserFillIcon } from '@/components/icons'
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
  const pct =
    participants && participants.target
      ? Math.min(
          100,
          Math.round(
            (participants.current / Math.max(1, participants.target)) * 100,
          ),
        )
      : 0

  return (
    <li className="bg-fill-white border border-stroke-subtler hover:bg-gray-50 transition rounded-sm">
      <button className="w-full text-left">
        <div className="flex items-center gap-5 px-6 py-3">
          {/* 항상 상태 배지 표시 */}
          <div className="shrink-0">
            <StatusBadge status={status} />
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-title-3 font-title-3 leading-title-3 text-text-strong">
              {item.title}
            </p>
            {hasPeriod && (
              <p className="mt-1 text-caption-3 font-caption-3 leading-caption-3 tracking-caption-3 text-text-subtle">
                {formatPeriod(extras!.period!.startAt, extras!.period!.endAt)}
              </p>
            )}
          </div>

          <div className="shrink-0 inline-flex items-center gap-2 text-xs text-gray-600">
            {participants && (
              <div className="w-[320px] shrink-0 inline-flex flex-col items-end gap-0.5 text-xs text-gray-600">
                <div className="flex items-center">
                  <UserFillIcon className="w-4 fill-fill-deep" />
                  <div className="w-[38px] text-right text-label-8 font-label-8 leading-label-8 tracking-label-8 text-text-subtle">
                    <span className="text-text-primary">
                      {participants.current}
                    </span>
                    /{participants.target ?? 0}
                  </div>
                </div>
                <div className="h-3 w-full rounded-sm bg-fill-default overflow-hidden">
                  <div
                    className="h-full bg-starcandy-mint rounded-sm"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </button>
    </li>
  )
}
