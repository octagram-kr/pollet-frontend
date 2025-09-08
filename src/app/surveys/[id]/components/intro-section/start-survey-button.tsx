'use client'

import { useRouter } from 'next/navigation'

export default function StartSurveyButton({ surveyId }: { surveyId: string }) {
  const router = useRouter()
  return (
    <button
      onClick={() => router.push(`/surveys/${surveyId}/start`)} // TODO: 시작 라우트 정의 시 변경
      className="mt-8 w-full rounded-xl bg-[#0DB2A4] px-4 py-4 text-center text-base font-bold text-white shadow hover:opacity-90"
    >
      설문조사 시작하기
    </button>
  )
}
