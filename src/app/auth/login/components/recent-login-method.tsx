'use client'

import { GoogleIcon } from './google-icon'

interface RecentLoginMethodProps {
  isGoogleRecent?: boolean
}

export function RecentLoginMethod({ isGoogleRecent = false }: RecentLoginMethodProps) {
  if (!isGoogleRecent) return null

  return (
    <div className="relative">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10">
            <GoogleIcon className="w-6 h-6" />
          </div>
          <span className="text-sm font-medium text-white">Google로 로그인</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-300">
          <span>최근 사용한 방법입니다</span>
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 17l9.2-9.2M17 17V7H7"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}
