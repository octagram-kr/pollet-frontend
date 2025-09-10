'use client'

import { useRouter } from 'next/navigation'
import { CheckIcon, StarcandyIcon } from '@/components/icons'

interface PointsCompletionPageProps {
  earnedPoints: number
  surveyTitle: string
}

export default function PointsCompletionPage({ 
  earnedPoints, 
  surveyTitle 
}: PointsCompletionPageProps) {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-[#f9f9f9]">
      {/* Header */}
      <div className="bg-white border-b border-[#c9cbd1]">
        <div className="max-w-7xl mx-auto px-5 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/surveys')}
                className="text-[#434447] hover:text-[#0db2a4] transition-colors"
              >
                ← 설문 목록으로 돌아가기
              </button>
            </div>
            <div className="text-center">
              <h1 className="text-[22px] font-semibold text-[#434447]">설문 완료</h1>
            </div>
            <div className="w-32"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-5 py-12">
        <div className="flex flex-col items-center gap-12">
          {/* Success Icon and Message */}
          <div className="flex flex-col items-center gap-6">
            <div className="bg-[#5ed7c3] rounded-full p-1 w-12 h-12 flex items-center justify-center">
              <CheckIcon className="w-9 h-9 text-white" />
            </div>
            <div className="text-center">
              <h2 className="text-[26px] font-semibold text-[#434447] tracking-[-0.72px] leading-[36px] mb-1.5">
                설문에 참여해주셔서 감사합니다
              </h2>
              <p className="text-[#91959c] text-[16px] leading-[22px]">
                보상은 즉시 적립되며, 자세한 내역은 마이페이지에서 확인하실 수 있습니다
              </p>
            </div>
          </div>

          {/* Points Earned Card */}
          <div className="bg-white border-2 border-[#5ed7c3] rounded-[16px] p-6 w-full max-w-[588px]">
            <div className="flex items-center justify-center">
              <div className="flex flex-col items-center gap-1">
                <p className="text-[#434447] text-[16px] font-medium text-center">
                  획득 포인트
                </p>
                <div className="flex items-center gap-1">
                  <StarcandyIcon className="w-6 h-6 text-[#0db2a4]" />
                  <span className="text-[#0db2a4] text-[24px] font-bold tracking-[-0.72px] leading-[32px]">
                    {earnedPoints.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={() => router.push('/surveys')}
            className="bg-[#5ed7c3] text-[#434447] py-4 px-16 rounded-[8px] font-medium text-[20px] leading-[28px] hover:bg-[#4bc4b0] transition-colors"
          >
            다른 설문 조사 참여하러 가기
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-[#f9f9f9] border-t border-[#e8e9eb] mt-auto">
        <div className="max-w-7xl mx-auto px-5 py-8">
          <div className="flex flex-col items-center gap-4">
            <div className="flex gap-6 items-center">
              <span className="text-[#91959c] text-[16px] font-medium">이용약관</span>
              <div className="w-px h-[22px] bg-[#c9cbd1]"></div>
              <span className="text-[#91959c] text-[16px] font-medium">개인정보보호정책</span>
              <div className="w-px h-[22px] bg-[#c9cbd1]"></div>
              <span className="text-[#91959c] text-[16px] font-medium">고객센터</span>
            </div>
            <div className="text-center text-[#91959c] text-[12px] leading-[16px] tracking-[-0.64px]">
              <p>Copyright© Pollet All right reserved.</p>
              <p className="mt-1">
                상호명 (주)폴렛 | 대표 장우영 | 개인정보보호책임자 이승훈 | 사업자등록번호 025-09-02153<br />
                주소 경기도 성남시 분당구 판교로 242 PDC A동 902호
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
