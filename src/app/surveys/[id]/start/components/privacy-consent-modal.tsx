'use client'

interface PrivacyConsentModalProps {
  isOpen: boolean
  onClose: () => void
  onAgree: () => void
}

export default function PrivacyConsentModal({
  isOpen,
  onClose,
  onAgree,
}: PrivacyConsentModalProps) {
  if (!isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-consent-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <div className="bg-white box-border content-stretch flex flex-col gap-6 items-start justify-start pb-6 pt-8 px-6 relative rounded-[32px] w-full max-w-md">
        <div className="font-['Pretendard_Variable:Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#292a2c] text-[22px] w-full">
          <h2
            id="privacy-consent-title"
            className="leading-[30px]"
          >
            개인정보 동의 수집 및 이용 동의
          </h2>
        </div>

        <div className="content-stretch flex flex-col gap-2 items-start justify-start relative shrink-0 w-full">
          <div className="content-stretch flex gap-3 items-center justify-start leading-[0] not-italic relative shrink-0 text-[16px] text-nowrap tracking-[-0.4px] w-full">
            <div className="font-['Pretendard_Variable:Bold',_sans-serif] relative shrink-0 text-[#434447]">
              <p className="leading-[28px] text-nowrap whitespace-pre">
                개인정보 수집 목적
              </p>
            </div>
            <div className="font-['Pretendard_Variable:Medium',_sans-serif] relative shrink-0 text-[#0db2a4]">
              <p className="leading-[28px] text-nowrap whitespace-pre">
                기프티콘 전달
              </p>
            </div>
          </div>

          <div className="content-stretch flex gap-3 items-start justify-start relative shrink-0 w-full">
            <div className="font-['Pretendard_Variable:Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#434447] text-[16px] text-nowrap tracking-[-0.4px]">
              <p className="leading-[28px] whitespace-pre">
                개인정보 수집 항목
              </p>
            </div>
            <div className="basis-0 content-center flex flex-wrap font-['Pretendard_Variable:Medium',_sans-serif] gap-1 grow items-center justify-start leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#0db2a4] text-[16px] text-nowrap tracking-[-0.4px]">
              <div className="content-stretch flex items-center justify-start relative shrink-0">
                <div className="relative shrink-0">
                  <p className="leading-[28px] text-nowrap whitespace-pre">
                    연락처
                  </p>
                </div>
                <div className="relative shrink-0">
                  <p className="leading-[28px] text-nowrap whitespace-pre">,</p>
                </div>
              </div>
              <div className="content-stretch flex items-center justify-start relative shrink-0">
                <div className="relative shrink-0">
                  <p className="leading-[28px] text-nowrap whitespace-pre">
                    이메일
                  </p>
                </div>
                <div className="relative shrink-0">
                  <p className="leading-[28px] text-nowrap whitespace-pre">,</p>
                </div>
              </div>
              <div className="content-stretch flex items-center justify-start relative shrink-0">
                <div className="relative shrink-0">
                  <p className="leading-[28px] text-nowrap whitespace-pre">
                    이름
                  </p>
                </div>
                <div className="relative shrink-0">
                  <p className="leading-[28px] text-nowrap whitespace-pre">,</p>
                </div>
              </div>
              <div className="relative shrink-0">
                <p className="leading-[28px] text-nowrap whitespace-pre">
                  직접 입력
                </p>
              </div>
            </div>
          </div>

          <div className="content-stretch flex gap-3 items-center justify-start leading-[0] not-italic relative shrink-0 text-[16px] text-nowrap tracking-[-0.4px] w-full">
            <div className="font-['Pretendard_Variable:Bold',_sans-serif] relative shrink-0 text-[#434447]">
              <p className="leading-[28px] text-nowrap whitespace-pre">
                개인정보 보유 및 이용 기간
              </p>
            </div>
            <div className="font-['Pretendard_Variable:Medium',_sans-serif] relative shrink-0 text-[#0db2a4]">
              <p className="leading-[28px] text-nowrap whitespace-pre">3개월</p>
            </div>
          </div>
        </div>

        <div className="content-stretch flex gap-3 items-center justify-start relative shrink-0 w-full">
          <button
            type="button"
            onClick={onClose}
            className="basis-0 bg-[#e8e9eb] box-border content-stretch flex gap-3 grow items-center justify-center min-h-px min-w-px px-4 py-3 relative rounded-[8px] shrink-0"
          >
            <div className="font-['Pretendard_Variable:Medium',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#434447] text-[20px] text-nowrap">
              <p className="leading-[28px] whitespace-pre">취소</p>
            </div>
          </button>
          <button
            type="button"
            onClick={onAgree}
            className="basis-0 bg-[#5ed7c3] box-border content-stretch flex gap-3 grow items-center justify-center min-h-px min-w-px px-4 py-3 relative rounded-[8px] shrink-0"
          >
            <div className="font-['Pretendard_Variable:Medium',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#434447] text-[20px] text-nowrap">
              <p className="leading-[28px] whitespace-pre">동의 후 설문 시작</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
