export type QuestionType = 'single' | 'multiple' | 'short' | 'long'

export type ChoiceOption = {
  id: string
  label: string
  isOther?: boolean
}

export type QuestionForm = {
  id: string
  type: QuestionType
  title: string
  description?: string
  helper?: string // 단답/서술: “상황에 맞는 설명”
  options?: ChoiceOption[] // 객관식만
  required: boolean
  multiAnswer?: boolean // 객관식에서만 사용
  sectionNo?: number // 섹션 칩 표시용 (있으면 “섹션 n”)
  interviewRequest?: boolean // 미리보기 배지 on/off
  interviewTargetOptionId?: string | null // 인터뷰 요청 대상 선택지
  inattentiveCheck?: boolean // 미리보기 배지 on/off(단일형)
  correctOptionId?: string | null // 정답 선택지(단일형)
}
