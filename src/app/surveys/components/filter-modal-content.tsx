'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { ResetIcon } from '@/components/icons'

export type FilterFormState = {
  gender: 'all' | 'male' | 'female' | null
  age: string | null
  job: string | null
  pointMin: number | null
  pointMax: number | null
  gifticonOnly: boolean
  durations: string[]
}

export default function FilterModalContent({
  initial,
  onApply,
}: {
  initial: FilterFormState
  onApply: (form: FilterFormState) => void
}) {
  const [form, setForm] = useState<FilterFormState>(initial)

  const Chip = ({
    active,
    onClick,
    children,
  }: {
    active: boolean
    onClick: () => void
    children: React.ReactNode
  }) => (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-xl border px-2 py-0.5 text-label-6 font-label-6 leading-label-6 text-text-default hover:cursor-pointer transition',
        active
          ? 'border-stroke-primary bg-fill-primary-subtle'
          : 'border-stroke-subtle bg-fill-white hover:bg-bg-subtle',
      )}
      aria-pressed={active}
    >
      {children}
    </button>
  )

  return (
    <div className="mt-8 space-y-4">
      {/* 성별 */}
      <Row label="성별">
        <div className="flex flex-wrap gap-3">
          {[
            { key: 'all', label: '전체' },
            { key: 'male', label: '남자' },
            { key: 'female', label: '여자' },
          ].map(({ key, label }) => (
            <Chip
              key={key}
              active={form.gender === (key as FilterFormState['gender'])}
              onClick={() =>
                setForm((f) => ({
                  ...f,
                  gender: key as FilterFormState['gender'],
                }))
              }
            >
              {label}
            </Chip>
          ))}
        </div>
      </Row>

      {/* 연령대 */}
      <Row label="연령대">
        <div className="flex flex-wrap gap-x-4 gap-y-3">
          {['all', '10', '20', '30', '40', '50', '60+'].map((a) => (
            <Chip
              key={a}
              active={a === 'all' ? form.age === null : form.age === a}
              onClick={() =>
                setForm((f) => ({ ...f, age: a === 'all' ? null : a }))
              }
            >
              {a === 'all' ? '전체' : a === '60+' ? '60대 이상' : `${a}대`}
            </Chip>
          ))}
        </div>
      </Row>

      {/* 직업 */}
      <Row label="직업">
        <div className="flex flex-wrap gap-x-4 gap-y-3">
          {[
            'all',
            '중학생',
            '고등학생',
            '대학생',
            '취준생',
            '직장인',
            '전문직',
            '프리랜서',
            '창업자',
            '자영업자',
          ].map((j) => (
            <Chip
              key={j}
              active={j === 'all' ? form.job === null : form.job === j}
              onClick={() =>
                setForm((f) => ({ ...f, job: j === 'all' ? null : j }))
              }
            >
              {j === 'all' ? '전체' : j}
            </Chip>
          ))}
        </div>
      </Row>

      {/* 포인트 */}
      <Row label="포인트">
        <div className="flex items-center gap-2">
          <NumberInput
            value={form.pointMin ?? 0}
            onChange={(v) => setForm((f) => ({ ...f, pointMin: v }))}
            min={0}
          />
          <span className="text-body-3 font-body-3 leading-body-3 tracking-body-3 text-text-default">
            개 -
          </span>
          <NumberInput
            value={form.pointMax ?? 0}
            onChange={(v) => setForm((f) => ({ ...f, pointMax: v }))}
            min={0}
          />
          <span className="text-body-3 font-body-3 leading-body-3 tracking-body-3 text-text-default">
            개
          </span>
        </div>
      </Row>

      {/* 기프티콘 */}
      <Row label="기프티콘">
        <button
          type="button"
          onClick={() =>
            setForm((f) => ({ ...f, gifticonOnly: !f.gifticonOnly }))
          }
          className={cn(
            'border rounded-xl px-2 py-0.5 text-label-6 font-label-6 leading-label-6 text-text-default hover:cursor-pointer',
            form.gifticonOnly
              ? 'border-stroke-primary bg-fill-primary-subtle'
              : 'border-stroke-subtle bg-fill-white hover:bg-bg-subtle',
          )}
        >
          기프티콘 보기
        </button>
      </Row>

      {/* 소요시간 */}
      <Row label="소요시간">
        <div className="flex flex-wrap gap-x-4 gap-y-3">
          {['all', '1', '3', '5', '10', '15', '20', '30+'].map((d) => {
            const active =
              d === 'all'
                ? form.durations.length === 0
                : form.durations.includes(d)
            return (
              <Chip
                key={d}
                active={active}
                onClick={() =>
                  d === 'all'
                    ? setForm((f) => ({ ...f, durations: [] }))
                    : setForm((f) => {
                        const s = new Set(f.durations)
                        if (s.has(d)) {
                          s.delete(d)
                        } else {
                          s.add(d)
                        }
                        return { ...f, durations: [...s] }
                      })
                }
              >
                {d === 'all' ? '전체' : d === '30+' ? '30분 이상' : `${d}분`}
              </Chip>
            )
          })}
        </div>
      </Row>

      {/* 하단 버튼 */}
      <div className="mt-8 flex flex-col gap-3">
        <button
          type="button"
          onClick={() => onApply(form)}
          className="w-full rounded-xs bg-fill-primary px-4 py-3 text-label-4 font-label-4 leading-label-4 text-text-default hover:cursor-pointer"
        >
          설정하기
        </button>
        <button
          type="button"
          onClick={() =>
            setForm({
              gender: 'all',
              age: null,
              job: null,
              pointMin: 50,
              pointMax: 30000,
              gifticonOnly: false,
              durations: [],
            })
          }
          className="inline-flex items-center gap-1 self-center text-caption-3 font-caption-3 leading-caption-3 tracking-caption-3 text-text-default hover:cursor-pointer"
          title="선택 초기화"
        >
          <ResetIcon className="w-5.5 h-5.5 fill-fill-strong" />
          선택 초기화
        </button>
      </div>
    </div>
  )
}

/* — helpers — */

function Row({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="grid grid-cols-[68px_290px] items-start gap-8">
      <div className="text-label-5 font-label-5 leading-label-5 tracking-label-5 text-text-strong">
        {label}
      </div>
      <div>{children}</div>
    </div>
  )
}

function NumberInput({
  value,
  onChange,
  min = 0,
}: {
  value: number
  onChange: (v: number) => void
  min?: number
}) {
  return (
    <input
      type="text"
      inputMode="numeric"
      pattern="\d*"
      value={String(value)}
      onChange={(e) => {
        const raw = e.target.value.replace(/^0+/, '')
        const num = raw === '' ? 0 : Number(raw)
        onChange(Math.max(min, num))
      }}
      className="w-28 rounded-xs border border-stroke-subtler bg-fill-subtle px-3 py-1 text-label-6 font-label-6 leading-label-6 text-text-subtler outline-none"
    />
  )
}
