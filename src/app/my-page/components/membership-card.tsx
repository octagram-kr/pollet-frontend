'use client'

import { StarcandyIcon } from '@/components/icons'

/**
 * 사용자의 멤버십 정보를 표시하는 카드 컴포넌트
 * 
 * 현재 회원 등급, 참여한 설문 수, 누적 포인트, 다음 등급까지의 진행률을 표시합니다.
 * 피그마 디자인에 맞춰 구현되었으며, 등급별 색상과 진행률 바를 포함합니다.
 * 
 * @returns {JSX.Element} 멤버십 카드 컴포넌트
 */
export default function MembershipCard() {
  // Mock data - will be replaced with real data later
  const membershipData = {
    currentLevel: 'SILVER',
    nickname: '과제울렁증있음',
    participatedSurveys: 38,
    totalPoints: 52100,
    surveysToNextLevel: 2,
    nextLevel: 'GOLD',
    progressPercentage: 95, // 38/40 * 100 = 95%
  }

  return (
    <div className="bg-white rounded-[32px] p-8 shadow-[0px_0px_8px_0px_rgba(0,0,0,0.12),0px_1px_4px_0px_rgba(0,0,0,0.08),0px_0px_2px_0px_rgba(0,0,0,0.04)]">
      <div className="flex gap-8 items-center">
        {/* Level Icon */}
        <div className="w-[100px] h-[100px] flex-shrink-0">
          <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center">
            <span className="text-white text-2xl font-bold">S</span>
          </div>
        </div>

        {/* Membership Info */}
        <div className="flex-1 space-y-6">
          {/* Level Description */}
          <div className="flex items-center gap-1">
            <span className="text-[#292a2c] text-[18px] font-semibold tracking-[-0.48px]">
              {membershipData.nickname}
            </span>
            <span className="text-[#434447] text-[18px] font-medium">
              님의 이번 달 회원 등급은
            </span>
            <span className="text-[#0db2a4] text-[18px] font-semibold tracking-[-0.48px]">
              {membershipData.currentLevel}
            </span>
            <span className="text-[#434447] text-[18px] font-medium">
              입니다.
            </span>
            <div className="w-[18px] h-[18px] ml-1">
              <div className="w-full h-full bg-gray-300 rounded"></div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-[#434447] text-[18px] font-medium">
                참여 설문
              </span>
              <span className="text-[#434447] text-[18px] font-medium">
                {membershipData.participatedSurveys}건
              </span>
            </div>
            <div className="w-px h-[18px] bg-[#c9cbd1]"></div>
            <div className="flex items-center gap-2">
              <span className="text-[#434447] text-[18px] font-medium">
                누적 포인트
              </span>
              <div className="flex items-center gap-1">
                <StarcandyIcon className="w-6 h-6 text-[#0db2a4]" />
                <span className="text-[#434447] text-[18px] font-medium">
                  {membershipData.totalPoints.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Progress to Next Level */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1">
              <span className="text-[#434447] text-[18px] font-medium">
                설문 조사
              </span>
              <span className="text-[#0db2a4] text-[18px] font-semibold tracking-[-0.48px]">
                {membershipData.surveysToNextLevel}건만 더 참여하면
              </span>
              <span className="text-[#0db2a4] text-[18px] font-semibold tracking-[-0.48px]">
                {membershipData.nextLevel}
              </span>
              <span className="text-[#434447] text-[18px] font-medium">
                등급 달성!
              </span>
            </div>

            {/* Progress Bar */}
            <div className="relative h-3 w-full">
              <div className="absolute bg-[#e8e9eb] h-3 rounded-[16px] w-full"></div>
              <div
                className="bg-[#5ed7c3] h-3 rounded-[16px] transition-all duration-300"
                style={{ width: `${membershipData.progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
