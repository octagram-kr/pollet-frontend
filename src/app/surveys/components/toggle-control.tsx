'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { ToggleLgOnIcon, ToggleLgOffIcon } from '@/components/icons'

export default function ToggleControl({
  value,
  onChange,
  className,
}: {
  value: 'on' | 'off'
  onChange: (v: 'on' | 'off') => void
  className?: string
}) {
  const isOn = value === 'on'

  return (
    <div className="flex items-center gap-1">
      <span className="text-caption-2 font-caption-2 leading-caption-2 text-text-default">
        질문 보기
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={isOn}
        aria-label={`질문 보기 ${isOn ? 'on' : 'off'}`}
        onClick={() => onChange(isOn ? 'off' : 'on')}
        className={cn('flex items-center hover:cursor-pointer', className)}
      >
        {isOn ? (
          <ToggleLgOnIcon className="transition-all motion-safe:duration-200" />
        ) : (
          <ToggleLgOffIcon className="transition-all motion-safe:duration-200" />
        )}
      </button>
    </div>
  )
}
