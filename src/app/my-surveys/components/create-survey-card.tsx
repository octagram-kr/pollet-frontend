import Link from 'next/link'
// import { Plus } from 'lucide-react'

export default function CreateSurveyCard() {
  return (
    <Link
      href="/surveys/create"
      className="flex flex-col items-center justify-center"
    >
      <div className="w-full h-full rounded-md border-2 border-gray-300 bg-white hover:border-gray-400 hover:bg-gray-50 transition px-6 py-5 flex items-center justify-center gap-3">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
          {/* <Plus className="size-5 text-gray-700" /> */}
        </span>
        <span className="text-gray-700">새 설문 만들기</span>
      </div>
    </Link>
  )
}
