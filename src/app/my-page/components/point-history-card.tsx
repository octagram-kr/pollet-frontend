'use client'

import { useState } from 'react'
import { StarcandyIcon } from '@/components/icons'

interface PointHistoryCardProps {
  /** 현재 활성화된 탭 ('points' 또는 'gifts') */
  activeTab: 'points' | 'gifts'
  /** 탭 변경 시 호출되는 함수 */
  onTabChange: (tab: 'points' | 'gifts') => void
}

interface PointTransaction {
  /** 거래 고유 ID */
  id: string
  /** 거래 유형 */
  type: 'earned' | 'charged' | 'used'
  /** 포인트 금액 */
  amount: number
  /** 거래 설명 */
  description: string
  /** 거래 카테고리 */
  category: string
  /** 거래 날짜 */
  date: string
  /** 거래 시간 */
  time: string
}

interface GiftTransaction {
  /** 거래 고유 ID */
  id: string
  /** 거래 유형 */
  type: 'earned' | 'used'
  /** 기프티콘 상품명 */
  productName: string
  /** 상품 이미지 URL */
  productImage: string
  /** 거래 카테고리 */
  category: string
  /** 거래 날짜 */
  date: string
  /** 거래 시간 */
  time: string
  /** 기프티콘 상태 */
  status: 'pending' | 'completed' | 'expired'
  /** 발송 알림 제목 */
  title: string
}

/**
 * 포인트 및 기프티콘 내역을 표시하는 카드 컴포넌트
 * 
 * 포인트 내역과 기프티콘 내역 탭을 제공하며, 각각의 거래 내역을 표시합니다.
 * 피그마 디자인에 맞춰 구현되었으며, 스크롤 인디케이터와 함께 제공됩니다.
 * 
 * @param props - PointHistoryCardProps 객체
 * @param props.activeTab - 현재 활성화된 탭
 * @param props.onTabChange - 탭 변경 시 호출되는 함수
 * @returns {JSX.Element} 포인트 내역 카드 컴포넌트
 */
export default function PointHistoryCard({
  activeTab,
  onTabChange,
}: PointHistoryCardProps) {
  const [currentMonth, setCurrentMonth] = useState(9) // September

  // Mock data - will be replaced with real data later
  const currentPoints = 21700
  const pointTransactions: PointTransaction[] = [
    {
      id: '1',
      type: 'earned',
      amount: 300,
      description: 'MZ세대의 AI 의존도 연구를 위한 설문조사',
      category: '설문 리워드',
      date: '25.09.05.',
      time: '17:32',
    },
    {
      id: '2',
      type: 'charged',
      amount: 10000,
      description: '10,000 별바구니',
      category: '포인트 충전',
      date: '25.09.05.',
      time: '15:11',
    },
    {
      id: '3',
      type: 'used',
      amount: 4700,
      description: '스타벅스 아이스 아메리카노T',
      category: '포인트 사용',
      date: '25.09.05.',
      time: '13:55',
    },
    {
      id: '4',
      type: 'earned',
      amount: 300,
      description:
        '대학생의 사회적 고립감이 자살사고에 미치는 영향: 스마트폰 과의존과 우울의 이중매개효과',
      category: '설문 리워드',
      date: '25.09.04.',
      time: '21:48',
    },
  ]

  const giftTransactions: GiftTransaction[] = [
    {
      id: 'g1',
      type: 'earned',
      productName: '스타벅스 아이스 아메리카노T',
      productImage: '',
      category: '구매',
      date: '25.09.05.',
      time: '13:58',
      status: 'completed',
      title: '구매하신 기프티콘이 발송되었습니다.',
    },
    {
      id: 'g2',
      type: 'earned',
      productName:
        '대학생의 사회적 고립감이 자살사고에 미치는 영향: 스마트폰 과의존과 우울의 이중매개효과',
      productImage: '',
      category: '인터뷰 리워드',
      date: '25.09.05.',
      time: '11:32',
      status: 'completed',
      title: '인터뷰 리워드 기프티콘이 발송되었습니다.',
    },
  ]

  const getAmountColor = (type: string) => {
    switch (type) {
      case 'earned':
      case 'charged':
        return 'text-[#0db2a4]'
      case 'used':
        return 'text-[#e200cb]'
      default:
        return 'text-[#434447]'
    }
  }

  const getAmountText = (type: string, amount: number) => {
    switch (type) {
      case 'earned':
        return `${amount.toLocaleString()}을 획득했습니다.`
      case 'charged':
        return `${amount.toLocaleString()}을 충전했습니다.`
      case 'used':
        return `${amount.toLocaleString()}을 사용했습니다.`
      default:
        return `${amount.toLocaleString()}`
    }
  }

  const handlePreviousMonth = () => {
    if (currentMonth > 1) {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const handleNextMonth = () => {
    if (currentMonth < 12) {
      setCurrentMonth(currentMonth + 1)
    }
  }

  return (
    <div className="bg-white rounded-[32px] p-12 shadow-[0px_0px_8px_0px_rgba(0,0,0,0.12),0px_1px_4px_0px_rgba(0,0,0,0.08),0px_0px_2px_0px_rgba(0,0,0,0.04)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        {/* Filter Tabs */}
        <div className="flex gap-3">
          <button
            onClick={() => onTabChange('points')}
            className={`px-3 py-0.5 rounded-full border transition-colors ${
              activeTab === 'points'
                ? 'bg-[#b4ede5] border-[#5ed7c3]'
                : 'bg-white border-[#c9cbd1]'
            }`}
          >
            <span className="text-[#434447] text-[18px] font-medium">
              포인트 내역
            </span>
          </button>
          <button
            onClick={() => onTabChange('gifts')}
            className={`px-3 py-0.5 rounded-full border transition-colors ${
              activeTab === 'gifts'
                ? 'bg-[#b4ede5] border-[#5ed7c3]'
                : 'bg-white border-[#c9cbd1]'
            }`}
          >
            <span className="text-[#434447] text-[18px] font-medium">
              기프티콘 내역
            </span>
          </button>
        </div>

        {/* Current Points */}
        <div className="flex items-center gap-1">
          <StarcandyIcon className="w-8 h-8 text-[#0db2a4]" />
          <span className="text-[#434447] text-[20px] font-bold">
            {currentPoints.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1.5">
          <button
            onClick={handlePreviousMonth}
            className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded"
          >
            <div className="w-4 h-4 bg-gray-400 rounded"></div>
          </button>
          <span className="text-[#292a2c] text-[16px] font-medium">
            {currentMonth}월
          </span>
          <button
            onClick={handleNextMonth}
            className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded"
          >
            <div className="w-4 h-4 bg-gray-400 rounded"></div>
          </button>
        </div>
        <span className="text-[#91959c] text-[12px] font-normal">
          25.09.01. ~ 09.30.
        </span>
      </div>

      {/* Transaction List with Scroll Indicator */}
      <div className="flex items-start gap-2">
        {/* Transaction List */}
        <div className="flex-1 space-y-0">
          {activeTab === 'points'
            ? // Point Transactions
              pointTransactions.map((transaction, index) => (
                <div
                  key={transaction.id}
                  className={`py-3 px-2 ${
                    index === 0
                      ? 'border-t border-b border-[#e8e9eb]'
                      : 'border-b border-[#e8e9eb]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-0.5">
                      <StarcandyIcon className="w-4 h-4 text-[#0db2a4]" />
                      <span
                        className={`text-[16px] font-medium ${getAmountColor(transaction.type)}`}
                      >
                        {transaction.amount.toLocaleString()}
                      </span>
                      <span className="text-[#292a2c] text-[16px] font-medium">
                        {getAmountText(
                          transaction.type,
                          transaction.amount,
                        ).replace(transaction.amount.toLocaleString(), '')}
                      </span>
                    </div>
                    <div className="flex items-center gap-0.5 text-[#434447] text-[12px] font-normal">
                      <span>{transaction.date}</span>
                      <span>{transaction.time}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[#292a2c] text-[12px] font-normal">
                      [{transaction.category}]
                    </span>
                    <span className="text-[#91959c] text-[12px] font-normal truncate">
                      {transaction.description}
                    </span>
                  </div>
                </div>
              ))
            : // Gift Transactions
              giftTransactions.map((transaction, index) => (
                <div
                  key={transaction.id}
                  className={`py-3 px-2 ${
                    index === 0
                      ? 'border-t border-b border-[#e8e9eb]'
                      : 'border-b border-[#e8e9eb]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex gap-0.5 items-center justify-start">
                      <span className="text-[#292a2c] text-[16px] font-medium tracking-[-0.4px]">
                        {transaction.title}
                      </span>
                    </div>
                    <div className="flex gap-0.5 items-start justify-start text-[#434447] text-[12px] font-normal tracking-[-0.32px]">
                      <span className="text-nowrap whitespace-pre">
                        {transaction.date}
                      </span>
                      <span className="text-nowrap whitespace-pre">
                        {transaction.time}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[#292a2c] text-[12px] font-normal tracking-[-0.32px]">
                      [{transaction.category}]
                    </span>
                    <span className="text-[#91959c] text-[12px] font-normal tracking-[-0.32px] overflow-hidden text-ellipsis whitespace-nowrap flex-1">
                      {transaction.productName}
                    </span>
                  </div>
                </div>
              ))}
        </div>

        {/* Scroll Indicator */}
        <div className="w-2 h-[270px] bg-[#e8e9eb] rounded-[24px] relative">
          <div className="absolute top-0 left-0 w-2 h-[30px] bg-[#5ed7c3] rounded-[24px]"></div>
        </div>
      </div>
    </div>
  )
}
