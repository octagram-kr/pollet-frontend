'use client'

import { useMemo } from 'react'
import type { QuestionForm, ChoiceOption } from './form/types'
import type { PrivacyAgreementValue } from './basic-info/privacy-agreement-card'

/** 작성본(등록 직전 묶음) */
export type SurveyDraft = {
  meta: {
    title: string
    description: string
    purpose: string
    period?: {
      startNow?: boolean
      endUntilClosed?: boolean
      startAt?: string // ISO
      endAt?: string // ISO
    }
    thumbnail?: string | null
  }
  privacy: PrivacyAgreementValue | null
  theme: { primary: string; background: string }
  screening: {
    question: string
    options: ChoiceOption[]
    enabledIds: string[]
  } | null
  settings: { gender: string; age: string; job: string; tags: string[] }
  forms: QuestionForm[]
}

/* ───────── helpers ───────── */

/** 필수 섹션 미완 여부(개인정보/대상자/태그) */
function missingRequired(d: SurveyDraft): boolean {
  const NONE_LABELS = new Set(['수집하지 않음', 'none'])

  const p = d.privacy
  const consent = p?.consentType ?? ''
  const consentIsNone = NONE_LABELS.has(consent as string)

  const okPrivacy =
    !!p &&
    !!consent &&
    (consentIsNone ||
      ((p.collectPurpose?.trim()?.length ?? 0) > 0 &&
        ((p.collectItems?.filter((i) => i !== '직접 입력')?.length ?? 0) > 0 ||
          (p.collectItems?.includes('직접 입력') &&
            (p.collectItemsCustom?.trim()?.length ?? 0) > 0)) &&
        ((!!p.retention && p.retention !== '직접 입력') ||
          (p.retention === '직접 입력' &&
            (p.retentionCustom?.trim()?.length ?? 0) > 0))))

  const okScreening =
    !!d.screening &&
    d.screening.question.trim().length > 0 &&
    (d.screening.enabledIds?.length ?? 0) > 0

  const okTags = (d.settings.tags?.length ?? 0) > 0

  return !(okPrivacy && okScreening && okTags)
}

/** 비완성 질문 목록(페이지/질문 위치 텍스트) */
function findIncompleteQuestions(forms: QuestionForm[]): string[] {
  let page = 1
  let qNoOnPage = 0
  const bad: string[] = []

  for (const f of forms) {
    if (typeof f.sectionNo === 'number') {
      page = f.sectionNo
      qNoOnPage = 0
    }
    qNoOnPage += 1

    const titleEmpty = !f.title?.trim()
    let contentBad = false
    if (f.type === 'single' || f.type === 'multiple') {
      const opts = f.options ?? []
      const has2 = opts.filter((o) => o.label?.trim()).length >= 2
      const someEmpty = opts.some((o) => !o.label?.trim())
      contentBad = !has2 || someEmpty
    } else {
      // 주관식은 제목만 필수로 체크
      contentBad = false
    }

    if (titleEmpty || contentBad) {
      bad.push(`페이지 ${page} - 질문 ${qNoOnPage}`)
    }
  }
  return bad
}

/* ───────── 모달 베이스 ───────── */
function Dim({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[60] bg-black/40"
      onClick={onClose}
      aria-hidden
    />
  )
}

function ModalShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-[61] grid place-items-center">
      <div className="w-[384px] rounded-md bg-white pt-8 pb-6 px-6 shadow-xl">
        {children}
      </div>
    </div>
  )
}

/* ───────── 프리플라이트 컨트롤러 ───────── */
export default function RegisterPreflight({
  draft,
  onClose,
  onProceed, // 확인 시 실제 이동(또는 등록 페이지 push)
}: {
  draft: SurveyDraft
  onClose: () => void
  onProceed: () => void
}) {
  const incomplete = useMemo(
    () => findIncompleteQuestions(draft.forms),
    [draft.forms],
  )
  const blocked = useMemo(() => missingRequired(draft), [draft])

  // 표시 모드 결정: 1) 필수 미작성(블로킹) > 2) 비완성 질문 > 3) 일반 확인
  const mode: 'missing' | 'incomplete' | 'confirm' = blocked
    ? 'missing'
    : incomplete.length
      ? 'incomplete'
      : 'confirm'

  return (
    <>
      <Dim onClose={onClose} />
      <ModalShell>
        {mode === 'confirm' && (
          <>
            <h3 className="mb-6 text-label-3 font-label-3 leading-label-3 text-text-strong">
              설문 조사 등록 후 수정이 불가합니다.
              <br />
              등록하시겠습니까?
            </h3>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={onClose}
                className="h-13 rounded-xs bg-fill-default text-label-4 font-label-4 leading-label-4 text-text-default hover:opacity-90"
              >
                취소
              </button>
              <button
                type="button"
                onClick={onProceed}
                className="h-13 rounded-xs bg-fill-primary text-label-4 font-label-4 leading-label-4 text-text-default hover:opacity-90"
              >
                확인
              </button>
            </div>
          </>
        )}

        {mode === 'incomplete' && (
          <>
            <h3 className="mb-6 text-label-3 font-label-3 leading-label-3 text-text-strong">
              설문 조사 등록 후 수정이 불가합니다.
              <br />
              등록하시겠습니까?
            </h3>
            <ul className="mb-6 list-disc space-y-2 mx-4 pl-5 text-body-6 font-body-6 leading-body-6 tracking-body-6 text-text-default">
              {incomplete.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={onClose}
                className="h-13 rounded-xs bg-fill-default text-label-4 font-label-4 leading-label-4 text-text-default hover:opacity-90"
              >
                취소
              </button>
              <button
                type="button"
                onClick={onProceed}
                className="h-13 rounded-xs bg-fill-primary text-label-4 font-label-4 leading-label-4 text-text-default hover:opacity-90"
              >
                확인
              </button>
            </div>
          </>
        )}

        {mode === 'missing' && (
          <>
            <h3 className="mb-6 text-label-3 font-label-3 leading-label-3 text-text-strong">
              해당 설정 이후 설문 등록이 가능합니다.
            </h3>
            <ul className="mb-6 mx-4 list-disc space-y-2 pl-5 text-body-6 font-body-6 leading-body-6 tracking-body-6 text-text-default">
              <li>개인정보 수집 및 이용 설정</li>
              <li>대상자 설정</li>
              <li>태그 선택</li>
            </ul>
            <div className="grid grid-cols-1">
              <button
                type="button"
                onClick={onClose}
                className="h-13 rounded-xs bg-fill-primary text-label-4 font-label-4 leading-label-4 text-text-default hover:opacity-90"
              >
                확인
              </button>
            </div>
          </>
        )}
      </ModalShell>
    </>
  )
}
