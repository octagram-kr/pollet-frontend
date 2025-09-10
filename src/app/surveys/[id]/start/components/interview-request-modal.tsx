'use client'

interface InterviewRequestModalProps {
  isOpen: boolean
  onClose: () => void
  onAccept: () => void
  userName?: string
  duration?: string
  reward?: string
}

export default function InterviewRequestModal({ 
  isOpen, 
  onClose, 
  onAccept,
  userName = "과제울렁증극복하기",
  duration = "1시간 30분",
  reward = "배달의 민족 2만원 기프티콘"
}: InterviewRequestModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white box-border content-stretch flex flex-col gap-6 items-center justify-center pb-6 pt-8 px-6 relative rounded-[32px] w-full max-w-md">
        <div className="font-['Pretendard_Variable:Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#292a2c] text-[22px] text-nowrap">
          <p className="leading-[30px] whitespace-pre">인터뷰 요청을 수락하시겠습니까?</p>
        </div>
        
        <div className="content-center flex flex-wrap gap-0 items-center justify-center leading-[0] not-italic relative shrink-0 text-[#434447] text-[16px] text-nowrap tracking-[-0.4px] w-full">
          <div className="font-['Pretendard_Variable:Bold',_sans-serif] relative shrink-0">
            <p className="leading-[28px] text-nowrap whitespace-pre">{userName}</p>
          </div>
          <div className="font-['Pretendard_Variable:Medium',_sans-serif] relative shrink-0">
            <p className="leading-[28px] text-nowrap whitespace-pre">{`님은 인터뷰 대상자입니다. `}</p>
          </div>
          <div className="font-['Pretendard_Variable:Medium',_sans-serif] relative shrink-0">
            <p className="leading-[28px] text-nowrap whitespace-pre">인터뷰 요청 수락 시 추가 리워드를 획득할 수 있습니다.</p>
          </div>
        </div>
        
        <div className="content-stretch flex flex-col gap-1 items-start justify-start relative shrink-0 w-full">
          <div className="content-center flex flex-wrap gap-1.5 items-center justify-center relative shrink-0 w-full">
            <div className="font-['Pretendard_Variable:Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#434447] text-[16px] text-nowrap tracking-[-0.4px]">
              <p className="leading-[28px] whitespace-pre">인터뷰 소요 시간</p>
            </div>
            <div className="content-stretch flex gap-0.5 items-center justify-start relative shrink-0">
              <div className="font-['Pretendard_Variable:Medium',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#0db2a4] text-[16px] text-nowrap tracking-[-0.4px]">
                <p className="leading-[28px] text-nowrap whitespace-pre">약</p>
              </div>
              <div className="content-stretch flex font-['Pretendard_Variable:Medium',_sans-serif] items-center justify-start leading-[0] not-italic relative shrink-0 text-[#0db2a4] text-[16px] text-nowrap tracking-[-0.4px]">
                <div className="relative shrink-0">
                  <p className="leading-[28px] text-nowrap whitespace-pre">{duration}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="content-center flex flex-wrap gap-1.5 items-center justify-center relative shrink-0 w-full">
            <div className="font-['Pretendard_Variable:Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#434447] text-[16px] text-nowrap tracking-[-0.4px]">
              <p className="leading-[28px] whitespace-pre">참여 보상</p>
            </div>
            <div className="content-stretch flex gap-0.5 items-center justify-start relative shrink-0">
              <div className="font-['Pretendard_Variable:Medium',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#0db2a4] text-[16px] text-nowrap tracking-[-0.4px]">
                <p className="leading-[28px] text-nowrap whitespace-pre">{reward}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="content-stretch flex gap-3 items-center justify-start relative shrink-0 w-full">
          <button
            onClick={onClose}
            className="basis-0 bg-[#e8e9eb] box-border content-stretch flex gap-3 grow items-center justify-center min-h-px min-w-px px-4 py-3 relative rounded-[8px] shrink-0"
          >
            <div className="font-['Pretendard_Variable:Medium',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#434447] text-[20px] text-nowrap">
              <p className="leading-[28px] whitespace-pre">설문 종료</p>
            </div>
          </button>
          <button
            onClick={onAccept}
            className="basis-0 bg-[#5ed7c3] box-border content-stretch flex gap-3 grow items-center justify-center min-h-px min-w-px px-4 py-3 relative rounded-[8px] shrink-0"
          >
            <div className="font-['Pretendard_Variable:Medium',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#434447] text-[20px] text-nowrap">
              <p className="leading-[28px] whitespace-pre">인터뷰 수락</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
