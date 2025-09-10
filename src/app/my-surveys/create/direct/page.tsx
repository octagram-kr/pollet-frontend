import SurveyHeader from './components/survey-header'
import ThumbnailCard from './components/basic-info/thumbnail-card'
import SurveyInfoCard from './components/basic-info/survey-info-card'
import PrivacyAgreementCard from './components/basic-info/privacy-agreement-card'

export default function Page() {
  const nickname = 'ㅇㅇㅇㅇ' // 데모용

  return (
    <main className="min-h-screen bg-bg-subtle">
      <section className="mx-auto max-w-5xl py-16">
        <SurveyHeader />

        {/* 이후 본문 섹션 추가 */}
        <div className="mt-10">
          <h2 className="inline-block rounded-t-sm bg-fill-primary px-6 py-2 text-heading-3 font-heading-3 leading-heading-3 text-text-default">
            설문 조사 기본 정보 입력
          </h2>
          <ThumbnailCard className="mb-8" />
          <SurveyInfoCard
            nickname={nickname}
            className="mb-8"
          />
          <PrivacyAgreementCard />
        </div>
      </section>
    </main>
  )
}
