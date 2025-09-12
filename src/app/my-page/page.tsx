'use client'

import { useState } from 'react'
import ProfileCard from './components/profile-card'
import MembershipCard from './components/membership-card'
import PointHistoryCard from './components/point-history-card'

/**
 * 사용자 마이페이지 메인 컴포넌트
 *
 * 사용자의 프로필 정보, 멤버십 정보, 포인트/기프티콘 내역을 종합적으로 표시하는 페이지입니다.
 * 피그마 디자인에 맞춰 구현되었으며, 반응형 레이아웃을 지원합니다.
 *
 * @returns {JSX.Element} 마이페이지 컴포넌트
 */
export default function MyPage() {
  const [activeTab, setActiveTab] = useState<'points' | 'gifts'>('points')

  return (
    <div className="min-h-screen bg-[#f3f4f5]">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-5 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Profile Card */}
          <div className="w-full lg:w-[282px] flex-shrink-0">
            <ProfileCard />
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-8">
            {/* Membership Card */}
            <MembershipCard />

            {/* Point History Card */}
            <PointHistoryCard
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
