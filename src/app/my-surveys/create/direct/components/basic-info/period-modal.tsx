'use client'

import { useEffect, useState } from 'react'
import {
  CalendarIcon,
  ClockIcon,
  RadioDefaultIcon,
  RadioFillIcon,
  RightIcon,
  LeftIcon,
} from '@/components/icons'

export type PeriodValue = {
  startNow: boolean
  endUntilClose: boolean
  startDate: Date | null
  startTime: string | null // '오전 1:00' 형식
  endDate: Date | null
  endTime: string | null
}

type Props = {
  open: boolean
  value: PeriodValue
  onConfirm: (v: PeriodValue) => void
  onCancel: () => void
  onClose: () => void
}
const TIMES: string[] = (() => {
  const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`)
  const arr: string[] = []
  for (let h = 0; h < 24; h++) {
    const isAM = h < 12
    const hour12 = h % 12 === 0 ? 12 : h % 12
    arr.push(`${isAM ? '오전' : '오후'} ${hour12}:${pad(0)}`)
  }
  return arr
})()

export default function PeriodModal({
  open,
  value,
  onConfirm,
  onCancel,
  onClose,
}: Props) {
  const [draft, setDraft] = useState<PeriodValue>(value)
  const [openDate, setOpenDate] = useState<'start' | 'end' | null>(null)
  const [openTime, setOpenTime] = useState<'start' | 'end' | null>(null)

  // 모달 마운트 때 값 동기화
  useEffect(() => {
    setDraft(value)
  }, [value, open])

  // 배경 스크롤 잠금
  useEffect(() => {
    const html = document.documentElement
    const prevOverflow = html.style.overflow
    const prevOverscroll = html.style.overscrollBehavior
    const prevPR = document.body.style.paddingRight
    const sbw = window.innerWidth - document.documentElement.clientWidth
    html.style.overflow = 'hidden'
    html.style.overscrollBehavior = 'contain'
    if (sbw > 0) document.body.style.paddingRight = `${sbw}px`
    return () => {
      html.style.overflow = prevOverflow
      html.style.overscrollBehavior = prevOverscroll
      document.body.style.paddingRight = prevPR
    }
  }, [])

  if (!open) return null

  const applyDate = (which: 'start' | 'end', d: Date) =>
    setDraft((prev) =>
      which === 'start' ? { ...prev, startDate: d } : { ...prev, endDate: d },
    )

  const applyTime = (which: 'start' | 'end', t: string) =>
    setDraft((prev) =>
      which === 'start' ? { ...prev, startTime: t } : { ...prev, endTime: t },
    )

  const toggleStartNow = (b: boolean) =>
    setDraft((p) => ({ ...p, startNow: b }))

  const toggleEndUntilClose = (b: boolean) =>
    setDraft((p) => ({ ...p, endUntilClose: b }))

  // 시간 리스트 24개
  const times = TIMES

  return (
    <div
      className="fixed inset-0 z-[120] overscroll-contain"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-dim" />
      <div
        className="absolute left-1/2 top-1/2 w-[384px] h-[492px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-fill-white p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="mb-8 text-center text-title-2 font-title-2 leading-title-2 text-text-default">
          설문 기간 설정하기
        </h3>

        {/* 시작 */}
        <section className="mb-8">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-body-4 font-body-4 leading-body-4 tracking-body-4 text-text-default">
              시작
            </span>
            <label className="inline-flex items-center gap-1 text-caption-3 font-caption-3 leading-caption-3 tracking-caption-3 text-text-default">
              <input
                type="radio"
                className="sr-only peer"
                checked={draft.startNow}
                onChange={(e) => toggleStartNow(e.target.checked)}
              />
              <span>
                {draft.startNow ? (
                  <RadioFillIcon className="w-[18px] text-fill-active" />
                ) : (
                  <RadioDefaultIcon className="w-[18px] text-fill-active" />
                )}
              </span>
              바로 시작
            </label>
          </div>

          <div className="space-y-2">
            {/* 날짜 */}
            <PopoverField
              disabled={draft.startNow}
              placeholder="날짜 선택"
              icon="calendar"
              value={draft.startDate ? formatDate(draft.startDate) : ''}
              onOpen={() => {
                if (!draft.startNow) {
                  setOpenTime(null)
                  setOpenDate('start')
                }
              }}
            />
            {openDate === 'start' && (
              <Calendar
                initial={draft.startDate ?? new Date()}
                onSelect={(d) => {
                  applyDate('start', d)
                  setOpenDate(null)
                }}
              />
            )}

            {/* 시간 */}
            <PopoverField
              disabled={draft.startNow}
              placeholder="시간 선택"
              icon="clock"
              value={draft.startTime ?? ''}
              onOpen={() => {
                if (!draft.startNow) {
                  setOpenDate(null)
                  setOpenTime('start')
                }
              }}
            />
            {openTime === 'start' && (
              <TimeList
                items={times}
                value={draft.startTime}
                onSelect={(t) => {
                  applyTime('start', t)
                  setOpenTime(null)
                }}
              />
            )}
          </div>
        </section>

        {/* 종료 */}
        <section className="mb-8">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-body-4 font-body-4 leading-body-4 tracking-body-4 text-text-default">
              종료
            </span>
            <label className="inline-flex items-center gap-1 text-caption-3 font-caption-3 leading-caption-3 tracking-caption-3 text-text-default">
              <input
                type="radio"
                className="sr-only peer"
                checked={draft.endUntilClose}
                onChange={(e) => toggleEndUntilClose(e.target.checked)}
              />
              <span>
                {draft.endUntilClose ? (
                  <RadioFillIcon className="w-[18px] text-fill-active" />
                ) : (
                  <RadioDefaultIcon className="w-[18px] text-fill-active" />
                )}
              </span>
              응답자 마감까지
            </label>
          </div>

          <div className="space-y-2">
            {/* 날짜 */}
            <PopoverField
              disabled={draft.endUntilClose}
              placeholder="날짜 선택"
              icon="calendar"
              value={draft.endDate ? formatDate(draft.endDate) : ''}
              onOpen={() => {
                if (!draft.endUntilClose) {
                  setOpenTime(null)
                  setOpenDate('end')
                }
              }}
            />
            {openDate === 'end' && (
              <Calendar
                initial={draft.endDate ?? new Date()}
                onSelect={(d) => {
                  applyDate('end', d)
                  setOpenDate(null)
                }}
              />
            )}

            {/* 시간 */}
            <PopoverField
              disabled={draft.endUntilClose}
              placeholder="시간 선택"
              icon="clock"
              value={draft.endTime ?? ''}
              onOpen={() => {
                if (!draft.endUntilClose) {
                  setOpenDate(null)
                  setOpenTime('end')
                }
              }}
            />
            {openTime === 'end' && (
              <TimeList
                items={times}
                value={draft.endTime}
                onSelect={(t) => {
                  applyTime('end', t)
                  setOpenTime(null)
                }}
              />
            )}
          </div>
        </section>

        {/* 액션 */}
        <div className="flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="w-[156px] rounded-xs bg-fill-default px-4 py-2 text-label-7 font-label-7 leading-label-7 text-text-default hover:opacity-90"
          >
            취소
          </button>
          <button
            type="button"
            onClick={() => onConfirm(draft)}
            className="w-[156px] rounded-xs bg-fill-primary px-4 py-2 text-label-7 font-label-7 leading-label-7 text-text-default hover:opacity-90"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  )
}

/* ---- UI Partials ---------------------------------------- */

function PopoverField({
  value,
  placeholder,
  onOpen,
  disabled,
  icon,
}: {
  value: string
  placeholder: string
  onOpen: () => void
  disabled?: boolean
  icon: 'calendar' | 'clock'
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onOpen}
      className={`flex w-full items-center gap-2 rounded-xs border px-4 py-2 text-left text-body-5 font-body-5 tracking-body-5 text-text-subtle ${
        disabled
          ? 'cursor-not-allowed bg-fill-subtle'
          : 'border-stroke-subtler hover:opacity-80'
      }`}
    >
      <span>
        {icon === 'calendar' ? (
          <CalendarIcon className="w-5 fill-fill-strong" />
        ) : (
          <ClockIcon className="w-5 fill-fill-strong" />
        )}
      </span>
      <span className={value ? '' : 'text-text-subtle'}>
        {value || placeholder}
      </span>
    </button>
  )
}

function Calendar({
  initial,
  onSelect,
}: {
  initial: Date
  onSelect: (d: Date) => void
}) {
  const [cursor, setCursor] = useState(
    new Date(initial.getFullYear(), initial.getMonth(), 1),
  )

  const year = cursor.getFullYear()
  const month = cursor.getMonth() // 0-based
  const firstDay = new Date(year, month, 1).getDay() // 0: Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  // 배열 생성
  const cells: (number | null)[] = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  return (
    <div className="absolute left-1/8 inline-flex flex-col justify-center items-center w-72 z-10 rounded-sm bg-bg-white px-2 py-4 shadow-md">
      <div className="w-full mb-3 px-4 flex items-center justify-between text-label-6 font-label-6 leading-label-6 text-text-default">
        <button
          type="button"
          onClick={() => setCursor(new Date(year, month - 1, 1))}
          className="cursor-pointer"
        >
          <LeftIcon />
        </button>
        <span>
          {year}년 {month + 1}월
        </span>
        <button
          type="button"
          onClick={() => setCursor(new Date(year, month + 1, 1))}
          className="cursor-pointer"
        >
          <RightIcon />
        </button>
      </div>

      <div className="px-3 grid grid-cols-7 gap-0.5 text-center">
        {['일', '월', '화', '수', '목', '금', '토'].map((d) => (
          <div
            key={d}
            className="text-body-6 font-body-6 leading-body-6 tracking-body-6 text-text-subtle"
          >
            {d}
          </div>
        ))}
        {cells.map((d, i) =>
          d == null ? (
            <div key={i} />
          ) : (
            <button
              key={i}
              type="button"
              onClick={() => onSelect(new Date(year, month, d))}
              className="px-2 py-1 cursor-pointer text-text-default"
            >
              {d}
            </button>
          ),
        )}
      </div>
    </div>
  )
}

function TimeList({
  items,
  value,
  onSelect,
}: {
  items: string[]
  value: string | null
  onSelect: (t: string) => void
}) {
  return (
    <div className="absolute left-1/8 z-10 w-72 max-h-[180px] overflow-auto rounded-sm bg-bg-white px-2 shadow-md">
      {items.map((t) => (
        <button
          key={t}
          type="button"
          onClick={() => onSelect(t)}
          className={`flex w-full items-center justify-between rounded-xs px-4 py-2 text-sm hover:bg-gray-100 ${
            value === t
              ? 'bg-starcandy-mint/10 font-semibold text-starcandy-mint'
              : 'text-gray-800'
          }`}
        >
          {t}
          {value === t && <span>✓</span>}
        </button>
      ))}
    </div>
  )
}

/* 유틸 */
function formatDate(d: Date) {
  const m = d.getMonth() + 1
  const day = d.getDate()
  return `${d.getFullYear()}년 ${m}월 ${day}일`
}
