'use client'

import { WelcomeMessage } from './welcome-message'
import { SubMessage } from './sub-message'
import { RecentLoginMethod } from './recent-login-method'
import { LoginButton } from './login-button'

export function LoginBox() {
  return (
    <div className="w-full space-y-8 p-8 bg-gray-900 rounded-lg">
      {/* 로고 */}
      <div className="flex justify-center">
        <div className="h-12 w-32 rounded bg-gray-700 flex items-center justify-center text-gray-300 text-sm font-medium">
          로고
        </div>
      </div>

      {/* 환영 메시지 */}
      <WelcomeMessage />

      {/* 소셜 로그인 섹션 */}
      <div className="space-y-4">
        <SubMessage />
        <div className="space-y-3">
          <RecentLoginMethod />
          <LoginButton />
        </div>
      </div>
    </div>
  )
}
