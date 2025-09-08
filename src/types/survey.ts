// ====== Core domain types ======
export type RewardType = 'point' | 'gifticon'
export type SurveyStatus = 'ongoing' | 'closed'
export type ISODateString = string

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

// ====== (목록 카드용 선택 정보) ======
export interface Period {
  startAt: ISODateString
  endAt: ISODateString | null
}
export interface ParticipantStats {
  current: number
  target: number | null
}

export interface SurveyCardExtras {
  /** 설문 상태가 있을 때 뱃지로 노출 */
  status?: SurveyStatus
  /** 기간 정보가 있을 때 카드의 보조 텍스트로 노출 */
  period?: Period
  /** 참여자 정보가 있을 때 우측 카운터로 노출 */
  participants?: ParticipantStats
}

// ====== 조회/페이지네이션/헤더 요약 ======
export interface SurveyQuery {
  q?: string
  status?: SurveyStatus | 'all'
  rewardType?: RewardType | 'all'
  tag?: string
  page?: number
  pageSize?: number
  sort?: 'createdAt' | 'duration' | 'title'
}

export interface PageMeta {
  total: number
  page: number
  pageSize: number
  hasNext: boolean
}
export interface Paged<T> {
  items: T[]
  meta: PageMeta
}

export interface UserSummary {
  isAuthed: boolean
  displayName?: string
  avatarUrl?: string
  points: number
  unreadNotifications: number
}

export type Survey = {
  id: string
  title: string
  description: string
  tags: string[]
  reward: { type: RewardType; value: number; unit?: string } // ex) {type:'point', value:300, unit:'P'}
  expectedMinutes: number
  closingAt?: string | null // 마감임박일 때 사용
  participants: { current: number; max: number }
  surveyor: { name: string }
  purpose: string
  period: { from: string; to: string }
  retentionMonths: number
  personalInfo?: {
    // 설문 생성 시 개인정보를 수집하지 않음을 선택할 수 있음
    items: string[] // 개인정보 수집 항목
    purpose: string // 개인정보 수집 목적
    retention: string // 보유 및 이용 기간
  }
}
