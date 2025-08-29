'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

export interface BannerItem {
  id: string
  image: string
  alt: string
  href?: string
}

export function AdSection({
  items,
  intervalMs = 5000,
  className,
}: {
  items: BannerItem[]
  intervalMs?: number
  className?: string
}) {
  const [idx, setIdx] = useState(0)
  const max = items.length
  const timer = useRef<number | null>(null)
  const canAuto = max > 1

  const go = useCallback(
    (next: number) => {
      if (max <= 0) return
      const wrapped = ((next % max) + max) % max
      setIdx(wrapped)
    },
    [max],
  )
  const next = useCallback(() => go(idx + 1), [go, idx])
  const prev = useCallback(() => go(idx - 1), [go, idx])

  // auto-play
  useEffect(() => {
    if (!canAuto) return
    if (timer.current) clearInterval(timer.current)
    timer.current = window.setInterval(next, intervalMs)
    return () => {
      if (timer.current) clearInterval(timer.current)
    }
  }, [idx, intervalMs, canAuto, next])

  // pause on hover
  const containerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = containerRef.current
    if (!el || !canAuto) return
    const pause = () => timer.current && clearInterval(timer.current)
    const resume = () => {
      if (timer.current) clearInterval(timer.current)
      timer.current = window.setInterval(next, intervalMs)
    }
    el.addEventListener('mouseenter', pause)
    el.addEventListener('mouseleave', resume)
    return () => {
      el.removeEventListener('mouseenter', pause)
      el.removeEventListener('mouseleave', resume)
    }
  }, [intervalMs, canAuto, next])

  const current = useMemo(() => items[idx], [items, idx])
  if (max === 0) {
    return null
  }
  return (
    <section
      className={cn('relative', className)}
      ref={containerRef}
      aria-roledescription="carousel"
    >
      <div className="relative h-40 w-full overflow-hidden rounded-2xl sm:h-56 md:h-64">
        {current?.href ? (
          <Link
            href={current.href}
            aria-label={current.alt}
          >
            <Image
              src={current.image}
              alt={current.alt}
              fill
              className="object-cover"
              priority
            />
          </Link>
        ) : (
          <Image
            src={current.image}
            alt={current.alt}
            fill
            className="object-cover"
            priority
          />
        )}
      </div>

      {/* Prev / Next */}
      {max > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 px-2 py-2 text-white backdrop-blur hover:bg-black/60"
            aria-label="이전 배너"
          >
            ‹
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 px-2 py-2 text-white backdrop-blur hover:bg-black/60"
            aria-label="다음 배너"
          >
            ›
          </button>
        </>
      )}

      {/* 인디케이터 */}
      {max > 1 && (
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
          {items.map((_, i) => (
            <button
              key={items[i]?.id ?? i}
              onClick={() => go(i)}
              className={cn(
                'h-2 w-2 rounded-full bg-white/60',
                i === idx && 'w-5 bg-white',
              )}
              aria-label={`${i + 1}번째 배너로 이동`}
              aria-current={i === idx ? 'true' : undefined}
            />
          ))}
        </div>
      )}
    </section>
  )
}
