'use client'

import { useState } from 'react'

interface EditProfileModalProps {
  /** 모달이 열려있는지 여부 */
  isOpen: boolean
  /** 모달을 닫을 때 호출되는 함수 */
  onClose: () => void
  /** 폼 초기화에 사용할 기존 사용자 데이터 */
  initialData?: {
    nickname: string
    gender: 'male' | 'female' | null
    birthYear: string
    job: string | null
    phoneNumber: string
  }
  /** 폼 제출 시 호출되는 함수 */
  onSubmit?: (data: ProfileData) => void
}

interface ProfileData {
  /** 사용자 닉네임 */
  nickname: string
  /** 사용자 성별 */
  gender: 'male' | 'female' | null
  /** 출생년도 */
  birthYear: string
  /** 직업 */
  job: string | null
  /** 휴대폰 번호 */
  phoneNumber: string
}

/**
 * 회원 정보 수정을 위한 모달 컴포넌트
 * 
 * 사용자의 닉네임, 성별, 나이, 직업, 연락처 정보를 수정할 수 있는 폼을 제공합니다.
 * 기존 회원가입 폼과 동일한 구조로 재사용 가능하도록 설계되었습니다.
 * 
 * @param props - EditProfileModalProps 객체
 * @param props.isOpen - 모달이 열려있는지 여부
 * @param props.onClose - 모달을 닫을 때 호출되는 함수
 * @param props.initialData - 폼 초기화에 사용할 기존 사용자 데이터
 * @param props.onSubmit - 폼 제출 시 호출되는 함수
 * @returns {JSX.Element | null} 회원 정보 수정 모달 컴포넌트 또는 null
 */
export default function EditProfileModal({
  isOpen,
  onClose,
  initialData,
  onSubmit,
}: EditProfileModalProps) {
  const [formData, setFormData] = useState<ProfileData>(
    initialData || {
      nickname: '',
      gender: null,
      birthYear: '',
      job: null,
      phoneNumber: '',
    },
  )

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(formData)
    } else {
      console.log('회원 정보 수정 데이터:', formData)
    }
    onClose()
  }

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, nickname: e.target.value }))
  }

  const handleGenderChange = (gender: 'male' | 'female') => {
    setFormData((prev) => ({ ...prev, gender }))
  }

  const handleBirthYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, birthYear: e.target.value }))
  }

  const handleJobChange = (job: string) => {
    setFormData((prev) => ({ ...prev, job }))
  }

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, phoneNumber: e.target.value }))
  }

  const handleDuplicateCheck = () => {
    console.log('닉네임 중복 확인:', formData.nickname)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-[40px] shadow-[0px_0px_8px_0px_rgba(0,0,0,0.12),0px_1px_4px_0px_rgba(0,0,0,0.08),0px_0px_2px_0px_rgba(0,0,0,0.04)] overflow-hidden max-w-[486px] w-full mx-4">
        <div className="flex flex-col gap-8 items-center justify-start px-12 py-12">
          <div className="flex flex-col gap-5 h-[446px] items-center justify-center w-full">
            {/* 제목 */}
            <h2 className="text-[22px] font-semibold text-[#292a2c] leading-[30px]">
              회원 정보 수정
            </h2>

            {/* 폼 섹션 */}
            <div className="flex flex-col gap-4 items-start justify-start w-full">
              {/* 닉네임 입력 */}
              <div className="flex gap-3 items-center justify-start w-full">
                <div className="flex gap-1 h-7 items-start justify-start">
                  <label className="text-[16px] font-bold text-[#292a2c] leading-[28px] tracking-[-0.4px] w-20">
                    닉네임
                  </label>
                </div>
                <div className="flex gap-5 grow items-center justify-start px-4 py-3 relative rounded-[8px] bg-white border-[1.4px] border-[#e8e9eb]">
                  <input
                    type="text"
                    value={formData.nickname}
                    onChange={handleNicknameChange}
                    placeholder="닉네임을 입력해주세요."
                    className="grow text-[16px] font-medium text-[#91959c] leading-[28px] tracking-[-0.4px] outline-none"
                    maxLength={10}
                  />
                  <button
                    type="button"
                    onClick={handleDuplicateCheck}
                    className="text-[16px] font-bold text-[#0db2a4] leading-[28px] tracking-[-0.4px] whitespace-nowrap"
                  >
                    중복확인
                  </button>
                </div>
              </div>

              {/* 성별 선택 */}
              <div className="flex gap-3 items-center justify-start w-full">
                <div className="flex gap-1 h-7 items-start justify-start">
                  <label className="text-[16px] font-bold text-[#292a2c] leading-[28px] tracking-[-0.4px] w-20">
                    성별
                  </label>
                </div>
                <div className="flex gap-3 items-center justify-start">
                  <button
                    type="button"
                    onClick={() => handleGenderChange('male')}
                    className={`px-2 py-0.5 rounded-[999px] border-[1.4px] transition-colors ${
                      formData.gender === 'male'
                        ? 'bg-[#b4ede5] border-[#5ed7c3]'
                        : 'bg-white border-[#c9cbd1]'
                    }`}
                  >
                    <span className="text-[16px] font-regular text-[#434447] leading-[22px]">
                      남자
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleGenderChange('female')}
                    className={`px-2 py-0.5 rounded-[999px] border-[1.4px] transition-colors ${
                      formData.gender === 'female'
                        ? 'bg-[#b4ede5] border-[#5ed7c3]'
                        : 'bg-white border-[#c9cbd1]'
                    }`}
                  >
                    <span className="text-[16px] font-regular text-[#434447] leading-[22px]">
                      여자
                    </span>
                  </button>
                </div>
              </div>

              {/* 나이 입력 */}
              <div className="flex gap-3 items-center justify-start w-full">
                <div className="flex gap-1 h-7 items-start justify-start">
                  <label className="text-[16px] font-bold text-[#292a2c] leading-[28px] tracking-[-0.4px] w-20">
                    나이
                  </label>
                </div>
                <div className="flex gap-5 grow items-center justify-start px-4 py-3 relative rounded-[8px] bg-white border-[1.4px] border-[#e8e9eb]">
                  <input
                    type="text"
                    value={formData.birthYear}
                    onChange={handleBirthYearChange}
                    placeholder="출생년도를 입력해주세요."
                    className="grow text-[16px] font-medium text-[#91959c] leading-[28px] tracking-[-0.4px] outline-none"
                  />
                </div>
              </div>

              {/* 직업 선택 */}
              <div className="flex gap-3 items-center justify-start w-full">
                <div className="flex gap-1 h-7 items-start justify-start">
                  <label className="text-[16px] font-bold text-[#292a2c] leading-[28px] tracking-[-0.4px] w-20">
                    직업
                  </label>
                </div>
                <div className="flex flex-wrap gap-3 grow items-center justify-start">
                  {[
                    '중학생',
                    '고등학생',
                    '대학생',
                    '취준생',
                    '직장인',
                    '전문직',
                    '프리랜서',
                    '창업자',
                    '자영업자',
                  ].map((job) => (
                    <button
                      key={job}
                      type="button"
                      onClick={() => handleJobChange(job)}
                      className={`px-2 py-0.5 rounded-[999px] border-[1.4px] transition-colors ${
                        formData.job === job
                          ? 'bg-[#b4ede5] border-[#5ed7c3]'
                          : 'bg-white border-[#c9cbd1]'
                      }`}
                    >
                      <span className="text-[16px] font-regular text-[#434447] leading-[22px]">
                        {job}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 연락처 입력 */}
              <div className="flex gap-3 items-center justify-start w-full">
                <div className="flex gap-1 h-7 items-start justify-start">
                  <label className="text-[16px] font-bold text-[#292a2c] leading-[28px] tracking-[-0.4px] w-20">
                    연락처
                  </label>
                </div>
                <div className="flex flex-col gap-2 grow items-start justify-center">
                  <div className="flex gap-5 items-center justify-start px-4 py-3 relative rounded-[8px] bg-white border-[1.4px] border-[#e8e9eb] w-full">
                    <input
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={handlePhoneNumberChange}
                      placeholder="-를 제외한 휴대전화 번호를 입력해주세요"
                      className="grow text-[16px] font-medium text-[#91959c] leading-[28px] tracking-[-0.4px] outline-none"
                    />
                  </div>
                  <p className="text-[12px] font-normal text-[#434447] leading-[16px] tracking-[-0.32px] w-full">
                    잘못된 정보를 기입하면 추후 설문 조사 선별 및 리워드 전달에
                    문제가 발생할 수 있습니다.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 저장하기 버튼 */}
          <div className="flex gap-3 items-center justify-center w-[294px]">
            <button
              type="button"
              onClick={handleSubmit}
              className="flex gap-3 grow items-center justify-center px-4 py-3 relative rounded-[8px] bg-[#5ed7c3] hover:bg-[#0ec4b2] transition-colors"
            >
              <span className="text-[20px] font-medium text-[#434447] leading-[28px] whitespace-nowrap">
                저장하기
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
