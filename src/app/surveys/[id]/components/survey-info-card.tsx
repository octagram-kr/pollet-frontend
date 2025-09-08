'use client'

import type { Survey } from '@/types/survey'
import RewardInfo from './survey-info-card/reward-info'
import Duration from './survey-info-card/duration'
import Timer from './survey-info-card/timer'
import ParticipantStatus from './survey-info-card/participant-status'
import SurveyorInfo from './survey-info-card/surveyor-info'
import PurposeInfo from './survey-info-card/purpose-info'
import PeriodInfo from './survey-info-card/period-info'
import RetentionPeriodInfo from './survey-info-card/retention-period-info'
import PersonalInfoCollection from './survey-info-card/personal-info-collection'

export default function SurveyInfoCard({ survey }: { survey: Survey }) {
  const isClosing = Boolean(survey.closingAt)

  return (
    <aside className="rounded-2xl bg-white p-4 shadow-sm md:p-5">
      {/* 썸네일 자리(회색 격자) */}
      <div className="relative aspect-[4/3] w-full rounded-xl bg-[linear-gradient(45deg,#eee_25%,transparent_25%,transparent_75%,#eee_75%),linear-gradient(45deg,#eee_25%,transparent_25%,transparent_75%,#eee_75%)] bg-[length:20px_20px] bg-[position:0_0,10px_10px]" />

      {/* 상단 배지들 */}
      <div className="mt-3 flex items-center justify-between">
        <RewardInfo reward={survey.reward} />
        <div className="flex items-center gap-2">
          <Duration minutes={survey.expectedMinutes} />
          {isClosing && <Timer closingAt={survey.closingAt!} />}
        </div>
      </div>

      <div className="mt-4 space-y-3 text-sm">
        <ParticipantStatus
          value={survey.participants.current}
          max={survey.participants.max}
        />
        <SurveyorInfo name={survey.surveyor.name} />
        <PurposeInfo value={survey.purpose} />
        <PeriodInfo
          from={survey.period.from}
          to={survey.period.to}
        />
        <RetentionPeriodInfo months={survey.retentionMonths} />
        {survey.personalInfo && (
          <PersonalInfoCollection
            items={survey.personalInfo.items}
            purpose={survey.personalInfo.purpose}
            retention={survey.personalInfo.retention}
          />
        )}
      </div>
    </aside>
  )
}
