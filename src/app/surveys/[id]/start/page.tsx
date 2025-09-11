'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { fetchSurveyById } from '@/lib/fetch-survey'
import { Survey } from '@/types/survey'
import ProgressBar from './components/progress-bar'
import PrivacyConsentModal from './components/privacy-consent-modal'
import ThirdPartyConsentModal from './components/third-party-consent-modal'
import InterviewRequestModal from './components/interview-request-modal'

type ModalType = 'privacy' | 'thirdParty' | 'interview' | null

export default function SurveyStartPage() {
  const params = useParams()
  const router = useRouter()
  const [survey, setSurvey] = useState<Survey | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentModal, setCurrentModal] = useState<ModalType>('privacy')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})

  // 모달 순서: privacy -> thirdParty -> interview -> survey
  const modalSequence: ModalType[] = [
    'privacy',
    'thirdParty',
    'interview',
    null,
  ]

  useEffect(() => {
    const loadSurvey = async () => {
      try {
        const surveyData = await fetchSurveyById(params.id as string)
        setSurvey(surveyData)
      } catch (error) {
        console.error('Failed to load survey:', error)
        router.push('/surveys')
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      loadSurvey()
    }
  }, [params.id, router])

  const handleModalAction = (action: 'close' | 'agree' | 'accept') => {
    const currentIndex = modalSequence.indexOf(currentModal)

    if (action === 'close') {
      router.push(`/surveys/${params.id}`)
      return
    }

    if (action === 'agree' || action === 'accept') {
      if (currentIndex < modalSequence.length - 1) {
        setCurrentModal(modalSequence[currentIndex + 1])
      } else {
        setCurrentModal(null) // 모든 모달 완료, 설문 시작
      }
    }
  }

  const handleAnswer = (questionIndex: number, answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: answer,
    }))
  }

  const handleNext = () => {
    // TODO: 실제 설문 로직 구현
    if (currentQuestion < 2) {
      // 임시로 3개 질문
      setCurrentQuestion((prev) => prev + 1)
    } else {
      // 설문 완료 - 보상 타입에 따라 다른 완료 페이지로 이동
      const rewardType = survey?.reward.type

      if (rewardType === 'point') {
        // 포인트 보상 완료 페이지
        router.push(
          `/surveys/${params.id}/complete?type=points&points=${survey?.reward.value || 0}`,
        )
      } else {
        // 기프티콘 보상 완료 페이지 (추첨)
        const raffleDate = new Date()
        raffleDate.setDate(raffleDate.getDate() + 7) // 7일 후 추첨

        router.push(
          `/surveys/${params.id}/complete?type=gift&productName=${encodeURIComponent(survey?.title || '')}&raffleYear=${raffleDate.getFullYear()}&raffleMonth=${String(raffleDate.getMonth() + 1).padStart(2, '0')}&raffleDay=${String(raffleDate.getDate()).padStart(2, '0')}&winnerCount=10`,
        )
      }
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f9f9f9] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5ed7c3] mx-auto mb-4"></div>
          <p className="text-[#434447]">설문을 불러오는 중...</p>
        </div>
      </div>
    )
  }

  if (!survey) {
    return (
      <div className="min-h-screen bg-[#f9f9f9] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#434447] text-xl">설문을 찾을 수 없습니다.</p>
          <button
            onClick={() => router.push('/surveys')}
            className="mt-4 px-6 py-2 bg-[#5ed7c3] text-white rounded-lg hover:bg-[#4bc4b0] transition-colors"
          >
            설문 목록으로 돌아가기
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f9f9f9]">
      {/* Header */}
      <div className="bg-white border-b border-[#c9cbd1]">
        <div className="max-w-7xl mx-auto px-5 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push(`/surveys/${params.id}`)}
                className="text-[#434447] hover:text-[#0db2a4] transition-colors"
              >
                ← 설문 상세로 돌아가기
              </button>
            </div>
            <div className="text-center">
              <h1 className="text-[22px] font-semibold text-[#434447]">
                {survey.title}
              </h1>
            </div>
            <div className="w-32"></div> {/* 균형을 위한 빈 공간 */}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="max-w-7xl mx-auto px-5 py-4">
        <ProgressBar
          current={currentQuestion + 1}
          total={3} // 임시로 3개 질문
          className="h-[46px]"
        />
      </div>

      {/* Survey Content */}
      {currentModal === null && (
        <div className="max-w-4xl mx-auto px-5 py-8">
          <div className="space-y-8">
            {/* Question 1 */}
            {currentQuestion === 0 && (
              <div className="bg-white rounded-[16px] border border-[#c9cbd1] p-6">
                <div className="mb-6">
                  <div className="bg-[#b4ede5] rounded-t-[16px] px-6 py-2 -mx-6 -mt-6 mb-4">
                    <h2 className="text-[22px] font-semibold text-[#434447]">
                      섹션 1
                    </h2>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-white border border-[#c9cbd1] rounded-[4px] p-4">
                      <h3 className="text-[22px] font-semibold text-[#434447] mb-2">
                        Q. {survey.title}에 대한 첫 번째 질문입니다.
                      </h3>
                      <p className="text-[#91959c] text-[16px]">
                        질문에 대한 설명을 작성해주세요
                      </p>
                    </div>
                    <div className="space-y-2">
                      {['선택지 1', '선택지 2', '선택지 3', '선택지 4'].map(
                        (option, index) => (
                          <button
                            key={index}
                            onClick={() => handleAnswer(0, option)}
                            className={`w-full p-4 rounded-[4px] text-left transition-colors ${
                              answers[0] === option
                                ? 'bg-[#5ed7c3] text-white'
                                : 'bg-[#f3f4f5] text-[#434447] hover:bg-[#e8e9eb]'
                            }`}
                          >
                            {option}
                          </button>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Question 2 */}
            {currentQuestion === 1 && (
              <div className="bg-white rounded-[16px] border border-[#c9cbd1] p-6">
                <div className="space-y-4">
                  <div className="bg-white border border-[#c9cbd1] rounded-[4px] p-4">
                    <h3 className="text-[22px] font-semibold text-[#434447] mb-2">
                      Q. {survey.title}에 대한 두 번째 질문입니다.
                    </h3>
                    <p className="text-[#91959c] text-[16px]">
                      질문에 대한 설명을 작성해주세요
                    </p>
                  </div>
                  <div className="space-y-2">
                    {['선택지 A', '선택지 B', '선택지 C', '선택지 D'].map(
                      (option, index) => (
                        <button
                          key={index}
                          onClick={() => handleAnswer(1, option)}
                          className={`w-full p-4 rounded-[4px] text-left transition-colors ${
                            answers[1] === option
                              ? 'bg-[#5ed7c3] text-white'
                              : 'bg-[#f3f4f5] text-[#434447] hover:bg-[#e8e9eb]'
                          }`}
                        >
                          {option}
                        </button>
                      ),
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Question 3 */}
            {currentQuestion === 2 && (
              <div className="bg-white rounded-[16px] border border-[#c9cbd1] p-6">
                <div className="space-y-4">
                  <div className="bg-white border border-[#c9cbd1] rounded-[4px] p-4">
                    <h3 className="text-[22px] font-semibold text-[#434447] mb-2">
                      Q. {survey.title}에 대한 세 번째 질문입니다.
                    </h3>
                    <p className="text-[#91959c] text-[16px]">
                      자유롭게 의견을 작성해주세요
                    </p>
                  </div>
                  <textarea
                    value={answers[2] || ''}
                    onChange={(e) => handleAnswer(2, e.target.value)}
                    placeholder="상황에 맞는 설명을 작성해주세요."
                    className="w-full h-[180px] p-4 bg-[#f3f4f5] border border-[#c9cbd1] rounded-[8px] resize-none focus:outline-none focus:ring-2 focus:ring-[#5ed7c3]"
                  />
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="flex-1 bg-[#b4ede5] text-[#434447] py-3 px-4 rounded-[8px] font-medium text-[20px] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#a0e6d8] transition-colors"
              >
                이전
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={
                  currentQuestion < 2
                    ? !answers[currentQuestion]
                    : !(answers[2]?.trim?.() ?? answers[2])
                }
                className="flex-1 bg-[#5ed7c3] text-[#434447] py-3 px-4 rounded-[8px] font-medium text-[20px] hover:bg-[#4bc4b0] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {currentQuestion === 2 ? '완료' : '다음'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <PrivacyConsentModal
        isOpen={currentModal === 'privacy'}
        onClose={() => handleModalAction('close')}
        onAgree={() => handleModalAction('agree')}
      />

      <ThirdPartyConsentModal
        isOpen={currentModal === 'thirdParty'}
        onClose={() => handleModalAction('close')}
        onAgree={() => handleModalAction('agree')}
      />

      <InterviewRequestModal
        isOpen={currentModal === 'interview'}
        onClose={() => handleModalAction('close')}
        onAccept={() => handleModalAction('accept')}
        userName={survey.surveyor.name}
        duration="1시간 30분"
        reward="배달의 민족 2만원 기프티콘"
      />
    </div>
  )
}
