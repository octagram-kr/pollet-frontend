'use client'
import { InfoIcon } from '@/components/icons'

export default function HelpTooltip({ message }: { message: string }) {
  return (
    <div className="relative inline-flex items-center group">
      <InfoIcon className="w-4 fill-fill-deep" />

      {/* hover 시 나타나는 말풍선 */}
      <div className="absolute left-1/2 top-full z-10 hidden w-max -translate-x-1/2 mt-2 rounded-sm px-4 py-3 text-caption-3 font-caption-3 leading-caption-3 tracking-caption-3 bg-bg-mint-faint shadow-lg group-hover:block text-center whitespace-pre-line">
        {message}
        {/* 꼬리 */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rotate-45 h-2 w-2 bg-bg-mint-faint" />
      </div>
    </div>
  )
}
