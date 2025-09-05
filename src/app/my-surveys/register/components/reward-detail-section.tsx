'use client'

import Image from 'next/image'
import type { RewardType } from '@/types/survey'
import HelpTooltip from './help-tooltip'

export type Gifticon = {
  id: string
  name: string
  price: number // 원
  imageUrl?: string
}

interface Props {
  rewardType: RewardType
  // 공통
  targetCount: number
  onChangeTargetCount: (n: number) => void
  estimatedMinutes: number
  onChangeEstimatedMinutes: (n: number) => void
  // point
  pointPerMinute: number
  onChangePointPerMinute: (n: number) => void
  // gifticon
  gifticonCount: number
  onChangeGifticonCount: (n: number) => void
  gifticons: Gifticon[]
  selectedGifticonId: Gifticon['id']
  onChangeSelectedGifticonId: (id: Gifticon['id']) => void
}

export function RewardDetailSection({
  rewardType,
  targetCount,
  onChangeTargetCount,
  estimatedMinutes,
  onChangeEstimatedMinutes,
  pointPerMinute,
  onChangePointPerMinute,
  gifticonCount,
  onChangeGifticonCount,
  gifticons,
  selectedGifticonId,
  onChangeSelectedGifticonId,
}: Props) {
  const selectedGifticon =
    gifticons.find((g) => g.id === selectedGifticonId) ?? null

  const won = (n: number) => `${n.toLocaleString()}원`
  const pointPerPerson =
    Math.max(0, estimatedMinutes) * Math.max(0, pointPerMinute)

  return (
    <section className="mb-6">
      <h2 className="mb-2 text-lg font-semibold">리워드 지급 상세</h2>

      <div className="rounded-xl border border-gray-200 bg-white p-4">
        {/* ==== 폼 행: 좌 라벨 / 우 입력 ==== */}
        <div className="space-y-3">
          {/* 목표 인원 수 */}
          <Row
            label={
              <span className="flex items-center gap-1">
                목표 인원 수
                <HelpTooltip message="목표 인원 수에 도달하면 설문이 자동 종료됩니다." />
              </span>
            }
          >
            <InputWithSuffix
              value={targetCount}
              onChange={onChangeTargetCount}
              suffix="명"
            />
          </Row>

          {/* 예상 시간 */}
          <Row
            label={
              <span className="flex items-center gap-1">
                예상 시간
                <HelpTooltip
                  message={
                    '응답자의 실제 설문 시간과 평균 2분 이상 차이가\n발생할 경우, 응답자에게 경고창이 노출됩니다.'
                  }
                />
              </span>
            }
          >
            <InputWithSuffix
              value={estimatedMinutes}
              onChange={onChangeEstimatedMinutes}
              suffix="분"
            />
          </Row>

          {/* 포인트 or 기프티콘 인원 */}
          {rewardType === 'point' ? (
            <Row
              label={
                <span className="flex items-center gap-1">
                  1분 당 지급 포인트
                  <HelpTooltip
                    message={
                      '2025년 기준 10분 최저 시급은 1671원이며, 150p 이상 설정 시\n목표 인원 수를 채우지 못할 경우 남은 금액 환불이 가능합니다.'
                    }
                  />
                </span>
              }
            >
              <InputWithSuffix
                value={pointPerMinute}
                onChange={onChangePointPerMinute}
                suffix="P"
              />
            </Row>
          ) : (
            <Row
              label={
                <span className="flex items-center gap-1">
                  기프티콘 지급 인원 수
                  <HelpTooltip
                    message={
                      '목표 인원 수에 도달하지 못할 경우, 비율에 따라 지급되며\n남은 기프티콘 금액 만큼 환불이 가능합니다.'
                    }
                  />
                </span>
              }
            >
              <InputWithSuffix
                value={gifticonCount}
                onChange={onChangeGifticonCount}
                suffix="명"
              />
            </Row>
          )}
        </div>

        {/* ======= 안내 문구 ======= */}
        {rewardType === 'point' ? (
          <p className="mt-4 text-[15px] text-gray-800">
            모든 참여자는 약 <b className="text-gray-900">{estimatedMinutes}</b>
            분 동안 설문 조사에 참여한 후,&nbsp;
            <b className="text-gray-900">{pointPerPerson.toLocaleString()}</b>p
            를 지급받습니다.
          </p>
        ) : (
          <>
            {/* 기프티콘 선택 그리드 */}
            <div className="mt-4">
              <p className="mb-2 text-sm font-medium">기프티콘 선택</p>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {gifticons.map((g) => {
                  const selected = g.id === selectedGifticonId
                  return (
                    <button
                      type="button"
                      key={g.id}
                      onClick={() => onChangeSelectedGifticonId(g.id)}
                      className={`rounded border p-2 text-left transition ${
                        selected
                          ? 'border-gray-900 ring-2 ring-gray-200'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="h-28 w-full overflow-hidden rounded bg-gray-100">
                        {g.imageUrl ? (
                          <Image
                            src={g.imageUrl}
                            alt={g.name}
                            width={300}
                            height={112}
                            className="object-cover"
                          />
                        ) : null}
                      </div>
                      <div className="mt-2">
                        <p className="line-clamp-2 text-sm text-gray-900">
                          {g.name}
                        </p>
                        <p className="text-sm font-semibold text-gray-800">
                          {won(g.price)}
                        </p>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {selectedGifticon && (
              <p className="mt-4 text-[15px] text-gray-800">
                전체 참여자 중{' '}
                <b className="text-gray-900">
                  {gifticonCount.toLocaleString()}
                </b>
                명은 약 <b className="text-gray-900">{estimatedMinutes}</b>분
                동안 설문 조사에 참여한 후,&nbsp;
                <b className="text-gray-900">{selectedGifticon.name}</b>{' '}
                기프티콘을 지급받습니다.
              </p>
            )}
          </>
        )}
      </div>
    </section>
  )
}

function Row({
  label,
  children,
}: {
  label: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="flex items-center border-gray-100 py-2">
      <div className="text-[15px] font-medium text-gray-800">{label}</div>
      <div className="ml-auto flex items-center">{children}</div>
    </div>
  )
}

function InputWithSuffix({
  value,
  onChange,
  suffix,
}: {
  value: number
  onChange: (v: number) => void
  suffix: string
}) {
  return (
    <div className="ml-auto inline-flex shrink-0 overflow-hidden rounded border border-gray-300 bg-white">
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={value}
        onChange={(e) =>
          onChange(Number(e.target.value.replace(/\D/g, '') || 0))
        }
        className="flex-1 border-0 bg-transparent py-2 text-right text-[15px] outline-none"
      />
      <span className="flex w-6 shrink-0 select-none items-center justify-center text-sm text-gray-600">
        {suffix}
      </span>
    </div>
  )
}
