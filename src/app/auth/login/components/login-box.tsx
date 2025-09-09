'use client'

import { LoginButton } from './login-button'

interface LoginBoxProps {
  onGoogleLogin?: () => void
  onKakaoLogin?: () => void
}

export function LoginBox({ onGoogleLogin, onKakaoLogin }: LoginBoxProps) {
  return (
    <div className="w-full bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="flex flex-col lg:flex-row">
        {/* 좌측 틸 섹션 */}
        <div className="w-full lg:w-1/3 bg-teal-500 flex items-center justify-center p-8 min-h-[200px] lg:min-h-auto">
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-pink-400 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                </div>
              </div>
            </div>
            <span className="text-3xl font-bold text-white">pollet</span>
          </div>
        </div>

        {/* 우측 화이트 섹션 */}
        <div className="w-full lg:w-2/3 p-8">
          <div className="max-w-md mx-auto">
            {/* 제목 */}
            <h1 className="text-2xl font-semibold text-gray-800 text-center mb-8">
              로그인 또는 회원 가입
            </h1>

            {/* 로그인 버튼들 */}
            <div className="space-y-4">
              <LoginButton
                onGoogleLogin={onGoogleLogin}
                onKakaoLogin={onKakaoLogin}
              />
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
