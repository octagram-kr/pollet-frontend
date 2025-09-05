'use client'

export default function HelpTooltip({ message }: { message: string }) {
  return (
    <div className="relative inline-flex items-center group">
      {/* ❓ 버튼 */}
      <span className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-gray-200 text-[11px] font-bold text-gray-700"></span>

      {/* hover 시 나타나는 말풍선 */}
      <div className="absolute left-1/2 top-full z-10 hidden w-max -translate-x-1/2 mt-2 rounded-lg bg-gray-700 px-3 py-2 text-sm text-white shadow-lg group-hover:block text-center whitespace-pre-line">
        {message}
        {/* 꼬리 */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rotate-45 h-2 w-2 bg-gray-700" />
      </div>
    </div>
  )
}
