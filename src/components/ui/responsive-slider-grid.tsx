'use client'

import { ReactNode, Children } from 'react'
import { cn } from '@/lib/utils'

export function ResponsiveSliderGrid({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const items = Children.toArray(children)

  return (
    <div className={cn(className)}>
      {/* 모바일/태블릿: 가로 슬라이드 */}
      <div className="-mx-6 lg:hidden">
        <div
          className="
            flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-1
            [scrollbar-width:none] [-ms-overflow-style:none]
          "
          // 크롬 스크롤바 감추기
          style={{ scrollbarWidth: 'none' }}
        >
          {items.map((child, i) => (
            <div
              key={i}
              className="
                snap-start shrink-0
                w-[82%] sm:w-[60%] md:w-[48%]
              "
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* 데스크톱: 4열 그리드 */}
      <div className="hidden lg:grid lg:grid-cols-4 lg:gap-6">
        {items.map((child, i) => (
          <div key={i}>{child}</div>
        ))}
      </div>
    </div>
  )
}
