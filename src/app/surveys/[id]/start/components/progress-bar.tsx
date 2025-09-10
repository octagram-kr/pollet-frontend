'use client'

interface ProgressBarProps {
  current: number
  total: number
  className?: string
}

export default function ProgressBar({ 
  current, 
  total, 
  className = "" 
}: ProgressBarProps) {
  const percentage = total > 0 ? (current / total) * 100 : 0

  return (
    <div className={`relative size-full ${className}`}>
      <div className="absolute content-stretch flex flex-col gap-1 h-3 items-start justify-start left-0 top-0 w-full">
        <div className="absolute bg-[#e8e9eb] h-3 left-0 rounded-[16px] top-0 w-full" />
        <div 
          className="bg-[#5ed7c3] h-3 rounded-[16px] shrink-0 transition-all duration-300 ease-in-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="absolute box-border content-stretch flex gap-0.5 items-center justify-start left-1/2 px-4 py-1 rounded-[32px] top-4 -translate-x-1/2">
        <div aria-hidden="true" className="absolute border-[#c9cbd1] border-[1.8px] border-solid inset-0 pointer-events-none rounded-[32px]" />
        <div className="font-['Pretendard_Variable:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#434447] text-[18px] text-nowrap tracking-[-0.48px]">
          <p className="leading-[26px] whitespace-pre">{current}</p>
        </div>
        <div className="font-['Pretendard_Variable:Medium',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#91959c] text-[16px] text-nowrap">
          <p className="leading-[22px] whitespace-pre">/</p>
        </div>
        <div className="font-['Pretendard_Variable:Medium',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#91959c] text-[16px] text-nowrap">
          <p className="leading-[22px] whitespace-pre">{total}</p>
        </div>
      </div>
    </div>
  )
}
