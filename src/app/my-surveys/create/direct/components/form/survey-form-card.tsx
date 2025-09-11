'use client'

import { useState } from 'react'
import { QuestionForm, QuestionType, ChoiceOption } from './types'
import InterviewRequestModal from './interview-request-modal'
import InattentiveAnswerModal from './inattentive-answer-modal'
import {
  SingleIcon,
  MultipleIcon,
  ShortmentIcon,
  LongmentIcon,
  ListIcon,
  ImageIcon,
  CloseIcon,
  ToggleLgOnIcon,
  ToggleLgOffIcon,
  UserCheckIcon,
  BanIcon,
  CopyIcon,
  TrashIcon,
  RadioDefaultIcon,
  CheckboxDefaultIcon,
  UpIcon,
  DownIcon,
} from '@/components/icons'

type Props = {
  index: number
  total: number
  data: QuestionForm
  isActive: boolean
  onActivate: () => void
  onDeactivate: () => void
  onChange: (patch: Partial<QuestionForm>) => void
  onReplace: (next: QuestionForm) => void
  onClone: () => void
  onDelete: () => void
  onAddSection: () => void
  onAddQuestion: () => void
}

const TYPE_META: Record<
  QuestionType,
  { label: string; icon: React.ReactNode }
> = {
  single: {
    label: '객관식 단일형',
    icon: <SingleIcon className="w-5 fill-fill-deep" />,
  },
  multiple: {
    label: '객관식 복수형',
    icon: <MultipleIcon className="w-5 fill-fill-deep" />,
  },
  short: {
    label: '주관식 단답형',
    icon: <ShortmentIcon className="w-5 fill-fill-deep" />,
  },
  long: {
    label: '주관식 서술형',
    icon: <LongmentIcon className="w-5 fill-fill-deep" />,
  },
}

const newOpt = (): ChoiceOption => ({
  id: Math.random().toString(36).slice(2),
  label: '',
})

export default function SurveyFormCard(props: Props) {
  const {
    data,
    isActive,
    onActivate,
    onDeactivate,
    onChange,
    onReplace,
    onClone,
    onDelete,
    onAddQuestion,
    onAddSection,
  } = props
  return isActive ? (
    <Editor
      {...{
        data,
        onDeactivate,
        onChange,
        onReplace,
        onClone,
        onDelete,
        onAddQuestion,
        onAddSection,
      }}
    />
  ) : (
    <Preview
      data={data}
      onActivate={onActivate}
    />
  )
}

function Preview({
  data,
  onActivate,
}: {
  data: QuestionForm
  onActivate: () => void
}) {
  const isChoice = data.type === 'single' || data.type === 'multiple'
  const showInterview = isChoice && !!data.interviewRequest
  const showInattentive = data.type === 'single' && !!data.inattentiveCheck

  // 표시 텍스트
  const title = data.title || '질문지 작성란입니다'
  const desc = data.description || '질문에 대한 설명을 작성해주세요'

  return (
    <button
      type="button"
      onClick={onActivate}
      className={`group relative w-full cursor-pointer ${data.sectionNo != null ? 'rounded-sm rounded-tl-none' : 'rounded-sm'} border border-gray-200 bg-fill-white px-6 py-5 text-left transition`}
    >
      {data.sectionNo != null && (
        <div
          className="pointer-events-none absolute -left-[2px] -top-[46px] z-10"
          aria-hidden
        >
          <div className="rounded-t-sm bg-fill-primary px-6 py-2 text-heading-3 font-heading-3 leading-heading-3 text-text-default">
            섹션 {data.sectionNo}
          </div>
        </div>
      )}

      <h3 className="px-4 py-2 text-title-2 font-title-2 leading-title-2 text-text-default gap-2 flex">
        Q. <p className="text-[#1E1E1E]">{title}</p>
      </h3>
      <p className="mb-6 px-4 text-label-6 font-label-6 leading-label-6 text-text-subtle">
        {desc}
      </p>

      {/* 타입별 프리뷰 */}
      {isChoice ? (
        <div className="space-y-3">
          {(data.options ?? new Array(4).fill(null))
            .slice(0, 4)
            .map((opt, i) => (
              <div
                key={opt?.id ?? i}
                className="flex items-center gap-2 rounded-xxs bg-fill-subtle px-4 py-2"
              >
                {data.type === 'single' ? (
                  <RadioDefaultIcon className="w-5 text-fill-active" />
                ) : (
                  <CheckboxDefaultIcon className="w-5 text-fill-active" />
                )}
                <span className="text-label-6 font-label-6 leading-label-6 text-text-subtle">
                  {opt?.label || '질문지 작성란입니다'}
                </span>
              </div>
            ))}
        </div>
      ) : data.type === 'short' ? (
        <div className="rounded-xs bg-fill-subtle px-4 py-3 text-body-5 font-body-5 leading-body-5 tracking-body-5 text-text-subtler">
          상황에 맞는 설명을 작성해주세요.
        </div>
      ) : (
        <div className="h-[180px] rounded-xs bg-fill-subtle px-4 py-3 text-body-5 font-body-5 leading-body-5 tracking-body-5 text-text-subtler">
          상황에 맞는 설명을 작성해주세요.
        </div>
      )}

      {/* 하단 오른쪽 배지들 */}
      <div className="mt-5 flex justify-end gap-3">
        {showInterview && (
          <span className="pointer-events-none inline-flex items-center gap-2 rounded-xs bg-fill-subtle px-3 py-1 text-fill-primary">
            <UserCheckIcon /> 인터뷰 요청
          </span>
        )}
        {showInattentive && (
          <span className="pointer-events-none inline-flex items-center gap-2 rounded-xs bg-fill-subtle px-3 py-1 text-fill-primary">
            <BanIcon /> 불성실 응답
          </span>
        )}
      </div>
    </button>
  )
}

function Editor({
  data,
  onChange,
  onReplace,
  onClone,
  onDelete,
  onAddSection,
  onAddQuestion,
}: {
  data: QuestionForm
  onDeactivate: () => void
  onChange: (patch: Partial<QuestionForm>) => void
  onReplace: (next: QuestionForm) => void
  onClone: () => void
  onDelete: () => void
  onAddSection: () => void
  onAddQuestion: () => void
}) {
  const [openInterview, setOpenInterview] = useState(false)
  const [openInattentive, setOpenInattentive] = useState(false)
  const [typeOpen, setTypeOpen] = useState(false)

  const changeType = (t: QuestionType) => {
    setTypeOpen(false)
    if (t === data.type) return
    if (t === 'single' || t === 'multiple') {
      onReplace({
        ...data,
        type: t,
        options: data.options?.length ? data.options : [newOpt(), newOpt()],
        multiAnswer: t === 'multiple',
        interviewRequest: false,
        interviewTargetOptionId: null,
        inattentiveCheck: false,
        correctOptionId: null,
        helper: '',
      })
    } else {
      onReplace({
        ...data,
        type: t,
        options: undefined,
        multiAnswer: undefined,
        interviewRequest: undefined,
        interviewTargetOptionId: undefined,
        inattentiveCheck: undefined,
        correctOptionId: undefined,
        helper: '',
      })
    }
  }

  const removeOption = (id: string) =>
    onChange({ options: (data.options ?? []).filter((o) => o.id !== id) })
  const setOption = (id: string, label: string) =>
    onChange({
      options: (data.options ?? []).map((o) =>
        o.id === id ? { ...o, label } : o,
      ),
    })

  const isChoice = data.type === 'single' || data.type === 'multiple'

  return (
    <div
      className={`relative overflow-visible ${data.sectionNo != null ? 'rounded-sm rounded-tl-none' : 'rounded-sm'} border border-stroke-primary bg-fill-white px-6 py-5`}
    >
      {data.sectionNo != null && (
        <div
          className="pointer-events-none absolute -left-[2px] -top-[46px] z-10"
          aria-hidden
        >
          <div className="rounded-t-sm bg-fill-primary px-6 py-2 text-heading-3 font-heading-3 leading-heading-3 text-text-default">
            섹션 {data.sectionNo}
          </div>
        </div>
      )}

      {/* 질문 종류 드롭다운 */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setTypeOpen((v) => !v)}
          className={`flex w-[370px] max-w-full items-center justify-between rounded-sm border px-5 py-2 text-left text-text-strong text-label-6 font-label-6 leading-label-6 ${typeOpen === true ? 'border-stroke-primary' : 'border-stroke-subtle'}`}
        >
          <span className="flex items-center gap-2">
            {TYPE_META[data.type].icon}
            {TYPE_META[data.type].label}
          </span>
          <span>
            {typeOpen === true ? (
              <UpIcon className="text-fill-deep" />
            ) : (
              <DownIcon className="text-fill-deep" />
            )}
          </span>
        </button>

        {typeOpen && (
          <div
            className="absolute z-10 mt-2 w-[370px] max-w-full rounded-sm bg-fill-white p-3 shadow-lg"
            onMouseLeave={() => setTypeOpen(false)}
          >
            <div className="grid grid-cols-2 gap-2">
              {(['single', 'multiple', 'short', 'long'] as QuestionType[]).map(
                (t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => changeType(t)}
                    className={`flex items-center justify-center gap-2 p-1 text-left text-sm ${
                      data.type === t
                        ? 'text-text-primary'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {TYPE_META[t].icon}
                    <span className="text-label-6 font-label-6 leading-label-6 text-text-strong">
                      {TYPE_META[t].label}
                    </span>
                  </button>
                ),
              )}
            </div>
          </div>
        )}
      </div>

      {/* 본문(편집) */}
      <div className="mt-6">
        <h4 className="px-4 py-2 text-title-2 font-title-2 leading-title-2 text-gray-900">
          Q.{' '}
          <input
            value={data.title}
            onChange={(e) => onChange({ title: e.target.value })}
            placeholder="질문지 작성란입니다"
            className="w-[90%] appearance-none border-none bg-transparent p-0 text-title-2 font-title-2 leading-title-2 text-[#1E1E1E] outline-none placeholder:text-[#1E1E1E]"
          />
        </h4>

        <input
          value={data.description ?? ''}
          onChange={(e) => onChange({ description: e.target.value })}
          placeholder="질문에 대한 설명을 작성해주세요"
          className="w-full appearance-none border-none bg-transparent mb-6 px-4 text-label-6 font-label-6 leading-label-6 text-[#1E1E1E] outline-none placeholder:text-gray-500"
        />

        {isChoice ? (
          <div className="mb-6">
            {(data.options ?? []).map((opt) => (
              <div
                key={opt.id}
                className="group flex items-center gap-2 px-4 py-2"
              >
                <span className="text-text-subtle">
                  <ListIcon className="w-5" />
                </span>
                <input
                  value={opt.label}
                  onChange={(e) => setOption(opt.id, e.target.value)}
                  placeholder={
                    opt.isOther ? '기타(직접 입력)' : '질문지 작성란입니다'
                  }
                  className="w-full appearance-none border-none bg-transparent text-label-6 font-label-6 leading-label-6 outline-none placeholder:text-text-subtle"
                />
                <button
                  type="button"
                  className="text-text-subtle"
                  title="이미지"
                >
                  <ImageIcon className="w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => removeOption(opt.id)}
                  className="text-text-subtle"
                  title="삭제"
                >
                  <CloseIcon className="w-5" />
                </button>
              </div>
            ))}

            <div className="mt-6 flex gap-2">
              <button
                type="button"
                onClick={() =>
                  onChange({ options: [...(data.options ?? []), newOpt()] })
                }
                className="rounded-xxs w-[66px] h-[24px] bg-fill-primary px-3 py-1 text-label-8 font-label-8 leading-label-8 tracking-label-8 text-text-default hover:bg-fill-primary/90"
              >
                항목 추가
              </button>
              <button
                type="button"
                onClick={() =>
                  onChange({
                    options: [
                      ...(data.options ?? []),
                      { id: newOpt().id, label: '', isOther: true },
                    ],
                  })
                }
                className="rounded-xxs w-[66px] h-[24px] bg-fill-default px-3 py-1 text-label-8 font-label-8 leading-label-8 tracking-label-8 text-text-default hover:bg-fill-default/90"
              >
                기타 추가
              </button>
            </div>
          </div>
        ) : (
          <>
            {data.type === 'long' ? (
              <textarea
                value={data.helper ?? ''}
                onChange={(e) => onChange({ helper: e.target.value })}
                placeholder="상황에 맞는 설명을 작성해주세요."
                className="w-full min-h-[180px] border border-gray-200 rounded-xs px-4 py-3 text-body-5 font-body-5 leading-body-5 tracking-body-5 placeholder:text-gray-300"
              />
            ) : (
              <input
                value={data.helper ?? ''}
                onChange={(e) => onChange({ helper: e.target.value })}
                placeholder="상황에 맞는 설명을 작성해주세요."
                className="w-full border border-gray-200 rounded-xs px-4 py-3 text-body-5 font-body-5 leading-body-5 tracking-body-5 placeholder:text-gray-300"
              />
            )}
          </>
        )}
      </div>

      {/* 하단 컨트롤 바 */}
      <EditControls
        data={data}
        onChange={onChange}
        onClone={onClone}
        onDelete={onDelete}
        onOpenInterview={() => setOpenInterview(true)}
        onOpenInattentive={() => setOpenInattentive(true)}
      />

      {/* 하단 대버튼 */}
      <div className="mt-6 grid grid-cols-2 gap-6">
        <button
          type="button"
          onClick={onAddSection}
          className="rounded-xs bg-fill-primary-subtle px-4 py-3 text-label-4 font-label-4 leading-label-4 text-text-default hover:opacity-90"
        >
          섹션 추가
        </button>
        <button
          type="button"
          onClick={onAddQuestion}
          className="rounded-xs bg-fill-primary px-4 py-3 text-label-4 font-label-4 leading-label-4 text-text-default hover:opacity-90"
        >
          질문 추가
        </button>
      </div>
      {openInterview && (
        <InterviewRequestModal
          open={openInterview}
          options={data.options ?? []}
          selectedId={data.interviewTargetOptionId ?? null}
          onClose={() => setOpenInterview(false)}
          onApply={(optionId) => {
            onChange({
              interviewRequest: true,
              interviewTargetOptionId: optionId,
            })
            setOpenInterview(false)
          }}
        />
      )}

      {openInattentive && data.type === 'single' && (
        <InattentiveAnswerModal
          open={openInattentive}
          options={data.options ?? []}
          selectedId={data.correctOptionId ?? null}
          onClose={() => setOpenInattentive(false)}
          onApply={(correctId) => {
            onChange({ inattentiveCheck: true, correctOptionId: correctId })
            setOpenInattentive(false)
          }}
        />
      )}
    </div>
  )
}

function EditControls({
  data,
  onChange,
  onClone,
  onDelete,
  onOpenInterview,
  onOpenInattentive,
}: {
  data: QuestionForm
  onChange: (patch: Partial<QuestionForm>) => void
  onClone: () => void
  onDelete: () => void
  onOpenInterview?: () => void
  onOpenInattentive?: () => void
}) {
  const isChoice = data.type === 'single' || data.type === 'multiple'
  const hasOptions = (data.options ?? []).length > 0
  const showInterview = isChoice
  const showInattentive = data.type === 'single'

  return (
    <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-stroke-subtler pt-6">
      <div className="flex items-center gap-4">
        <Toggle
          label="답변 필수"
          checked={data.required}
          onChange={(v) => onChange({ required: v })}
        />
        {isChoice && (
          <Toggle
            label="복수 답변"
            checked={!!data.multiAnswer}
            onChange={(v) => onChange({ multiAnswer: v })}
          />
        )}
      </div>

      <div className="flex items-center gap-2">
        {showInterview && (
          <button
            type="button"
            onClick={() => onOpenInterview?.()}
            disabled={!hasOptions}
            className={`rounded-xs px-3 py-1 text-label-7 font-label-7 leading-label-7 text-text-default ${
              data.interviewRequest ? 'bg-fill-strong/30' : 'bg-fill-subtle'
            } ${!hasOptions ? 'opacity-40 cursor-not-allowed' : ''}`}
            title={
              !hasOptions
                ? '선택지가 있어야 설정할 수 있어요'
                : '인터뷰 요청 설정'
            }
          >
            {' '}
            <span className="flex gap-1">
              <UserCheckIcon className="text-fill-strong" /> 인터뷰 요청
            </span>
          </button>
        )}
        {showInattentive && (
          <button
            type="button"
            onClick={() => onOpenInattentive?.()}
            className={`rounded-xs px-3 py-1 text-label-7 font-label-7 leading-label-7 text-text-default ${
              data.inattentiveCheck ? 'bg-fill-strong/30' : 'bg-fill-subtle'
            } ${!hasOptions ? 'opacity-40 cursor-not-allowed' : ''}`}
            title={
              !hasOptions
                ? '선택지가 있어야 설정할 수 있어요'
                : '불성실 응답 설정'
            }
          >
            <span className="flex gap-1 text-text-default">
              <BanIcon className="w-5 text-fill-strong" /> 불성실 응답
            </span>
          </button>
        )}

        <button
          type="button"
          onClick={onClone}
          className="p-1 hover:cursor-pointer"
          title="복제"
        >
          <CopyIcon className="w-5 text-fill-deep" />
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="p-1 hover:cursor-pointer"
          title="삭제"
        >
          <TrashIcon className="w-5 text-fill-deep" />
        </button>
      </div>
    </div>
  )
}

/* 스위치 토글(간단) */
function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: (v: boolean) => void
}) {
  const handleToggle = () => onChange(!checked)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleToggle()
    }
  }
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
      className="inline-flex items-center gap-2"
    >
      <span className="text-caption-2 font-caption-2 leading-caption-2 text-text-default">
        {label}
      </span>

      <span className={checked ? 'text-text-primary' : 'text-text-subtle'}>
        {checked ? <ToggleLgOnIcon /> : <ToggleLgOffIcon />}
      </span>
    </button>
  )
}
