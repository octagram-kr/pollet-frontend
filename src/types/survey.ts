export type RewardType = 'point' | 'gifticon'

export interface SurveyItem {
  id: string
  title: string
  thumbnail: string
  reward: {
    type: RewardType
    value: number // 포인트값 또는 기프티콘 수량
    giftName?: string // 기프티콘일 때 배지에 표기할 이름(예: '커피')
  }
  duration: number // 분 단위
  tags?: string[]
}
