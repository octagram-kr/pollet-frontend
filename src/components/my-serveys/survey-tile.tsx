import Image from 'next/image'
import StatusBadge from '@/components/ui/badges'
import type { SurveyItem, SurveyCardExtras, SurveyStatus } from '@/types/survey'

interface Props {
  item: SurveyItem
  extras?: SurveyCardExtras
}

function formatPeriod(startAt: string, endAt: string | null) {
  const s = startAt.replaceAll('-', '.')
  const e = endAt ? endAt.replaceAll('-', '.') : null
  return e ? `${s} ~ ${e}` : `${s} ~ 종료기간 없음`
}

export default function SurveyTile({ item, extras }: Props) {
  const status: SurveyStatus = extras?.status ?? 'ongoing'
  const period = extras?.period
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
    <li className="rounded-md border bg-white hover:bg-gray-100 overflow-hidden">
      <button className="w-full text-left">
        {/* 썸네일 영역 */}
        <div className="relative aspect-[16/9] bg-gray-200">
          {item.thumbnail && (
            <Image
              src={item.thumbnail}
              alt=""
              fill
              className="object-cover"
            />
          )}
          <div className="absolute left-2 top-2">
            <StatusBadge
              status={status}
              widthClass="w-[64px]"
            />
          </div>
        </div>

        {/* 본문 */}
        <div className="px-3 py-2">
          <p className="text-sm text-gray-900 leading-snug line-clamp-2 break-words">
            {item.title}
          </p>

          {period && (
            <p className="mt-1 text-[11px] text-gray-600">
              {formatPeriod(period.startAt, period.endAt)}
            </p>
          )}

          {participants && (
            <>
              <div className="mt-2 h-2 w-full rounded bg-gray-200 overflow-hidden">
                <div
                  className="h-full bg-gray-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <div className="mt-1 text-right text-[11px] text-gray-600">
                {participants.current}/{participants.target ?? 0}
              </div>
            </>
          )}
        </div>
      </button>
    </li>
  )
}
