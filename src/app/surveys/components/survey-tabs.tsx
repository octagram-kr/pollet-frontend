'use client'

import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'
import { cn } from '@/lib/utils'

// function NavLink({ href, label }: { href: string; label: string }) {
//   const pathname = usePathname()
//   const normalize = (s: string) => s.replace(/\/+$/, '') || '/'
//   const p = normalize(pathname || '/')
//   const h = normalize(href)
//   const isActive = p === h || (h !== '/' && p.startsWith(h + '/'))
//   return (
//     <Link
//       href={href}
//       aria-current={isActive ? 'page' : undefined}
//       className={`text-heading-4 font-heading-4 leading-heading-4 transition ${
//         isActive
//           ? 'text-text-primary'
//           : 'text-text-default hover:text-text-primary'
//       }`}
//     >
//       {label}
//     </Link>
//   )
// }

export default function SurveyTabs({ className }: { className?: string }) {
  const segment = useSelectedLayoutSegment()
  const tabs = [
    { name: '전체보기', href: '/surveys', seg: null },
    { name: '마감임박설문', href: '/surveys/urgent', seg: 'urgent' },
    { name: '맞춤설문', href: '/surveys/for-you', seg: 'for-you' },
  ] as const
  return (
    <nav
      aria-label="설문 탭"
      className={cn(
        'flex justify-center gap-5 border-b-2 border-stroke-subtle p-5 text-heading-4 font-heading-4 leading-heading-4',
        className,
      )}
    >
      {tabs.map(({ name, href, seg }, idx) => {
        const isActive = segment === seg
        const isLast = idx === tabs.length - 1
        return (
          <div
            key={href}
            className="flex items-center gap-5"
          >
            <Link
              key={href}
              href={href}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'text-text-subtler transition',
                isActive
                  ? 'text-text-primary'
                  : 'text-text-default hover:text-text-primary',
              )}
            >
              {name}
            </Link>
            {!isLast && <p className="text-text-subtler">·</p>}
          </div>
        )
      })}
    </nav>
  )
}
