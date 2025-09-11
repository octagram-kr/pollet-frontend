'use client'

import Image from 'next/image'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

export interface BannerItem {
  id: string
  image: string
  alt: string
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

  const go = useCallback((next: number) => setIdx(next), [])
  const next = useCallback(() => setIdx((v) => v + 1), [])
  const safeIdx = useMemo(
    () => (max > 0 ? ((idx % max) + max) % max : 0),
    [idx, max],
  )
  const prevIdx = useMemo(
    () => (max > 0 ? (safeIdx - 1 + max) % max : 0),
    [safeIdx, max],
  )
  const nextIdx = useMemo(
    () => (max > 0 ? (safeIdx + 1) % max : 0),
    [safeIdx, max],
  )

  // auto-play
  useEffect(() => {
    if (!canAuto) return
    if (timer.current) clearInterval(timer.current)
    timer.current = window.setInterval(next, intervalMs)
    return () => {
      if (timer.current) clearInterval(timer.current)
    }
  }, [canAuto, intervalMs, next])

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
  }, [canAuto, intervalMs, next])
  if (max === 0) return null

  return (
    <section
      className={cn('relative', className)}
      ref={containerRef}
      aria-roledescription="carousel"
    >
      <div className="relative h-110 w-full overflow-visible px-3 rounded-md">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-center gap-4">
          <SlideCard
            item={items[prevIdx]}
            emphasis="preview"
            ariaLabel={`${safeIdx}번째 배너(이전 미리보기)`}
          />
          {/* Current */}
          <SlideCard
            item={items[safeIdx]}
            emphasis="current"
            ariaLabel={`${safeIdx + 1}번째 배너(현재)`}
          />
          {/* Right preview */}
          <SlideCard
            item={items[nextIdx]}
            emphasis="preview"
            ariaLabel={`${safeIdx + 2 > max ? 1 : safeIdx + 2}번째 배너(다음 미리보기)`}
          />
        </div>
      </div>

      {/* 인디케이터 */}
      {max > 1 && (
        <div className="absolute bottom-7 left-1/2 flex -translate-x-1/2 gap-6">
          {items.map((_, i) => (
            <button
              key={items[i]?.id ?? i}
              onClick={() => go(i)}
              className={cn(
                'h-5 w-5 rounded-full bg-gray-600/30',
                i === safeIdx && 'bg-gray-600/70',
              )}
              aria-label={`${i + 1}번째 배너로 이동`}
              aria-current={i === safeIdx ? 'true' : undefined}
            />
          ))}
        </div>
      )}
    </section>
  )
}

function SlideCard({
  item,
  emphasis,
  ariaLabel,
}: {
  item: BannerItem
  emphasis: 'current' | 'preview'
  ariaLabel?: string
}) {
  const isCurrent = emphasis === 'current'
  const base =
    'relative overflow-hidden rounded-md shadow-sm transition-all duration-300 ease-out'
  const size = isCurrent ? 'basis-[70%] h-110' : 'basis-[35%] h-100'
  const fx = isCurrent ? 'opacity-100' : 'opacity-70'
  const ring = isCurrent ? 'ring-0' : 'ring-0'

  const content = (
    <Image
      src={item.image}
      alt={item.alt}
      fill
      className={cn('object-cover', isCurrent ? '' : 'scale-[1.00]')}
      priority={isCurrent}
      sizes={isCurrent ? '(min-width: 768px) 70vw, 80vw' : '20vw'}
    />
  )

  return (
    <div
      className={cn(base, size, fx, ring)}
      aria-label={ariaLabel}
    >
      {content}
    </div>
  )
}
