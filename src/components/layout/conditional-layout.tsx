'use client'

import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import SiteHeader from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

interface ConditionalLayoutProps {
  children: ReactNode
}

export function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname()

  // 로그인 페이지에서는 헤더만 숨기고 푸터는 표시
  const isAuthPage = !!pathname && /^\/auth(\/|$)/.test(pathname)

  if (isAuthPage) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="flex-1 min-w-0">{children}</div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <div className="flex-1 min-w-0">{children}</div>
      <Footer />
    </div>
  )
}
