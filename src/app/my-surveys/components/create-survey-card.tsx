import { PlusIcon } from '@/components/icons'
import Link from 'next/link'

export default function CreateSurveyCard({
  className = '',
}: {
  className?: string
}) {
  return (
    <Link
      href="/my-surveys/create"
      className={`flex flex-col items-center justify-center ${className}`}
    >
      <div className="w-full h-[120px] rounded-sm border-2 border-dashed border-stroke-subtle bg-fill-white hover:border-gray-400 hover:bg-gray-50 transition px-6 py-5 flex items-center justify-center gap-3">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-fill-default">
          <PlusIcon className="size-8 fill-fill-active" />
        </span>
        <span className="text-body-1 font-body-1 leading-body-1 tracking-body-1 text-text-default">
          새 설문 만들기
        </span>
      </div>
    </Link>
  )
}
