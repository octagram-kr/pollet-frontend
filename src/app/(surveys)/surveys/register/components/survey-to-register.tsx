'use client'

export interface PreviewQuestion {
  id: string
  question: string
  options: string[] // 미리보기용 보기(라디오/텍스트 입력 등은 실제 편집기에서 결정)
}

export interface SurveySummary {
  thumbnailUrl: string // 설문 편집자가 등록한 썸네일
  title: string // 설문 제목
  tags: string[] // 설문 편집자가 등록한 태그 리스트
  previewQuestions: PreviewQuestion[] // 등록화면 미리보기에서 보여줄 질문/보기
}

interface Props {
  survey: SurveySummary
}

/** 좌측 큰 카드: 등록할 설문(썸네일 + 우측 제목) */
export function SurveyToRegister({ survey }: Props) {
  return (
    <section className="mb-8">
      <h2 className="mb-3 text-lg font-semibold">등록할 설문</h2>

      <div className="flex gap-4 rounded-xl border border-gray-200 bg-white p-4">
        <div className="aspect-[16/9] w-60 shrink-0 overflow-hidden rounded-lg bg-gray-100">
          {/* 썸네일 */}
          <img
            src={survey.thumbnailUrl}
            alt="설문 썸네일"
            className="h-full w-full object-cover"
          />
        </div>

        {/* 제목 */}
        <div className="flex min-w-0 items-center">
          <h3 className="line-clamp-2 text-base font-semibold leading-6 text-gray-900">
            {survey.title}
          </h3>
        </div>
      </div>
    </section>
  )
}
