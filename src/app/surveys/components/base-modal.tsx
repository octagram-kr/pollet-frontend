'use client'

import { CloseIcon } from '@/components/icons'

export default function BaseModal({
  open,
  onClose,
  title,
  id,
  children,
}: {
  open: boolean
  onClose: () => void
  title: string
  id: string
  children: React.ReactNode
}) {
  if (!open) return null
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={`${id}-title`}
      id={id}
      className="fixed inset-0 z-[100] flex items-center justify-center"
    >
      <div
        className="absolute inset-0 bg-dim"
        onClick={onClose}
        aria-hidden
      />
      <div className="relative z-[101] w-full max-w-[512px] rounded-lg border border-stroke-subtle bg-fill-white px-12 py-8">
        <div className="flex items-center justify-between">
          <h2
            id={`${id}-title`}
            className="text-title-1 font-title-1 leading-title-1 text-text-strong"
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1 text-fill-deep hover:cursor-pointer"
            aria-label="닫기"
          >
            <CloseIcon className="h-8 w-8" />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
