'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export function Header() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white px-6 py-3">
      <nav className="flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold"
        >
          Logo
        </Link>
        <div className="flex gap-4">
          <Link
            href="/survey"
            className={cn(
              'hover:text-blue-600',
              pathname.startsWith('/survey') && 'text-blue-600 font-medium',
            )}
          >
            설문조사
          </Link>
          <Link
            href="/mysurvey"
            className={cn(
              'hover:text-blue-600',
              pathname.startsWith('/my') && 'text-blue-600 font-medium',
            )}
          >
            내 설문
          </Link>
          <Link
            href="/reward"
            className={cn(
              'hover:text-blue-600',
              pathname.startsWith('/reward') && 'text-blue-600 font-medium',
            )}
          >
            리워드샵
          </Link>
        </div>
      </nav>
    </header>
  )
}
