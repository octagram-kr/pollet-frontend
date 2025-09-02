'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import ProfilePanel from '@/components/layout/profile-panel'

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname()
  const normalize = (s: string) => s.replace(/\/+$/, '') || '/'
  const p = normalize(pathname || '/')
  const h = normalize(href)
  const isActive = p === h || (h !== '/' && p.startsWith(h + '/'))
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

export default function SiteHeader() {
  const points = 0
  const hasNotification = true
  const [openProfile, setOpenProfile] = useState(false)
  const isAuthed = true

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white px-6 py-3">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight"
          >
            Pollet
          </Link>
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          <NavLink
            href="/all-survey"
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

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-sm text-gray-900">
            <span className="tabular-nums">
              {points.toLocaleString('ko-KR', { minimumIntegerDigits: 1 })}
            </span>
            <span className="text-xs text-gray-500">p</span>
          </div>

          <button
            aria-label="내 등급"
            className="rounded p-1 hover:bg-gray-100"
          />
          <Link
            href="/notifications"
            aria-label="알림"
            className="relative rounded p-1 hover:bg-gray-100"
          >
            {hasNotification && (
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
            )}
          </Link>
          <button
            aria-label="내 프로필"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-200"
            onClick={() => setOpenProfile(true)}
          />
        </div>
      </div>

      <ProfilePanel
        open={openProfile}
        onClose={() => setOpenProfile(false)}
        isAuthed={isAuthed}
      />
    </header>
  )
}
