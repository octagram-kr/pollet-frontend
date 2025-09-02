'use client'

import { useMemo, useState } from 'react'
import type { RewardType } from '@/types/survey'
import {
  SurveyToRegister,
  type SurveySummary,
} from './components/survey-to-register'
import { RegistrationPreview } from './components/registration-preview'
import { RewardTypeSelector } from './components/reward-type-selector'
import {
  RewardDetailSection,
  type Gifticon,
} from './components/reward-detail-section'
import { UsedForRewardSection } from './components/used-for-reward-section'
import { PlatformFeeSection } from './components/platform-fee-section'
import { PointPaymentSummary } from './components/point-payment-summary'
import { PaymentButtonSection } from './components/payment-button-section'

export default function SurveyRegisterPage() {
  const [rewardType, setRewardType] = useState<RewardType>('point')

  // ====== 설문/리워드 입력값 ======
  const [targetCount, setTargetCount] = useState<number>(100)
  const [estimatedMinutes, setEstimatedMinutes] = useState<number>(3)
  const [pointPerMinute, setPointPerMinute] = useState<number>(100) // 1분당 포인트

  // 기프티콘(목록 + 선택)
  const gifticons: Gifticon[] = [
    {
      id: 'g1',
      name: '컴포즈커피 아이스 아메리카노',
      price: 1800,
      imageUrl: '/images/gift-1.png',
    },
    {
      id: 'g2',
      name: '스타벅스 아아T',
      price: 4700,
      imageUrl: '/images/gift-2.png',
    },
    {
      id: 'g3',
      name: '맘스터치 싸이버거 세트',
      price: 7300,
      imageUrl: '/images/gift-3.png',
    },
    {
      id: 'g4',
      name: 'BHC 콜라+25L',
      price: 19500,
      imageUrl: '/images/gift-4.png',
    },
  ]
  const [gifticonCount, setGifticonCount] = useState(10)
  const [selectedGifticonId, setSelectedGifticonId] =
    useState<Gifticon['id']>('g2')
  const selectedGifticon = useMemo(
    () => gifticons.find((g) => g.id === selectedGifticonId) ?? gifticons[0],
    [gifticons, selectedGifticonId],
  )

  // 뱃지 연동값
  const pointPerPerson = useMemo(
    () => Math.max(0, estimatedMinutes) * Math.max(0, pointPerMinute),
    [estimatedMinutes, pointPerMinute],
  )

  // ====== 플랫폼 사용료(기간은 편집기에서 전달받는다고 가정: 데모 값) ======
  const [periodStart] = useState('2025-05-01')
  const [periodEnd] = useState('2025-05-14')
  const [platformFeeWon, setPlatformFeeWon] = useState(0)

  // ====== 비용 합계(원) ======
  const usedForRewardWon =
    rewardType === 'point'
      ? Math.max(0, targetCount) *
        Math.max(0, estimatedMinutes) *
        Math.max(0, pointPerMinute)
      : Math.max(0, gifticonCount) * Math.max(0, selectedGifticon.price)

  const [usablePoints, setUsablePoints] = useState(100_000) // ‘원’과 1:1이라고 가정
  const totalPaymentPoints = usedForRewardWon + platformFeeWon
  const remainingPoints = usablePoints - totalPaymentPoints

  // ====== 데모 설문 ======
  const survey: SurveySummary = {
    thumbnailUrl: '/images/sample-thumbnail.jpg',
    title: '설문조사 제목',
    tags: ['20대', '헬스케어', '테크', '최대', '5개까지만'],
    previewQuestions: [
      {
        id: 'q1',
        question: '설문조사를 진행해본 적이 있으신가요?',
        options: ['해본 적이 없다', '1~2번', '3~4번', '5번 이상'],
      },
    ],
  }

  return (
    <main className="mx-auto max-w-5xl p-6">
      <header className="mb-6 border-b pb-4">
        <h1 className="text-xl font-bold">설문 등록하기</h1>
      </header>

      <SurveyToRegister survey={survey} />
      <RegistrationPreview
        survey={survey}
        rewardType={rewardType}
        pointValue={pointPerPerson}
        gifticonName={selectedGifticon.name}
        estimatedMinutes={estimatedMinutes}
      />

      <RewardTypeSelector
        value={rewardType}
        onChange={setRewardType}
      />

      <RewardDetailSection
        rewardType={rewardType}
        targetCount={targetCount}
        onChangeTargetCount={setTargetCount}
        estimatedMinutes={estimatedMinutes}
        onChangeEstimatedMinutes={setEstimatedMinutes}
        // point
        pointPerMinute={pointPerMinute}
        onChangePointPerMinute={setPointPerMinute}
        // gifticon
        gifticonCount={gifticonCount}
        onChangeGifticonCount={setGifticonCount}
        gifticons={gifticons}
        selectedGifticonId={selectedGifticonId}
        onChangeSelectedGifticonId={setSelectedGifticonId}
      />

      <UsedForRewardSection
        rewardType={rewardType}
        // point
        targetCount={targetCount}
        estimatedMinutes={estimatedMinutes}
        pointPerMinute={pointPerMinute}
        // gifticon
        gifticonCount={gifticonCount}
        gifticon={selectedGifticon}
        // 합계
        totalWon={usedForRewardWon}
      />

      <PlatformFeeSection
        startDate={periodStart}
        endDate={periodEnd}
        targetCount={targetCount}
        onComputedChange={setPlatformFeeWon}
      />

      <PointPaymentSummary
        usablePoints={usablePoints}
        onChangeUsablePoints={setUsablePoints}
        usedForRewardPoints={usedForRewardWon} // 원 단위
        platformFeePoints={platformFeeWon} // 원 단위
        totalPaymentPoints={totalPaymentPoints} // 원 단위
        remainingPoints={remainingPoints} // 원 단위
      />

      <PaymentButtonSection
        disabled={remainingPoints < 0}
        totalPaymentPoints={totalPaymentPoints}
        onSubmit={() => alert('결제 요청이 전송되었습니다.')}
      />
    </main>
  )
}
