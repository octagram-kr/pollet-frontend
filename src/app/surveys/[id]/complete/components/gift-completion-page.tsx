'use client'

import { useRouter } from 'next/navigation'
import { CheckIcon } from '@/components/icons'
import Image from 'next/image'

interface GiftCompletionPageProps {
  productName: string
  productImage?: string
  raffleDate: {
    year: string
    month: string
    day: string
  }
  winnerCount: number
  surveyTitle: string
}

export default function GiftCompletionPage({ 
  productName,
  productImage = '/images/sample-1.png',
  raffleDate,
  winnerCount,
  surveyTitle
}: GiftCompletionPageProps) {
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
                해당 리워드 추첨은 설문조사 종료 후 제공되며, 추후 알림창을 통해 추첨을 확인하실 수 있습니다
              </p>
            </div>
          </div>

          {/* Gift Info Card */}
          <div className="bg-white border-2 border-[#5ed7c3] rounded-[16px] p-6 w-full">
            <div className="flex gap-2 items-center">
              {/* Product Image */}
              <div className="w-[120px] h-[120px] rounded-[8px] overflow-hidden bg-gray-100 flex-shrink-0">
                <Image
                  src={productImage}
                  alt={productName}
                  width={120}
                  height={120}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Product Info */}
              <div className="flex-1 px-2 py-3">
                <h3 className="text-[#434447] text-[18px] font-medium leading-[26px] tracking-[-0.48px] mb-4 line-clamp-2">
                  {productName}
                </h3>
                
                <div className="space-y-1">
                  {/* Raffle Date */}
                  <div className="flex items-center gap-2">
                    <span className="text-[#434447] text-[16px] font-medium">추첨 예상 날짜</span>
                    <div className="flex items-center gap-1">
                      <span className="text-[#91959c] text-[16px]">{raffleDate.year}년</span>
                      <span className="text-[#91959c] text-[16px]">{raffleDate.month}월</span>
                      <span className="text-[#91959c] text-[16px]">{raffleDate.day}일</span>
                    </div>
                  </div>
                  
                  {/* Winner Count */}
                  <div className="flex items-center gap-2">
                    <span className="text-[#434447] text-[16px] font-medium">당첨자 수</span>
                    <span className="text-[#91959c] text-[16px]">{winnerCount}명</span>
                  </div>
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
              <p>Copyright© Pollet All rights reserved.</p>
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
