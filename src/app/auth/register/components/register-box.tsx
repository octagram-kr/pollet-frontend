'use client'

import { useState } from 'react'

export function RegisterBox() {
  const [nickname, setNickname] = useState('')
  const [gender, setGender] = useState<'male' | 'female' | null>(null)
  const [birthYear, setBirthYear] = useState('')
  const [occupation, setOccupation] = useState<string | null>(null)
  const [phoneNumber, setPhoneNumber] = useState('')

  const handleSave = () => {
    // 회원 정보 저장 로직
    console.log('회원 정보 저장:', {
      nickname,
      gender,
      birthYear,
      occupation,
      phoneNumber,
    })
  }

  const handleDuplicateCheck = () => {
    // 닉네임 중복 확인 로직
    console.log('닉네임 중복 확인:', nickname)
  }

  return (
    <div
      className="w-full bg-white rounded-[40px] shadow-lg px-6 py-8 sm:px-12 sm:py-12 lg:px-24 lg:py-12"
      style={{
        gap: '48px',
        boxShadow:
          '0 0 8px 0 rgba(0, 0, 0, 0.12), 0 1px 4px 0 rgba(0, 0, 0, 0.08), 0 0 2px 0 rgba(0, 0, 0, 0.04)',
      }}
    >
      <div className="flex flex-col items-center gap-12">
        {/* 제목 */}
        <h1 className="text-2xl font-semibold text-gray-800 text-center">
          회원 정보 입력
        </h1>

        {/* 폼 영역 */}
        <div className="w-full space-y-8">
          {/* 닉네임 */}
          <div className="flex items-center gap-4">
            <label className="w-20 text-sm font-medium text-gray-700">
              닉네임
            </label>
            <div className="flex-1 flex gap-2">
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="닉네임을 입력해주세요. (10자 이하)"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                maxLength={10}
              />
              <button
                onClick={handleDuplicateCheck}
                className="px-4 py-3 text-sm font-medium text-teal-600 border border-teal-600 rounded-lg hover:bg-teal-50 transition-colors"
              >
                중복확인
              </button>
            </div>
          </div>

          {/* 성별 */}
          <div className="flex items-center gap-4">
            <label className="w-20 text-sm font-medium text-gray-700">
              성별
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setGender('male')}
                className={`px-4 py-2 text-sm font-medium rounded-full border transition-colors ${
                  gender === 'male'
                    ? 'bg-teal-500 text-white border-teal-500'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                남자
              </button>
              <button
                onClick={() => setGender('female')}
                className={`px-4 py-2 text-sm font-medium rounded-full border transition-colors ${
                  gender === 'female'
                    ? 'bg-teal-500 text-white border-teal-500'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                여자
              </button>
            </div>
          </div>

          {/* 나이 */}
          <div className="flex items-center gap-4">
            <label className="w-20 text-sm font-medium text-gray-700">
              나이
            </label>
            <input
              type="text"
              value={birthYear}
              onChange={(e) => setBirthYear(e.target.value)}
              placeholder="출생년도를 입력해주세요."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          {/* 직업 */}
          <div className="flex items-start gap-4">
            <label className="w-20 text-sm font-medium text-gray-700 pt-3">
              직업
            </label>
            <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
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
                  onClick={() => setOccupation(job)}
                  className={`px-3 py-2 text-sm font-medium rounded-full border transition-colors ${
                    occupation === job
                      ? 'bg-teal-500 text-white border-teal-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {job}
                </button>
              ))}
            </div>
          </div>

          {/* 연락처 */}
          <div className="flex items-center gap-4">
            <label className="w-20 text-sm font-medium text-gray-700">
              연락처
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="-를 제외한 휴대전화 번호를 입력해주세요"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* 경고 메시지 */}
        <div className="w-full p-4 bg-pink-50 rounded-lg">
          <p className="text-sm text-gray-600 text-center">
            잘못된 정보를 기입하면 추후 설문 조사 선별 및 리워드 전달에 문제가
            발생할 수 있습니다.
          </p>
        </div>

        {/* 저장 버튼 */}
        <button
          onClick={handleSave}
          className="w-full py-4 bg-teal-500 text-white font-medium rounded-lg hover:bg-teal-600 transition-colors"
        >
          저장하기
        </button>
      </div>
    </div>
  )
}
