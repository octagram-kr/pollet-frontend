'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import ProfilePanel from '@/components/layout/profile-panel'

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname()
  const isActive = pathname.startsWith(href)
  return (
    <Link
      href={href}
      aria-current={isActive ? 'page' : undefined}
      className={`text-sm transition hover:text-gray-900 ${
        isActive ? 'text-gray-900 font-medium' : 'text-gray-600'
      }`}
    >
      {label}
    </Link>
  )
}

export function Header() {
  const points = 0
  const hasNotification = true
  const [openProfile, setOpenProfile] = useState(false)
  const isAuthed = true // 실제 인증 상태로 교체

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white px-6 py-3">
      <div className="mx-auto max-w-6xl h-16 px-6 flex items-center justify-between gap-6">
        {/* 좌: 로고 + 서비스명 */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight"
          >
            Pollet
          </Link>
        </div>

        {/* 중간: 1차 내비게이션 */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLink
            href="/survey"
            label="설문조사"
          />
          <NavLink
            href="/my-surveys"
            label="내 설문"
          />
          <NavLink
            href="/reward-shop"
            label="리워드샵"
          />
        </nav>

        {/* 우: 포인트 / 등급 / 알림 / 프로필 */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-sm text-gray-900">
            {/* <PiggyBank className="size-5" /> */}
            <span className="tabular-nums">
              {points.toLocaleString('ko-KR', { minimumIntegerDigits: 1 })}
            </span>
            <span className="text-xs text-gray-500">p</span>
          </div>

          <button
            aria-label="내 등급"
            className="p-1 rounded hover:bg-gray-100"
          >
            {/* <Shield className="size-5 text-gray-700" /> */}
          </button>

          <Link
            href="/notifications"
            aria-label="알림"
            className="relative p-1 rounded hover:bg-gray-100"
          >
            {/* <Bell className="size-5 text-gray-700" /> */}
            {hasNotification && (
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
            )}
          </Link>

          <button
            aria-label="내 프로필"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-200"
            onClick={() => setOpenProfile(true)}
          >
            {/* <User className="size-4 text-gray-700" /> */}
          </button>
        </div>
      </div>
      {/* 프로필 패널 */}
      <ProfilePanel
        open={openProfile}
        onClose={() => setOpenProfile(false)}
        isAuthed={isAuthed}
      />
    </header>
  )
}
