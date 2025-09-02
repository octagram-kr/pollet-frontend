'use client'

import { useState } from 'react'

interface Props {
  disabled?: boolean
  totalPaymentPoints: number
  onSubmit?: () => void
}

export function PaymentButtonSection({
  disabled = false,
  totalPaymentPoints,
  onSubmit,
}: Props) {
  const [agree, setAgree] = useState(false)
  const canPay = agree && !disabled

  return (
    <section className="mb-10">
      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <label className="flex items-start gap-2">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
          />
          <span className="text-sm text-gray-700">
            [필수] 결제/등록 진행에 동의합니다. (결제 포인트:{' '}
            <b>{totalPaymentPoints.toLocaleString()} P</b>)
          </span>
        </label>

        <div className="mt-4">
          <button
            type="button"
            disabled={!canPay}
            onClick={onSubmit}
            className={`w-full rounded-lg px-4 py-3 text-sm font-semibold text-white ${
              canPay
                ? 'bg-gray-900 hover:bg-black'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            결제하기
          </button>
          {disabled && (
            <p className="mt-2 text-xs text-red-600">
              * 포인트가 부족하여 결제를 진행할 수 없습니다.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
