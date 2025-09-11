'use client'

import { useState } from 'react'
import ProfileCard from './components/profile-card'
import MembershipCard from './components/membership-card'
import PointHistoryCard from './components/point-history-card'

export default function MyPage() {
  const [activeTab, setActiveTab] = useState<'points' | 'gifts'>('points')

  return (
    <div className="min-h-screen bg-[#f3f4f5]">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-5 py-8">
        <div className="flex gap-8">
          {/* Left Sidebar - Profile Card */}
          <div className="w-[282px] flex-shrink-0">
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
