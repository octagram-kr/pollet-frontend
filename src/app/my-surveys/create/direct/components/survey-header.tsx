'use client'

type Props = {
  onRegister?: () => void
  disabled?: boolean
  registering?: boolean
  className?: string
}

export default function SurveyHeader({
  onRegister,
  disabled = false,
  registering = false,
  className = '',
}: Props) {
  return (
    <div className="flex items-center justify-between pb-4">
      {/* 제목/설명 */}
      <div>
        <h1 className="text-heading-2 font-heading-2 leading-heading-2 tracking-heading-2 text-text-default">
          설문조사 만들기
        </h1>
        <p className="mt-2 text-caption-3 font-caption-3 leading-caption-3 tracking-caption-3 text-text-subtle">
          원하는 방식을 선택하여 설문조사 제작을 시작해보세요
        </p>
      </div>

      {/* 버튼 그룹 */}
      <div className="mt-4 flex justify-end gap-6">
        <button
          disabled={disabled}
          className="w-[88px] rounded-xs px-1 py-3 bg-fill-default text-label-7 font-label-7 leading-label-7 text-text-default hover:bg-gray-100"
        >
          미리보기
        </button>
        <button
          disabled={disabled}
          className="w-[88px] rounded-xs px-1 py-3 bg-fill-default text-label-7 font-label-7 leading-label-7 text-text-default hover:bg-gray-100"
        >
          임시저장
        </button>
        <button
          onClick={onRegister}
          disabled={disabled || registering}
          className="w-[88px] rounded-xs px-1 py-3 bg-fill-primary text-label-7 font-label-7 leading-label-7 text-text-default hover:bg-starcandy-mint/90"
        >
          등록
        </button>
      </div>
    </div>
  )
}
