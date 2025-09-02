// import { Clock } from 'lucide-react'

export function Duration({ minutes }: { minutes: number }) {
  return (
    <div className="flex items-center gap-1 text-sm text-gray-500">
      {/* <Clock className="h-4 w-4" /> */}
      {minutes}분 소요
    </div>
  )
}
