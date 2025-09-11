'use client'

import { useEffect, useState } from 'react'
import { QuestionForm } from './components/form/types'
import SurveyHeader from './components/survey-header'
import ThumbnailCard from './components/basic-info/thumbnail-card'
import SurveyInfoCard from './components/basic-info/survey-info-card'
import PrivacyAgreementCard from './components/basic-info/privacy-agreement-card'
import SurveyFormList from './components/form/survey-form-list'
import GuidePanel from './components/guide/guide-panel'

export default function Page() {
  const nickname = 'ㅇㅇㅇㅇ' // 데모용
  const [forms, setForms] = useState<QuestionForm[]>([])
  const [primary, setPrimary] = useState('#22C1B4')
  const [detailBg, setDetailBg] = useState('#FFFFFF')

  const BUILDER_ID = 'builder-root'

  useEffect(() => {
    const el = document.getElementById(BUILDER_ID)
    if (el) el.style.backgroundColor = '#f9f9f9'
  }, [])
  useEffect(() => {
    document.documentElement.style.setProperty('--survey-primary', primary)
  }, [primary])
  useEffect(() => {
    document.documentElement.style.setProperty('--survey-detail-bg', detailBg)
  }, [detailBg])

  // 가이드 목차에서 특정 질문으로 점프
  const jumpTo = (qid: string) => {
    const el = document.querySelector<HTMLElement>(`[data-qid="${qid}"]`)
    el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <main
      className="min-h-screen bg-bg-subtle"
      id={BUILDER_ID}
    >
      <section className="mx-auto max-w-7xl py-16 ">
        <div className="mb-6">
          <SurveyHeader />
        </div>
        <div className="grid grid-cols-[1fr_384px] gap-6">
          <div>
            <h2 className="inline-block rounded-t-sm bg-fill-primary px-6 py-2 text-heading-3 font-heading-3 leading-heading-3 text-text-default">
              설문 조사 기본 정보 입력
            </h2>
            <ThumbnailCard className="mb-8" />
            <SurveyInfoCard
              nickname={nickname}
              className="mb-8"
            />
            <PrivacyAgreementCard />

            <SurveyFormList onFormsChange={setForms} />
          </div>
          <div className="mt-11.5">
            <GuidePanel
              forms={forms}
              onJumpTo={jumpTo}
              previewContainerId={BUILDER_ID}
              themePrimary={primary}
              themeBackground={detailBg}
              onThemeChange={(next) => {
                if (next.primary) setPrimary(next.primary)
                if (next.background) setDetailBg(next.background)
              }}
              onApplyScreening={(data) => {
                // TODO: 서버/전역 상태 반영
                console.log('screening applied', data)
              }}
              onChangeSettings={(data) => {
                // TODO: 서버/전역 상태 반영
                console.log('settings', data)
              }}
            />
          </div>
        </div>
      </section>
    </main>
  )
}
