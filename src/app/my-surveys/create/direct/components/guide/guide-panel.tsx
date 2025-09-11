'use client'

import { useEffect, useMemo, useState } from 'react'
import { ChoiceOption, QuestionForm } from '../form/types'
import {
  CheckboxDefaultIcon,
  CheckboxFillIcon,
  CloseIcon,
  ListIcon,
  StarcandyFillIcon,
} from '@/components/icons'

/** 부모와 통신용 프로퍼티 */
type Props = {
  /** 폼 리스트(실시간 반영) */
  forms: QuestionForm[]
  /** 폼 카드로 스크롤 이동(앵커/가상스크롤 등 부모에서 처리) */
  onJumpTo?: (id: string) => void

  /** 테마 컬러 상태 (없으면 내부에서 관리) */
  themePrimary?: string
  themeBackground?: string
  onThemeChange?: (next: { primary?: string; background?: string }) => void

  /** 꾸미기 적용 시 미리보기 영역 배경을 즉시 바꾸고 싶을 때(선택) */
  previewContainerId?: string

  /** 대상자 확인(가드 질문) 저장 콜백(선택) */
  onApplyScreening?: (data: {
    question: string
    options: ChoiceOption[]
    enabledIds: string[]
  }) => void

  /** 태그/설정 저장 콜백(선택) */
  onChangeSettings?: (data: {
    gender: string
    age: string
    job: string
    tags: string[]
  }) => void
}

/** 팔레트 */
const PRIMARYS = [
  '#d1f6ef',
  '#ffeffe',
  '#ffe8e5',
  '#fff4d2',
  '#e8e9eb',
  '#e9f9db',
  '#ede2ff',
]
const BACKGROUNDS = [
  '#f9f9f9',
  '#e9fef8',
  '#d1f6ef',
  '#b4ede5',
  '#b4b7bd',
  '#5e6064',
]

/** 오른쪽 고정 패널 */
export default function GuidePanel({
  forms,
  onJumpTo,
  themePrimary,
  themeBackground,
  onThemeChange,
  previewContainerId,
  onApplyScreening,
  onChangeSettings,
}: Props) {
  /** 탭 */
  const [tab, setTab] = useState<'toc' | 'style' | 'screen' | 'settings'>('toc')

  /** 내부 테마 상태(부모 미제공 시 로컬로 유지) */
  const [primary, setPrimary] = useState(themePrimary ?? PRIMARYS[0])
  const [bg, setBg] = useState(themeBackground ?? BACKGROUNDS[0])

  useEffect(() => {
    if (themePrimary) setPrimary(themePrimary)
  }, [themePrimary])
  useEffect(() => {
    if (themeBackground) setBg(themeBackground)
  }, [themeBackground])

  /** 실시간 미리보기 배경 적용(선택) */
  useEffect(() => {
    if (!previewContainerId) return
    const el = document.getElementById(previewContainerId)
    if (el) el.style.backgroundColor = primary
  }, [primary, previewContainerId])
  useEffect(() => {
    if (!previewContainerId) return
    const el = document.getElementById(previewContainerId)
    if (el) el.style.setProperty('--survey-detail-bg', bg)
  }, [bg, previewContainerId])

  /** 목차: 섹션→질문 구조로 그룹핑 */
  const grouped = useMemo(() => {
    const groups = new Map<number, QuestionForm[]>()
    //   forms.forEach((f) => {
    //     const key = f.sectionNo ?? 0
    //     if (!groups.has(key)) groups.set(key, [])
    //     groups.get(key)!.push(f)
    //   })
    //   return [...groups.entries()].sort((a, b) => a[0] - b[0])
    // }, [forms])
    if (!forms.length) return []
    const g = new Map<number, QuestionForm[]>()

    // 기본값은 1번 섹션
    let current = 1

    for (const f of forms) {
      // 카드에 섹션 칩이 있으면 그 번호로 섹션 전환
      if (typeof f.sectionNo === 'number') current = f.sectionNo
      if (!g.has(current)) g.set(current, [])
      g.get(current)!.push(f)
    }

    // 섹션 번호 순서로 정렬해 반환
    return [...g.entries()].sort((a, b) => a[0] - b[0])
  }, [forms])

  /** 대상자 확인(가드 질문) 로컬 상태 */
  const [guardQ, setGuardQ] = useState('Q. 질문을 작성해주세요')
  const [guardOpts, setGuardOpts] = useState<ChoiceOption[]>([
    { id: crypto.randomUUID(), label: '' },
    { id: crypto.randomUUID(), label: '' },
    { id: crypto.randomUUID(), label: '' },
  ])
  const [enabledIds, setEnabledIds] = useState<string[]>([])

  /** 설정 탭(성별/연령/직업/태그) */
  const [gender, setGender] = useState<'전체' | '남자' | '여자'>('전체')
  const [age, setAge] = useState<
    '전체' | '10대' | '20대' | '30대' | '40대' | '50대' | '60대 이상'
  >('전체')
  const [job, setJob] = useState<
    | '전체'
    | '중학생'
    | '고등학생'
    | '대학생'
    | '취준생'
    | '직장인'
    | '전문직'
    | '프리랜서'
    | '창업자'
    | '자영업자'
  >('전체')
  const TAGS = [
    'AI',
    '교육',
    '금융',
    '식품',
    '반려동물',
    '헬스케어',
    '여행',
    '패션뷰티',
    '커머스',
    '웰빙',
    '라이프스타일',
    '엔터테인먼트',
  ] as const
  const [tags, setTags] = useState<string[]>([])

  const toggleTag = (t: string) =>
    setTags((prev) =>
      prev.includes(t)
        ? prev.filter((x) => x !== t)
        : prev.length >= 2
          ? prev
          : [...prev, t],
    )

  /** 공용 칩 컴포넌트 */
  const Chip = ({
    active,
    children,
    onClick,
  }: {
    active?: boolean
    children: React.ReactNode
    onClick?: () => void
  }) => (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl px-2 py-0.5 text-label-8 font-label-8 leading-label-8 tracking-label-8 border ${
        active
          ? 'border-stroke-primary bg-fill-primary-subtle'
          : 'border-stroke-subtle bg-fill-white'
      }`}
    >
      {children}
    </button>
  )

  return (
    <aside
      className="
        sticky top-32 h-[660px] w-[384px] min-w-[320px]
        overflow-hidden rounded-sm border border-gray-50 bg-white shadow-md p-5
      "
    >
      {/* 탭 헤더 */}
      <div className="relative border-b border-stroke-subtle">
        <div className="flex items-center">
          {[
            { key: 'toc', label: '목차' },
            { key: 'style', label: '꾸미기' },
            { key: 'screen', label: '대상자확인' },
            { key: 'settings', label: '설정' },
          ].map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key as any)}
              className={`relative flex-1 px-1 py-1.5 text-label-5 font-label-5 leading-label-5 tracking-label-5 ${
                tab === t.key
                  ? 'text-text-primary'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {t.label}
              <span
                className={`pointer-events-none absolute -bottom-[1px] left-0 right-0 mx-auto h-[2px] rounded-full bg-fill-primary-active transition-all duration-200
              ${tab === t.key ? 'w-full opacity-100' : 'w-0 opacity-0'}`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* 탭 컨텐츠 */}
      <div className="mt-6 h-[calc(100%-56px)] overflow-auto">
        {/* 목차 */}
        {tab === 'toc' && (
          <div className="space-y-4">
            <div className="w-full rounded-xs border border-stroke-primary px-4 py-3 text-label-7 font-label-7 leading-label-7 text-text-strong outline-none">
              설문 조사 기본 정보 입력
            </div>
            {grouped.map(([sec, qs]) => (
              <div
                key={sec}
                className="rounded-xs border border-stroke-subtle"
              >
                <div className="px-4 py-3 text-label-7 font-label-7 leading-label-7 text-text-subtle border-b border-stroke-subtle">
                  섹션 {sec}
                </div>
                <div className="divide-y">
                  {qs.map((q, i) => (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => onJumpTo?.(q.id)}
                      className="flex w-full items-center justify-between px-4 py-3 text-left text-caption-3 font-caption-3 leading-caption-3 tracking-caption-3 text-text-subtle hover:bg-gray-50"
                    >
                      <span className="truncate">
                        {i + 1}. {q.title || '질문 입력'}
                      </span>
                      <ListIcon className="w-5" />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 꾸미기 */}
        {tab === 'style' && (
          <div className="space-y-8">
            <div>
              <div className="mb-6 text-heading-3 font-heading-3 leading-heading-3 text-text-default">
                색상
              </div>
              <div className="mb-2 text-label-6 font-label-6 leading-label-6 text-text-default">
                주요 컬러
              </div>
              <div className="flex flex-wrap gap-[6px]">
                {PRIMARYS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => {
                      setPrimary(c)
                      onThemeChange?.({ primary: c })
                    }}
                    className={`grid h-[42px] w-[42px] place-items-center rounded-xl ${
                      primary === c ? 'border-2 border-stroke-mint' : ''
                    }`}
                    title={c}
                  >
                    <StarcandyFillIcon
                      className="h-8 w-8"
                      style={{ color: c }}
                    />
                  </button>
                ))}
              </div>

              <div className="mt-6 mb-2 text-label-6 font-label-6 leading-label-6 text-text-default">
                배경 컬러
              </div>
              <div className="flex flex-wrap gap-3">
                {BACKGROUNDS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => {
                      setBg(c)
                      onThemeChange?.({ background: c })
                    }}
                    className={`grid h-[42px] w-[42px] place-items-center rounded-xl ${
                      bg === c ? 'border-2 border-stroke-mint' : ''
                    }`}
                    title={c}
                  >
                    <StarcandyFillIcon
                      className="h-8 w-8"
                      style={{ color: c }}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 대상자 확인 */}
        {tab === 'screen' && (
          <div className="space-y-6">
            <div>
              <div className="mb-1 text-heading-3 font-heading-3 leading-heading-3 text-text-default">
                대상자 설정하기
              </div>
              <p className="mb-5 text-caption-4 font-caption-4 leading-caption-4 tracking-caption-4 text-gray-400">
                보다 정확한 응답자 선별을 위해,
                <br />
                해당 문항을 선택한 사람은 대상자로 판별됩니다.
              </p>

              <div className="mb-3 pb-3">
                <input
                  onChange={(e) => setGuardQ(e.target.value)}
                  className="w-full border-b px-4 py-3 text-label-7 font-label-7 text-text-primary leading-label-7 outline-none placeholder:text-text-primary"
                  placeholder="Q. 질문을 작성해주세요"
                />
              </div>

              <div className="space-y-3">
                {guardOpts.map((o) => {
                  const checked = enabledIds.includes(o.id)
                  const labelId = `guard-opt-${o.id}`
                  return (
                    <div
                      key={o.id}
                      className="flex items-center gap-3 rounded-xs border border-stroke-subtle p-2"
                    >
                      <span className="text-gray-400">
                        <ListIcon />
                      </span>
                      <CustomCheckbox
                        checked={checked}
                        labelledBy={labelId}
                        onChange={(next) =>
                          setEnabledIds((prev) =>
                            next
                              ? [...prev, o.id]
                              : prev.filter((x) => x !== o.id),
                          )
                        }
                      />
                      <input
                        value={o.label}
                        onChange={(e) =>
                          setGuardOpts((prev) =>
                            prev.map((x) =>
                              x.id === o.id
                                ? { ...x, label: e.target.value }
                                : x,
                            ),
                          )
                        }
                        placeholder="질문지 작성란입니다"
                        className="flex-1 text-body-6 font-body-6 leading-body-6 tracking-body-6 text-text-default outline-none"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setGuardOpts((prev) =>
                            prev.filter((x) => x.id !== o.id),
                          )
                        }
                        className="text-gray-400"
                        title="삭제"
                      >
                        <CloseIcon />
                      </button>
                    </div>
                  )
                })}
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setGuardOpts((prev) => [
                      ...prev,
                      { id: crypto.randomUUID(), label: '' },
                    ])
                  }
                  className="rounded-xs w-full bg-fill-primary px-4 py-2 text-label-7 font-label-7 leading-label-7 text-text-default hover:opacity-90 grid place-items-center"
                >
                  항목 추가
                </button>
                <button
                  type="button"
                  onClick={() =>
                    onApplyScreening?.({
                      question: guardQ,
                      options: guardOpts,
                      enabledIds,
                    })
                  }
                  className="rounded-xs w-full bg-fill-primary px-4 py-2 text-label-7 font-label-7 leading-label-7 text-text-default hover:opacity-90 grid place-items-center"
                >
                  적용하기
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 설정 */}
        {tab === 'settings' && (
          <div className="space-y-8">
            <div>
              <div className="mb-2 text-label-5 font-label-5 leading-label-5 tracking-label-5 text-text-default">
                성별
              </div>
              <div className="flex flex-wrap gap-2">
                {(['전체', '남자', '여자'] as const).map((g) => (
                  <Chip
                    key={g}
                    active={gender === g}
                    onClick={() => setGender(g)}
                  >
                    {g}
                  </Chip>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-2 text-label-5 font-label-5 leading-label-5 tracking-label-5 text-text-default">
                연령대
              </div>
              <div className="flex flex-wrap gap-x-2 gap-y-2">
                {(
                  [
                    '전체',
                    '10대',
                    '20대',
                    '30대',
                    '40대',
                    '50대',
                    '60대 이상',
                  ] as const
                ).map((a) => (
                  <Chip
                    key={a}
                    active={age === a}
                    onClick={() => setAge(a)}
                  >
                    {a}
                  </Chip>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-2 text-label-5 font-label-5 leading-label-5 tracking-label-5 text-text-default">
                직업
              </div>
              <div className="flex flex-wrap gap-x-1 gap-y-2">
                {(
                  [
                    '전체',
                    '중학생',
                    '고등학생',
                    '대학생',
                    '취준생',
                    '직장인',
                    '전문직',
                    '프리랜서',
                    '창업자',
                    '자영업자',
                  ] as const
                ).map((j) => (
                  <Chip
                    key={j}
                    active={job === j}
                    onClick={() => setJob(j)}
                  >
                    {j}
                  </Chip>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-1 text-label-5 font-label-5 leading-label-5 tracking-label-5 text-text-default">
                태그
              </div>
              <p className="mb-3 text-sm text-gray-500">
                태그는 최대 2개까지 선택 가능합니다
              </p>
              <div className="flex flex-wrap gap-x-1 gap-y-2">
                {TAGS.map((t) => (
                  <Chip
                    key={t}
                    active={tags.includes(t)}
                    onClick={() => toggleTag(t)}
                  >
                    {t}
                  </Chip>
                ))}
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={() =>
                  onChangeSettings?.({
                    gender,
                    age,
                    job,
                    tags,
                  })
                }
                className="rounded-xs w-full bg-fill-primary px-4 py-2 text-label-7 font-label-7 leading-label-7 text-text-default hover:opacity-90"
              >
                적용하기
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}

function CustomCheckbox({
  checked,
  onChange,
  labelledBy,
  className = 'h-6 w-6',
}: {
  checked: boolean
  onChange: (next: boolean) => void
  labelledBy?: string
  className?: string
}) {
  const toggle = () => onChange(!checked)
  const onKey = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault()
      toggle()
    }
  }
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-labelledby={labelledBy}
      onClick={toggle}
      onKeyDown={onKey}
      className={`inline-flex items-center justify-center ${className}`}
      title="대상자 문항 여부"
    >
      {checked ? (
        <CheckboxFillIcon className="text-text-primary" />
      ) : (
        <CheckboxDefaultIcon className="text-gray-300" />
      )}
    </button>
  )
}
