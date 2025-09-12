'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { useState } from 'react'
import { StarcandyFillIcon, BellIcon, UserIcon } from '../icons'
import ProfilePanel from '@/components/layout/profile-panel'
import NotificationPanel from './notification-panel'

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
      className={`text-heading-3 font-heading-3 leading-heading-3 transition hover:text-text-primary ${
        isActive ? 'text-text-primary' : 'text-text-default'
      }`}
    >
      {label}
    </Link>
  )
}

export default function SiteHeader() {
  const points = 21700
  const [openProfile, setOpenProfile] = useState(false)
  const [openNotice, setOpenNotice] = useState(false)
  const isAuthed = true

  return (
    <header className="sticky top-0 z-40 w-full border-b border-stroke-subtle bg-fill-white px-5 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight"
          >
            <Image
              src={'/icons/logo/logo-all-row-default-icon.svg'}
              alt="logo"
              width={160}
              height={37.33}
            />
          </Link>
        </div>

        <nav className="flex items-center gap-5">
          <NavLink
            href="/surveys"
            label="설문조사"
          />
          <p className="text-heading-2 font-heading-2 leading-heading-2 tracking-heading-2 text-text-subtler">
            ·
          </p>
          <NavLink
            href="/my-surveys"
            label="내 설문"
          />
          <p className="text-heading-2 font-heading-2 leading-heading-2 tracking-heading-2 text-text-subtler">
            ·
          </p>
          <NavLink
            href="/reward-shop"
            label="리워드샵"
          />
        </nav>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <StarcandyFillIcon className="size-8 fill-fill-primary" />
            <span className="text-body-2 font-body-2 leading-body-2 tracking-body-2 text-text-default">
              {points.toLocaleString('ko-KR', { minimumIntegerDigits: 1 })}
            </span>
          </div>

          <button
            type="button"
            aria-haspopup="dialog"
            aria-expanded={openNotice}
            onClick={() => setOpenNotice((v) => !v)}
            className="relative inline-block cursor-pointer"
          >
            <BellIcon className="size-8 fill-fill-deep" />
          </button>

          <button
            aria-label="내 프로필"
            onClick={() => setOpenProfile(true)}
            className="cursor-pointer"
          >
            <UserIcon className="size-8 fill-fill-deep" />
          </button>
        </div>
      </div>

      <ProfilePanel
        open={openProfile}
        onClose={() => setOpenProfile(false)}
        isAuthed={isAuthed}
      />
      <NotificationPanel
        open={openNotice}
        onClose={() => setOpenNotice(false)}
      />
    </header>
  )
}
