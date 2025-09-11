'use client'

import { useState } from 'react'
import PeriodModal, { PeriodValue } from './period-modal'
import { CheckboxDefaultIcon, CheckboxFillIcon } from '@/components/icons'

type SurveyMeta = {
  title: string
  description: string
  purpose: string
  period: {
    startNow?: boolean
    endUntilClosed?: boolean
    startAt?: string // ISO
    endAt?: string // ISO
  }
}

type Props = {
  className?: string
  nickname?: string // 로그인한 설문자 닉네임
  value: SurveyMeta
  onChange: (patch: Partial<SurveyMeta>) => void
}

const PURPOSES = [
  '연구 과제',
  '시장 조사',
  '프로젝트 수행',
  '비즈니스',
  '직접 입력',
] as const
type Purpose = (typeof PURPOSES)[number]

export default function SurveyInfoCard({
  className,
  nickname = '닉네임',
}: Props) {
  const [title, setTitle] = useState('')
  const [purpose, setPurpose] = useState<Purpose | ''>('')
  const [purposeCustom, setPurposeCustom] = useState('')
  const [desc, setDesc] = useState('')
  const [openPeriod, setOpenPeriod] = useState(false)

  // 기간 값은 부모가 보유 → 모달 열었다 닫아도 값 유지
  const [period, setPeriod] = useState<PeriodValue>({
    startNow: false,
    endUntilClose: false,
    startDate: null,
    startTime: null,
    endDate: null,
    endTime: null,
  })

  return (
    <div
      className={[
        'rounded-sm border border-stroke-subtle bg-fill-white px-6 py-5',
        className ?? '',
      ].join(' ')}
    >
      {/* 설문 제목 작성 */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="설문 조사 제목을 작성해주세요"
        className="
            block w-full bg-transparent p-0
            text-body-2 font-body-2 leading-body-2 tracking-body-2 text-text-default
            placeholder:text-text-default
            outline-none ring-0 focus:outline-none focus:ring-0
            border-none appearance-none
          "
      />

      {/* 본문 */}
      <div className="my-6 space-y-2 px-4 py-3 rounded-xs bg-fill-white border border-stroke-subtler">
        {/* 설문자 정보(읽기 전용) */}
        <div className="flex items-center gap-4">
          <div className="w-24 shrink-0 text-body-4 font-body-4 leading-body-4 tracking-body-4 text-text-default">
            설문자 정보
          </div>
          <div className="text-body-5 font-body-5 leading-body-5 tracking-body-5 text-text-subtle">
            {nickname}
          </div>
        </div>

        {/* 구분선 */}
        <div className="h-px bg-stroke-subtler" />

        {/* 설문 목적 */}
        <div className="flex items-center gap-4">
          <div className="w-24 shrink-0 text-body-4 font-body-4 leading-body-4 tracking-body-4 text-text-default">
            설문 목적
          </div>
          <div className="flex items-center gap-3">
            {PURPOSES.map((p) => {
              const id = `purpose-${p}`
              const selected = purpose === p
              const isCustom = p === '직접 입력'
              return (
                <label
                  key={p}
                  htmlFor={id}
                  className="inline-flex items-center gap-2 text-body-5 font-body-5 leading-body-5 tracking-body-5 text-text-subtle"
                >
                  <input
                    id={id}
                    type="radio"
                    name="purpose"
                    className="sr-only peer"
                    checked={selected}
                    onChange={() => setPurpose(p)}
                  />
                  <span>
                    {selected ? (
                      <CheckboxFillIcon className="h-5 w-5 fill-fill-default" />
                    ) : (
                      <CheckboxDefaultIcon className="h-5 w-5 fill-fill-default" />
                    )}
                  </span>
                  {isCustom ? (
                    selected ? (
                      <input
                        autoFocus
                        type="text"
                        value={purposeCustom}
                        onChange={(e) => setPurposeCustom(e.target.value)}
                        className="w-44 text-body-5 font-body-5 leading-body-5 tracking-body-5 text-text-default outline-none"
                      />
                    ) : (
                      <span className="text-body-5 font-body-5 leading-body-5 tracking-body-5 text-text-subtle">
                        직접 입력
                      </span>
                    )
                  ) : (
                    <span>{p}</span>
                  )}
                </label>
              )
            })}
          </div>
        </div>

        {/* 구분선 */}
        <div className="h-px bg-stroke-subtler" />

        {/* 설문 기간 */}
        <div className="flex items-center gap-4">
          <div className="w-24 shrink-0 text-body-4 font-body-4 leading-body-4 tracking-body-4 text-text-default">
            설문 기간
          </div>
          <button
            type="button"
            onClick={() => setOpenPeriod(true)}
            className="w-[240px] cursor-pointer rounded-xs bg-gray-100 px-4 py-0.5 text-body-5 font-body-5 leading-body-5 tracking-body-5 text-text-default hover:opacity-90"
          >
            설문 기간 설정하기
          </button>
        </div>
      </div>

      {/* 설문 설명 */}
      <div className="rounded-xs border border-stroke-subtler px-4 py-3">
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value.slice(0, 500))}
          placeholder="설문조사에 대한 설명을 작성해주세요"
          className="h-28 w-full resize-none text-body-5 font-body-5 leading-body-5 tracking-body-5 text-text-default outline-none placeholder:text-text-subtler"
        />
      </div>
      <div className="mt-1 flex justify-end text-label-6 font-label-6 leading-label-6 text-text-subtle">
        <p className="text-text-primary">{desc.length}</p>
        /500
      </div>

      {/* 기간 모달 */}
      {openPeriod && (
        <PeriodModal
          open={openPeriod}
          value={period}
          onClose={() => setOpenPeriod(false)}
          onCancel={() => setOpenPeriod(false)}
          onConfirm={(v) => {
            setPeriod(v)
            setOpenPeriod(false)
          }}
        />
      )}
    </div>
  )
}
