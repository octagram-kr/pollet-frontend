import type { Survey } from '@/types/survey'

export async function fetchSurveyById(id: string): Promise<Survey | null> {
  // TODO: 실제 API 연동
  // 데모 데이터 반환
  if (!id) return null
  return {
    id,
    title: 'MZ세대의 AI 의존도 연구를 위한 설문조사',
    description:
      '안녕하세요, 팀 Octagram입니다.\n본 설문은 20대 여성의 여행 계획 방식과 필요한 서비스를 파악하기 위해 진행합니다.',
    tags: ['여자', '20대', '여행'],
    reward: { type: 'point', value: 300, unit: 'P' },
    expectedMinutes: 5,
    closingAt: new Date(Date.now() + 1000 * 60 * 90).toISOString(),
    participants: { current: 60, max: 100 },
    surveyor: { name: '설문자' },
    purpose: '연구 과제',
    period: { from: '2025.09.01', to: '2025.12.31' },
    retentionMonths: 3,
    personalInfo: {
      items: ['연락처'],
      purpose: '추후 인터뷰 모집, 기프티콘 전달',
      retention: '3개월',
    },
  }
}
