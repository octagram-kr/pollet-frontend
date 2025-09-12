'use client'

import { useEffect, useRef, useState } from 'react'
import { CloseIcon, DotIcon, StarcandyFillIcon } from '@/components/icons'

type TabKey = 'all' | 'gifticon' | 'interview' | 'survey'

export default function NotificationPanel({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const panelRef = useRef<HTMLDivElement>(null)
  const [tab, setTab] = useState<TabKey>('all')

  // ESC로 닫기
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  // 바깥 클릭 닫기
  const onBackdropClick = (e: React.MouseEvent) => {
    if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
      onClose()
    }
  }

  if (!open) return null

  const tabs: { key: TabKey; label: string }[] = [
    { key: 'all', label: '일반' },
    { key: 'gifticon', label: '기프티콘' },
    { key: 'interview', label: '인터뷰' },
    { key: 'survey', label: '설문조사' },
  ]

  // 데모 데이터
  const items = [
    {
      id: 1,
      type: 'survey',
      title: '300 을 획득했습니다.',
      meta: '[설문 리워드] MZ세대의 AI 의존도 연구를 위한 설문조사',
      time: '10분 전',
      delta: +300,
    },
    {
      id: 2,
      type: 'all',
      title: '10,000 을 충전했습니다.',
      meta: '[포인트 충전] 10,000 별마루',
      time: '2시간 전',
      delta: +10000,
    },
    {
      id: 3,
      type: 'gifticon',
      title: '4,700 을 사용했습니다.',
      meta: '[포인트 사용] 스타벅스 아이스 아메리카노T',
      time: '6시간 전',
      delta: -4700,
    },
    {
      id: 4,
      type: 'survey',
      title: '300 을 획득했습니다.',
      meta: '[설문 리워드] 대학생의 사회적 고립감이 자살사고에 미치는 영향',
      time: '6시간 전',
      delta: +300,
    },
  ]

  const filtered = items.filter((i) => (tab === 'all' ? true : i.type === tab))

  // 탭별 알림 개수 계산
  const countByTab: Record<TabKey, number> = {
    all: items.length,
    gifticon: items.filter((i) => i.type === 'gifticon').length,
    interview: items.filter((i) => i.type === 'interview').length,
    survey: items.filter((i) => i.type === 'survey').length,
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50"
      onMouseDown={onBackdropClick}
    >
      {/* Backdrop */}
      <div className="absolute inset-0" />

      {/* Panel */}
      <div
        ref={panelRef}
        className="absolute right-4 top-16 w-[384px] p-6 rounded-sm bg-fill-white shadow-md ring-1 ring-black/5"
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-label-3 font-label-3 leading-label-3 text-text-strong">
            알림
          </h2>
          <button
            aria-label="알림 닫기"
            onClick={onClose}
            className="cursor-pointer p-1 rounded hover:bg-gray-100"
          >
            <CloseIcon className="size-8" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mt-4">
          {tabs.map(({ key, label }) => {
            const active = tab === key
            const hasItems = countByTab[key] > 0
            return (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`relative rounded-xl px-2 py-0.5 text-label-6 font-label-6 leading-label-6 text-text-default border transition
                ${active ? 'bg-fill-primary-subtle border-stroke-primary' : 'cursor-pointer bg-fill-white border-stroke-subtle hover:bg-gray-100'}`}
              >
                {label}
                {hasItems && (
                  <DotIcon className="absolute right-[3px] -top-[3px] fill-pink-500" />
                )}
              </button>
            )
          })}
        </div>

        {/* List */}
        <ul className="max-h-[295px] overflow-y-auto mt-4">
          {filtered.map((n) => (
            <li
              key={n.id}
              className="cursor-pointer group relative flex items-center border-t border-stroke-subtler gap-3 px-2 py-3 hover:bg-gray-50"
            >
              <div
                className={`inline-flex h-6 shrink-0 items-center justify-center rounded px-1.5 text-[13px] font-semibold
                ${n.delta >= 0 ? 'bg-starcandy-mint/20 text-text-primary' : 'bg-gray-200 text-gray-700'}`}
              >
                <StarcandyFillIcon className="w-4" />
                {n.delta >= 0
                  ? ` ${n.delta.toLocaleString()} `
                  : ` ${Math.abs(n.delta).toLocaleString()} `}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-body-5 font-body-5 leading-body-5 tracking-body-5 text-text-default">
                  {n.title}
                </p>
                <p className="mt-0.5 line-clamp-1 text-caption-4 font-caption-4 leading-caption-4 tracking-caption-4 text-text-subtle">
                  {n.meta}
                </p>
              </div>

              <span className="shrink-0 text-caption-4 font-caption-4 leading-caption-4 tracking-caption-4 text-text-default">
                {n.time}
              </span>
            </li>
          ))}

          {filtered.length === 0 && (
            <li className="px-4 py-12 text-center text-sm text-text-subtle">
              표시할 알림이 없습니다.
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}
