'use client'

import { useState } from 'react'

interface RegisterBoxProps {
  onSubmit?: (data: RegisterData) => void
}

interface RegisterData {
  nickname: string
  gender: 'male' | 'female' | null
  birthYear: string
  job: string | null
  phoneNumber: string
}

export function RegisterBox({ onSubmit }: RegisterBoxProps) {
  const [formData, setFormData] = useState<RegisterData>({
    nickname: '',
    gender: null,
    birthYear: '',
    job: null,
    phoneNumber: '',
  })

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(formData)
    } else {
      console.log('회원가입 데이터:', formData)
    }
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

  return (
    <div className="w-full bg-white rounded-[40px] shadow-[0px_0px_8px_0px_rgba(0,0,0,0.12),0px_1px_4px_0px_rgba(0,0,0,0.08),0px_0px_2px_0px_rgba(0,0,0,0.04)] overflow-hidden">
      <div className="flex flex-col gap-12 items-center justify-start px-24 py-12">
        <div className="flex flex-col gap-12 h-[446px] items-center justify-center w-full">
          {/* 제목 */}
          <h1 className="text-[22px] font-semibold text-[#292a2c] leading-[30px]">
            회원 정보 입력
          </h1>

          {/* 폼 섹션 */}
          <div className="flex flex-col gap-6 items-start justify-start w-full">
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
                  placeholder="닉네임을 입력해주세요. (10자 이하)"
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
  )
}
