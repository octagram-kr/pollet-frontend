'use client'

interface Props {
  disabled?: boolean
  totalPaymentPoints: number
  onSubmit?: () => void
}

export function PaymentButtonSection({ disabled = false, onSubmit }: Props) {
  const canPay = !disabled

  return (
    <section className="mb-20">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-700">
          약관 및 주문 내용을 확인하였으며, 정보 제공 등에 동의합니다.
        </span>

        <div className="">
          <button
            type="button"
            disabled={!canPay}
            onClick={onSubmit}
            className={`w-[282px] rounded-xs px-4 py-3 text-text-default ${
              canPay
                ? 'bg-fill-primary cursor-pointer'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            결제하기
          </button>
        </div>
      </div>
    </section>
  )
}
