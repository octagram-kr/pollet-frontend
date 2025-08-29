// import { Plus } from 'lucide-react'

export default function CreateSurveyTile() {
  return (
    <button className="rounded-md border bg-gray-100 overflow-hidden">
      <span className="inline-flex h-25 w-25 items-center justify-center rounded-full bg-gray-200">
        {/* <Plus className="size-6 text-gray-700" /> */}
      </span>
      <div className="px-3 py-2 text-sm text-gray-700">새 설문 만들기</div>
    </button>
  )
}
