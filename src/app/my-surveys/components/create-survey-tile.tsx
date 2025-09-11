import Link from 'next/link'
import { PlusIcon } from '@/components/icons'

export default function CreateSurveyTile() {
  return (
    <Link href="/my-surveys/create">
      <div className="w-[282px] h-[348px] rounded-sm border-2 border-dashed border-stroke-subtle bg-fill-white hover:border-gray-400 transition px-4 py-3 flex flex-col items-center justify-center gap-5">
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-fill-default">
          <PlusIcon className="size-16 fill-fill-active" />
        </span>
        <span className="text-body-1 font-body-1 leading-body-1 tracking-body-1 text-default">
          새 설문 만들기
        </span>
      </div>
    </Link>
  )
}
