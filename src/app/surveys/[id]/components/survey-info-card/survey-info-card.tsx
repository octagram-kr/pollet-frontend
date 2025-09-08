'use client'

import type { Survey } from '@/types/survey'
import RewardInfo from './reward-info'
import Duration from './duration'
import Timer from './timer'
import ParticipantStatus from './participant-status'
import InfoRow from './info-row'

export default function SurveyInfoCard({ survey }: { survey: Survey }) {
  const isClosing = Boolean(survey.closingAt)

  return (
    <aside className="rounded-l-lg bg-white pl-15 pr-6 py-12">
      {/* 썸네일 자리(회색 격자) */}
      <div className="relative aspect-[4/3] w-full bg-[linear-gradient(45deg,#eee_25%,transparent_25%,transparent_75%,#eee_75%),linear-gradient(45deg,#eee_25%,transparent_25%,transparent_75%,#eee_75%)] bg-[length:20px_20px] bg-[position:0_0,10px_10px]">
        {/* 뱃지들 */}
        <div className="flex items-center justify-between">
          <RewardInfo reward={survey.reward} />
          <Duration minutes={survey.expectedMinutes} />
          {isClosing && <Timer closingAt={survey.closingAt!} />}
          <ParticipantStatus
            value={survey.participants.current}
            max={survey.participants.max}
          />
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <div>
          <InfoRow
            label="설문자 정보"
            value={survey.surveyor.name}
          />
          <InfoRow
            label="목적"
            value={survey.purpose}
          />
          <InfoRow
            label="설문 기간"
            from={survey.period.from}
            to={survey.period.to}
          />
          <InfoRow
            label="응답 보유 기간"
            value={`${survey.retentionMonths}개월`}
          />
        </div>
        <hr className="text-stroke-subtler" />
        <div>
          {survey.personalInfo && (
            <>
              <InfoRow
                label="개인정보 수집 항목"
                value={`${survey.personalInfo.items}`}
              />
              <InfoRow
                label="개인정보 수집 목적"
                value={`${survey.personalInfo.purpose}`}
              />
              <InfoRow
                label="보유 및 이용 기간"
                value={`${survey.personalInfo.retention}`}
              />
            </>
          )}
        </div>
      </div>
    </aside>
  )
}
