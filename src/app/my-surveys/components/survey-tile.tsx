import Image from 'next/image'
import StatusBadge from '@/components/ui/badges'
import type { SurveyItem, SurveyCardExtras, SurveyStatus } from '@/types/survey'
import { UserFillIcon } from '@/components/icons'

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
    <li className="w-[282px] rounded-sm border border-stroke-subtler bg-fill-white overflow-hidden">
      <button className="w-full text-left">
        {/* 썸네일 영역 */}
        <div className="relative h-[211.5px] bg-gray-200">
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
              widthClass="w-[70px]"
            />
          </div>
        </div>

        {/* 본문 */}
        <div className="px-4 py-3">
          <p className="h-[52px] text-title-3 font-title-3 leading-title-3 text-text-strong line-clamp-2 break-words">
            {item.title}
          </p>

          {period && (
            <p className="text-caption-3 font-caption-3 leading-caption-3 tracking-caption-3 text-text-subtle">
              {formatPeriod(period.startAt, period.endAt)}
            </p>
          )}

          {participants && (
            <div className="flex items-center justify-between">
              <div className="flex items-center mt-1 text-right text-label-8 font-label-8 leading-label-8 tracking-label-8 text-gray-600">
                <UserFillIcon className="size-4" />
                <span className="text-text-primary">
                  {participants.current}
                </span>
                /{participants.target ?? 0}
              </div>
              <div className="mt-1 h-3 w-[172px] rounded-xl bg-fill-default overflow-hidden">
                <div
                  className="h-full bg-starcandy-mint"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </button>
    </li>
  )
}
