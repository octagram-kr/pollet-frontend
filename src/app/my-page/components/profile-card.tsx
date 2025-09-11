'use client'

import { useState } from 'react'
import EditProfileModal from './edit-profile-modal'

/**
 * 사용자 프로필을 표시하는 카드 컴포넌트
 *
 * 사용자의 프로필 이미지, 닉네임, 태그 정보를 표시하고
 * 수정하기 버튼을 통해 회원 정보 수정 모달을 열 수 있습니다.
 *
 * @returns {JSX.Element} 프로필 카드 컴포넌트
 */
export default function ProfileCard() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Mock data - will be replaced with real data later
  const userData = {
    nickname: '과제울렁증있음',
    profileImage: '/images/sample-1.png',
    tags: ['여자', '20대', '대학생'],
    frequentTags: [
      { name: 'AI', count: 21 },
      { name: '여행', count: 17 },
      { name: '패션뷰티', count: 15 },
    ],
    // 추가 사용자 정보 (모달에서 사용)
    gender: 'female' as 'male' | 'female' | null,
    birthYear: '2000',
    job: '대학생' as string | null,
    phoneNumber: '01012345678',
  }

  const handleEditClick = () => {
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  const handleProfileUpdate = (updatedData: {
    nickname: string
    gender: 'male' | 'female' | null
    birthYear: string
    job: string | null
    phoneNumber: string
  }) => {
    // 실제로는 API 호출로 사용자 정보를 업데이트
    console.log('프로필 업데이트:', updatedData)
    setIsModalOpen(false)
  }

  return (
    <div className="bg-white rounded-[32px] p-8 shadow-[0px_0px_8px_0px_rgba(0,0,0,0.12),0px_1px_4px_0px_rgba(0,0,0,0.08),0px_0px_2px_0px_rgba(0,0,0,0.04)]">
      {/* Edit Button */}
      <div className="flex justify-end mb-8">
        <button
          onClick={handleEditClick}
          className="text-[#91959c] text-[12px] underline hover:text-[#434447] transition-colors"
        >
          수정하기
        </button>
      </div>

      {/* Profile Image and Name */}
      <div className="flex flex-col items-center mb-8">
        <div
          className="w-[153px] h-[153px] rounded-full bg-cover bg-center bg-no-repeat mb-4"
          style={{ backgroundImage: `url('${userData.profileImage}')` }}
        ></div>
        <h2 className="text-[#434447] text-[20px] font-medium text-center">
          {userData.nickname}
        </h2>
      </div>

      {/* My Tags */}
      <div className="space-y-6">
        <h3 className="text-[#434447] text-[18px] font-medium tracking-[-0.48px]">
          나의 태그
        </h3>

        <div className="flex flex-wrap gap-2">
          {userData.tags.map((tag, index) => (
            <div
              key={index}
              className="bg-white border border-[#c9cbd1] rounded-full px-2 py-0.5"
            >
              <span className="text-[#0db2a4] text-[16px] font-medium">
                #{tag}
              </span>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-[#e8e9eb]"></div>

        {/* Frequent Tags */}
        <div>
          <h4 className="text-[#434447] text-[18px] font-medium tracking-[-0.48px] mb-4">
            자주 참여한 태그
          </h4>

          <div className="space-y-4">
            {userData.frequentTags.map((tag, index) => (
              <div
                key={index}
                className="flex items-center gap-1.5"
              >
                <div className="bg-white border border-[#c9cbd1] rounded-full px-2 py-0.5">
                  <span className="text-[#e200cb] text-[16px] font-medium">
                    #{tag.name}
                  </span>
                </div>
                <span className="text-[#434447] text-[14px] font-normal">
                  {tag.count}번 참여했어요!
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        initialData={{
          nickname: userData.nickname,
          gender: userData.gender,
          birthYear: userData.birthYear,
          job: userData.job,
          phoneNumber: userData.phoneNumber,
        }}
        onSubmit={handleProfileUpdate}
      />
    </div>
  )
}
