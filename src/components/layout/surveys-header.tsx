'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function SurveysHeader() {
  const pathname = usePathname()
  const title = pathname?.startsWith('/surveys/register')
    ? '설문 등록하기'
    : '설문'

  return (
    <div className="border-b bg-white px-6 py-3">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 relative">
        {/* 좌측 로고 */}
        <Link
          href="/"
          className="text-lg font-semibold"
        >
          Pollet
        </Link>

        {/* 중앙 타이틀 */}
        <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-semibold">
          {title}
        </h1>
      </div>
    </div>
  )
}
