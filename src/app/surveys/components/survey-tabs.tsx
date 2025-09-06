'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

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
      className={`text-heading-4 font-heading-4 leading-heading-4 transition ${
        isActive
          ? 'text-text-primary'
          : 'text-text-default hover:text-text-primary'
      }`}
    >
      {label}
    </Link>
  )
}

export default function SurveyTabs() {
  return (
    <nav
      aria-label="설문 탭"
      className="flex justify-center gap-5 border-b-2 border-stroke-subtle p-5"
    >
      <NavLink
        href="/surveys"
        label="전체보기"
      />
      <p className="text-heading-4 font-heading-4 leading-heading-4 text-text-subtler">
        ·
      </p>
      <NavLink
        href="/surveys/urgent"
        label="마감임박설문"
      />
      <p className="text-heading-4 font-heading-4 leading-heading-4 text-text-subtler">
        ·
      </p>
      <NavLink
        href="/surveys/for-you"
        label="맞춤설문"
      />
    </nav>
  )
}
