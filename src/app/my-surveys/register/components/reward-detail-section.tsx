'use client'

import Image from 'next/image'
import type { RewardType } from '@/types/survey'
import HelpTooltip from './help-tooltip'
import { StarcandyFillIcon } from '@/components/icons'

export type Gifticon = {
  id: string
  brand: string
  name: string
  price: number
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

  const maxGificonCount = gifticonCount > 0 ? targetCount / gifticonCount : 0

  return (
    <section className="mb-12">
      <h2 className="mb-4 text-heading-2 font-heading-2 leading-heading-2 tracking-heading-2 text-text-strong">
        서베이 리워드 지불 비용
      </h2>

      <div className="rounded-sm border border-stroke-subtle bg-fill-white px-6 py-5">
        {/* ==== 폼 행: 좌 라벨 / 우 입력 ==== */}
        <div className="space-y-3">
          {/* 목표 인원 수 */}
          <Row
            label={
              <span className="flex items-center gap-1">
                <span className="text-body-4 font-body-4 leading-body-4 tracking-body-4 text-text-default">
                  목표 인원 수
                </span>
                <HelpTooltip message="목표 인원 수를 충족하면 해당 설문 조사는 자동으로 종료됩니다" />
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
                <span className="text-body-4 font-body-4 leading-body-4 tracking-body-4 text-text-default">
                  예상 시간
                </span>
                <HelpTooltip
                  message={
                    '참여자의 실제 설문 소요 시간과 예상 소요 시간이\n2분 이상 차이가 날 경우, 참여자에게 안내창이 노출됩니다'
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
                  <span className="text-body-4 font-body-4 leading-body-4 tracking-body-4 text-text-default">
                    분 당 지급할 포인트
                  </span>
                  <HelpTooltip
                    message={
                      '2025년 기준, 10분 당 최저 시급은 약 1,670원입니다.\n1분 당 지급 포인트를 150P 이상 설정 시, 남은 포인트 환불이 가능합니다'
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
                  <span className="text-body-4 font-body-4 leading-body-4 tracking-body-4 text-text-default">
                    기프티콘 증정 단위
                  </span>
                  <HelpTooltip
                    message={
                      '목표 인원과 기프티콘 증정 기준 (n명당 1개)을 설정하면\n필요한 최대 기프티콘 수가  자동 계산됩니다.\n목표 인원을 채우지 못할 시, 참여 인원 비율만큼 지급 후\n잔여 기프티콘의 금액은 환불됩니다.'
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
          <>
            <hr className="my-5 border-stroke-subtle" />
            <p className="text-end mt-5 text-body-5 font-body-5 leading-body-5 tracking-body-5 text-text-default">
              모든 참여자는{' '}
              <span className="text-body-3 font-body-4 leading-body-4 tracking-body-4">
                약 {estimatedMinutes}분
              </span>{' '}
              동안 설문 조사에 참여한 후&nbsp;
              <span className="text-body-3 font-body-4 leading-body-4 tracking-body-4">
                {pointPerPerson.toLocaleString()}P
              </span>
              &nbsp;를 지급 받습니다.
            </p>
          </>
        ) : (
          <>
            {/* 기프티콘 선택 그리드 */}
            <div className="mt-4">
              <p className="mb-2 text-body-4 font-body-4 leading-body-4 tracking-body-4 text-text-default">
                기프티콘 선택
              </p>
              <div className="grid grid-cols-4 gap-3">
                {gifticons.map((g) => {
                  const selected = g.id === selectedGifticonId
                  return (
                    <button
                      type="button"
                      key={g.id}
                      onClick={() => onChangeSelectedGifticonId(g.id)}
                      className={`h-66 rounded-xs border transition ${
                        selected
                          ? 'border-stroke-primary'
                          : 'border-stroke-subtler'
                      }`}
                    >
                      <div className="flex flex-col h-66">
                        <div className="h-[174px] relative w-full overflow-hidden rounded-t-sm">
                          {g.imageUrl ? (
                            <Image
                              src={g.imageUrl}
                              alt={g.name}
                              fill
                              className="h-full w-full object-contain object-top"
                            />
                          ) : null}
                        </div>
                        <div className="mt-2 p-2 text-left">
                          <span className="line-clamp-2 text-label-6 font-label-6 leading-label-6 text-text-strong">
                            <p className="text-label-8 font-label-8 leading-label-8 tracking-label-8 text-text-subtle">
                              {g.brand}
                            </p>
                            {g.name}
                          </span>
                          <p className="flex items-center gap-1 text-label-3 font-label-3 leading-label-3 text-text-strong">
                            <StarcandyFillIcon className="w-5 fill-fill-primary" />
                            {won(g.price)}
                          </p>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {selectedGifticon && (
              <>
                <hr className="my-5 border-stroke-subtle" />
                <p className="text-end mt-5 text-body-5 font-body-5 leading-body-5 tracking-body-5 text-text-default">
                  <span className="text-body-3 font-body-4 leading-body-4 tracking-body-4">
                    최대 {maxGificonCount.toLocaleString()}개
                  </span>
                  의 기프티콘이&nbsp;
                  <span className="text-body-3 font-body-4 leading-body-4 tracking-body-4">
                    {gifticonCount.toLocaleString()}명
                  </span>
                  &nbsp;당 1개씩 전달됩니다.
                </p>
              </>
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
