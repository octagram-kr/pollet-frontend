'use client'

import { useEffect, useState } from 'react'
import {
  RadioDefaultIcon,
  RadioFillIcon,
  CheckboxDefaultIcon,
  CheckboxFillIcon,
} from '@/components/icons'

export const CONSENT_TYPES = [
  '수집하지 않음',
  '개인 정보 수집 및 이용 동의',
  '개인정보 제3자 동의',
] as const
export type ConsentType = (typeof CONSENT_TYPES)[number] | ''

export const COLLECTION_ITEMS = [
  '연락처',
  '이메일',
  '이름',
  '직접 입력',
] as const
export type CollectionItem = (typeof COLLECTION_ITEMS)[number]

export const RETENTION_OPTIONS = ['3개월', '6개월', '1년', '직접 입력'] as const
export type RetentionOption = (typeof RETENTION_OPTIONS)[number] | ''

export type PrivacyAgreementValue = {
  consentType: ConsentType
  collectPurpose: string
  collectItems: CollectionItem[]
  collectItemsCustom: string
  retention: RetentionOption
  retentionCustom: string
}

type Props = {
  className?: string
  value?: PrivacyAgreementValue
  defaultValue?: Partial<PrivacyAgreementValue>
  onChange?: (v: PrivacyAgreementValue) => void
}

export default function PrivacyAgreementCard({
  className,
  value,
  defaultValue,
  onChange,
}: Props) {
  const [state, setState] = useState<PrivacyAgreementValue>(() => ({
    consentType: '',
    collectPurpose: '',
    collectItems: [],
    collectItemsCustom: '',
    retention: '',
    retentionCustom: '',
    ...defaultValue,
  }))

  /* 외부 제어값과 동기화 */
  useEffect(() => {
    if (value) setState(value)
  }, [value])

  const update = (patch: Partial<PrivacyAgreementValue>) => {
    const next = { ...state, ...patch }
    setState(next)
    onChange?.(next)
  }

  const disabled = state.consentType === '수집하지 않음'

  const handleConsentChange = (t: ConsentType) => {
    if (t === '수집하지 않음') {
      // ‘수집하지 않음’ 선택 시 관련 필드 초기화 + 비활성화
      update({
        consentType: t,
        collectPurpose: '',
        collectItems: [],
        collectItemsCustom: '',
        retention: '',
        retentionCustom: '',
      })
    } else {
      update({ consentType: t })
    }
  }

  const isItemChecked = (v: CollectionItem) => state.collectItems.includes(v)

  const toggleItem = (v: CollectionItem) => {
    if (disabled) return
    const has = isItemChecked(v)
    const nextItems = has
      ? state.collectItems.filter((x) => x !== v)
      : [...state.collectItems, v]

    update({
      collectItems: nextItems,
      ...(v === '직접 입력' && has ? { collectItemsCustom: '' } : {}),
    })
  }

  const selectRetention = (opt: RetentionOption) => {
    if (disabled) return
    update({
      retention: opt,
      ...(opt !== '직접 입력' ? { retentionCustom: '' } : {}),
    })
  }

  return (
    <div
      className={[
        'mb-16 rounded-sm border border-stroke-subtle bg-fill-white px-6 py-5',
        className ?? '',
      ].join(' ')}
    >
      <h4 className="mb-8 text-body-2 font-body-2 leading-body-2 tracking-body-2 text-text-default">
        개인정보 수집 및 이용 동의
      </h4>

      <div className="space-y-4">
        {/* 1) 개인정보 동의 종류 */}
        <div className="flex items-center gap-4">
          <div className="w-44 shrink-0 text-body-4 font-body-4 leading-body-4 tracking-body-4 text-text-default">
            개인정보 동의 종류
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {CONSENT_TYPES.map((t) => {
              const id = `consent-${t}`
              const selected = state.consentType === t
              return (
                <label
                  key={t}
                  htmlFor={id}
                  className="inline-flex cursor-pointer items-center gap-1 text-body-5 font-body-5 tracking-body-5 text-text-subtle"
                >
                  <input
                    id={id}
                    type="radio"
                    name="consentType"
                    className="sr-only peer"
                    checked={selected}
                    onChange={() => handleConsentChange(t)}
                  />
                  <span>
                    {selected ? (
                      <RadioFillIcon className="w-[18px] text-primary" />
                    ) : (
                      <RadioDefaultIcon className="w-[18px]" />
                    )}
                  </span>
                  <span
                    className={
                      selected ? 'text-text-default' : 'text-text-subtle'
                    }
                  >
                    {t}
                  </span>
                </label>
              )
            })}
          </div>
        </div>

        {/* 2) 개인정보 수집 목적 */}
        <div
          className={`flex items-center gap-4 ${disabled ? 'opacity-60' : ''}`}
          aria-disabled={disabled}
        >
          <div className="w-44 shrink-0 text-body-4 font-body-4 leading-body-4 tracking-body-4 text-text-default">
            개인정보 수집 목적
          </div>
          <input
            type="text"
            value={state.collectPurpose}
            onChange={(e) => update({ collectPurpose: e.target.value })}
            placeholder="수집 목적을 작성해주세요 (예: 추후 인터뷰 모집, 기프트콘 전달 등)"
            disabled={disabled}
            className={`w-full appearance-none border-none bg-transparent text-body-5 font-body-5 leading-body-5 tracking-body-5 outline-none ${
              disabled
                ? 'cursor-not-allowed text-text-subtler'
                : 'text-text-default placeholder:text-text-subtle'
            }`}
          />
        </div>

        {/* 3) 개인정보 수집 항목 */}
        <div
          className={`flex items-start gap-4 ${disabled ? 'opacity-60' : ''}`}
          aria-disabled={disabled}
        >
          <div className="w-44 shrink-0 text-body-4 font-body-4 leading-body-4 tracking-body-4 text-text-default">
            개인정보 수집 항목
          </div>
          <div
            className={`flex flex-wrap items-center gap-x-5 gap-y-2 ${disabled ? 'pointer-events-none' : ''}`}
          >
            {COLLECTION_ITEMS.map((it) => {
              const id = `collect-${it}`
              const checked = isItemChecked(it)
              const isCustom = it === '직접 입력'
              return (
                <label
                  key={it}
                  htmlFor={id}
                  className="inline-flex items-center gap-1 text-body-5 font-body-5 leading-body-5 tracking-body-5 text-text-subtle"
                >
                  <input
                    id={id}
                    type="checkbox"
                    className="sr-only peer"
                    checked={checked}
                    disabled={disabled}
                    onChange={() => toggleItem(it)}
                  />
                  {checked ? (
                    <CheckboxFillIcon className="w-[18px] text-primary" />
                  ) : (
                    <CheckboxDefaultIcon className="w-[18px]" />
                  )}
                  {isCustom ? (
                    checked ? (
                      <input
                        autoFocus
                        type="text"
                        value={state.collectItemsCustom}
                        onChange={(e) =>
                          update({ collectItemsCustom: e.target.value })
                        }
                        placeholder="항목 입력"
                        disabled={disabled}
                        className={`w-40 min-w-[8rem] appearance-none border-none bg-transparent outline-none ${
                          disabled
                            ? 'cursor-not-allowed text-text-subtler'
                            : 'text-body-5 font-body-5 leading-body-5 tracking-body-5 text-text-default placeholder:text-gray-400'
                        }`}
                      />
                    ) : (
                      <span
                        className={
                          checked ? 'text-text-default' : 'text-text-subtle'
                        }
                      >
                        직접 입력
                      </span>
                    )
                  ) : (
                    <span
                      className={
                        checked ? 'text-text-default' : 'text-text-subtle'
                      }
                    >
                      {it}
                    </span>
                  )}
                </label>
              )
            })}
          </div>
        </div>

        {/* 4) 개인정보 보유 및 이용 기간 */}
        <div
          className={`flex items-start gap-4 ${disabled ? 'opacity-60' : ''}`}
          aria-disabled={disabled}
        >
          <div className="w-44 shrink-0 text-body-4 font-body-4 leading-body-4 tracking-body-4 text-text-default">
            개인정보 보유 및 이용 기간
          </div>
          <div
            className={`flex flex-wrap items-center gap-x-5 gap-y-2 ${disabled ? 'pointer-events-none' : ''}`}
          >
            {RETENTION_OPTIONS.map((opt) => {
              const id = `retention-${opt}`
              const selected = state.retention === opt
              const isCustom = opt === '직접 입력'
              return (
                <label
                  key={opt}
                  htmlFor={id}
                  className="inline-flex items-center gap-1 text-body-5 font-body-5 leading-body-5 tracking-body-5 text-text-subtle"
                >
                  <input
                    id={id}
                    type="radio"
                    name="retention"
                    className="sr-only peer"
                    checked={selected}
                    disabled={disabled}
                    onChange={() => selectRetention(opt)}
                  />
                  {selected ? (
                    <RadioFillIcon className="w-[18px] text-primary" />
                  ) : (
                    <RadioDefaultIcon className="w-[18px]" />
                  )}
                  {isCustom ? (
                    selected ? (
                      <input
                        autoFocus
                        type="text"
                        value={state.retentionCustom}
                        onChange={(e) =>
                          update({ retentionCustom: e.target.value })
                        }
                        placeholder="기간 입력"
                        disabled={disabled}
                        className={`w-28 min-w-[7rem] appearance-none border-none bg-transparent outline-none ${
                          disabled
                            ? 'cursor-not-allowed text-text-subtler'
                            : 'text-text-default placeholder:text-text-subtle'
                        }`}
                      />
                    ) : (
                      <span>직접 입력</span>
                    )
                  ) : (
                    <span
                      className={
                        selected ? 'text-text-default' : 'text-text-subtle'
                      }
                    >
                      {opt}
                    </span>
                  )}
                </label>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
