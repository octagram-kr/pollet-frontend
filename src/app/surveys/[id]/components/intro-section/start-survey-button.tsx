'use client'

import { useRouter } from 'next/navigation'

export default function StartSurveyButton({ surveyId }: { surveyId: string }) {
  const router = useRouter()
  return (
    <button
      onClick={() => router.push(`/surveys/${surveyId}/start`)} // TODO: 시작 라우트 정의 시 변경
      className="w-full rounded-sm bg-starcandy-mint px-4 py-5 text-center text-label-3 font-label-3 leading-label-3 hover:opacity-90 hover:cursor-pointer"
    >
      설문조사 시작하기
    </button>
  )
}
