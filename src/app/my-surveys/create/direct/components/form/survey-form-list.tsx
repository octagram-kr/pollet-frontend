'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import SurveyFormCard from './survey-form-card'
import { QuestionForm } from './types'

type Props = {
  /** 부모로 폼 배열을 올릴 때 사용 */
  onFormsChange?: React.Dispatch<React.SetStateAction<QuestionForm[]>>
  /** 외부에서 초기 폼을 주고 싶을 때 선택 사용 */
  initialForms?: QuestionForm[]
}

const newId = () => Math.random().toString(36).slice(2)

const singleBase = (): QuestionForm => ({
  id: newId(),
  type: 'single',
  title: '',
  description: '',
  options: [
    { id: newId(), label: '' },
    { id: newId(), label: '' },
    { id: newId(), label: '' },
    { id: newId(), label: '' },
  ],
  required: false,
  interviewRequest: false,
  inattentiveCheck: false,
})

const defaultSingle = (sectionNo?: number): QuestionForm => ({
  ...singleBase(),
  sectionNo,
})

const defaultMultiple = (): QuestionForm => ({
  id: newId(),
  type: 'multiple',
  title: '',
  description: '',
  options: [
    { id: newId(), label: '' },
    { id: newId(), label: '' },
    { id: newId(), label: '' },
    { id: newId(), label: '' },
  ],
  required: false,
  multiAnswer: true, // 복수형 디폴트 ON
  interviewRequest: false,
})

const defaultShort = (): QuestionForm => ({
  id: newId(),
  type: 'short',
  title: '',
  description: '',
  helper: '',
  required: false,
})

const defaultLong = (): QuestionForm => ({
  id: newId(),
  type: 'long',
  title: '',
  description: '',
  helper: '',
  required: false,
})

export default function SurveyFormList({
  onFormsChange,
  initialForms = [],
}: Props) {
  const [forms, setForms] = useState<QuestionForm[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)

  const didInitRef = useRef(false)
  useEffect(() => {
    if (didInitRef.current) return
    didInitRef.current = true

    if (initialForms && initialForms.length > 0) {
      setForms(initialForms)
    } else {
      setForms([
        defaultSingle(1),
        defaultMultiple(),
        defaultShort(),
        defaultLong(),
      ])
    }
    // deps 비우는 것이 핵심 (initialForms 기본값 [] 로 인해 루프 방지)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    onFormsChange?.(forms)
  }, [forms, onFormsChange])

  const sectionCount = useMemo(
    () => forms.filter((f) => f.sectionNo != null).length || 1,
    [forms],
  )

  const updateForm = (idx: number, patch: Partial<QuestionForm>) => {
    setForms((prev) => prev.map((f, i) => (i === idx ? { ...f, ...patch } : f)))
  }

  const replaceForm = (idx: number, next: QuestionForm) => {
    setForms((prev) => prev.map((f, i) => (i === idx ? next : f)))
  }

  const insertAfter = (idx: number, q: QuestionForm) => {
    setForms((prev) => {
      const next = prev.slice()
      next.splice(idx + 1, 0, q)
      return next
    })
    setActiveId(q.id)
  }

  const cloneAt = (idx: number) => {
    setForms((prev) => {
      const base = prev[idx]
      const idMap = new Map<string, string>()
      const copiedOptions = base.options?.map((o) => {
        const nid = newId()
        idMap.set(o.id, nid)
        return { ...o, id: nid }
      })
      const remap = (id?: string | null) =>
        id ? (idMap.get(id) ?? null) : null
      const copy: QuestionForm = {
        ...base,
        id: newId(),
        options: copiedOptions,
        interviewTargetOptionId: remap(base.interviewTargetOptionId),
        correctOptionId: remap(base.correctOptionId),
      }
      const next = prev.slice()
      next.splice(idx + 1, 0, copy)
      // 다음 렌더 이후 활성화 id 설정
      queueMicrotask(() => setActiveId(copy.id))
      return next
    })
  }

  const removeAt = (idx: number) => {
    const removedId = forms[idx].id
    setForms((prev) => prev.filter((_, i) => i !== idx))
    if (activeId === removedId) setActiveId(null)
  }

  const addQuestionBelow = (idx: number) => insertAfter(idx, defaultSingle())

  const addSectionBelow = (idx: number) => {
    const nextNo =
      Math.max(0, ...forms.map((f) => f.sectionNo ?? 0)) + 1 || sectionCount + 1
    const q = defaultSingle()
    q.sectionNo = nextNo
    insertAfter(idx, q)
  }

  if (forms.length === 0) {
    return <div className="mt-28 mb-16 space-y-6" />
  }

  return (
    <div className="mt-28 mb-16 space-y-6">
      {forms.map((q, idx) => (
        <div
          key={q.id}
          data-qid={q.id}
          className={q.sectionNo != null ? 'mt-18' : ''}
        >
          <SurveyFormCard
            key={q.id}
            index={idx}
            total={forms.length}
            data={q}
            isActive={activeId === q.id}
            onActivate={() => setActiveId(q.id)}
            onDeactivate={() => setActiveId(null)}
            onChange={(patch) => updateForm(idx, patch)}
            onReplace={(next) => replaceForm(idx, next)}
            onClone={() => cloneAt(idx)}
            onDelete={() => removeAt(idx)}
            onAddQuestion={() => addQuestionBelow(idx)}
            onAddSection={() => addSectionBelow(idx)}
          />
        </div>
      ))}
    </div>
  )
}
