'use client'
import Image from 'next/image'

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
    <section className="my-12">
      <div className="h-[175px] flex gap-6 rounded-sm border border-stroke-default fill-fill-white px-6 py-5">
        <div className="w-[180px] shrink-0 overflow-hidden bg-gray-100">
          {/* 썸네일 */}
          <Image
            src={survey.thumbnailUrl}
            alt="설문 썸네일"
            width={555}
            height={36.25}
            className="object-cover"
          />
        </div>

        {/* 제목 */}
        <div className="flex min-w-0 items-center">
          <h3 className="line-clamp-2 text-body-2 font-body-2 leading-body-2 tracking-body-2 text-text-default">
            {survey.title}
          </h3>
        </div>
      </div>
    </section>
  )
}
