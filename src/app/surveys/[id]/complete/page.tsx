'use client'

import { useParams, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { fetchSurveyById } from '@/lib/fetch-survey'
import { Survey } from '@/types/survey'
import PointsCompletionPage from './components/points-completion-page'
import GiftCompletionPage from './components/gift-completion-page'

export default function SurveyCompletePage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const [survey, setSurvey] = useState<Survey | null>(null)
  const [loading, setLoading] = useState(true)

  // URL 파라미터에서 보상 타입과 정보 가져오기
  const rewardType = searchParams.get('type') // 'points' 또는 'gift'
  const earnedPoints = parseInt(searchParams.get('points') || '0')
  const productName = searchParams.get('productName') || ''
  
  // 현재 날짜 기반으로 안전한 기본값 설정
  const now = new Date()
  const raffleYear = searchParams.get('raffleYear') || String(now.getFullYear())
  const raffleMonth = searchParams.get('raffleMonth') || String(now.getMonth() + 1).padStart(2, '0')
  const raffleDay = searchParams.get('raffleDay') || String(now.getDate()).padStart(2, '0')
  const winnerCount = parseInt(searchParams.get('winnerCount') || '1')

  useEffect(() => {
    const loadSurvey = async () => {
      try {
        const surveyData = await fetchSurveyById(params.id as string)
        setSurvey(surveyData)
      } catch (error) {
        console.error('Failed to load survey:', error)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      loadSurvey()
    }
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f9f9f9] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5ed7c3] mx-auto mb-4"></div>
          <p className="text-[#434447]">완료 정보를 불러오는 중...</p>
        </div>
      </div>
    )
  }

  if (!survey) {
    return (
      <div className="min-h-screen bg-[#f9f9f9] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#434447] text-xl">설문 정보를 찾을 수 없습니다.</p>
        </div>
      </div>
    )
  }

  // 보상 타입에 따라 다른 페이지 렌더링
  if (rewardType === 'points') {
    return (
      <PointsCompletionPage
        earnedPoints={earnedPoints}
        surveyTitle={survey.title}
      />
    )
  }

  // 기본값은 기프티콘 보상 페이지
  return (
    <GiftCompletionPage
      productName={productName || survey.title}
      productImage="/images/sample-1.png"
      raffleDate={{
        year: raffleYear,
        month: raffleMonth,
        day: raffleDay
      }}
      winnerCount={winnerCount}
      surveyTitle={survey.title}
    />
  )
}
