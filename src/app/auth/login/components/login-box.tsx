'use client'

import { LoginButton } from './login-button'
import { useRouter } from 'next/navigation'

interface LoginBoxProps {
  onGoogleLogin?: () => void
  onKakaoLogin?: () => void
}

export function LoginBox({ onGoogleLogin, onKakaoLogin }: LoginBoxProps) {
  const router = useRouter()

  const handleLogoClick = () => {
    router.push('/')
  }
  return (
    <div className="w-full bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="flex flex-col lg:flex-row">
        {/* 좌측 틸 섹션 */}
        <div className="w-full lg:w-1/3 bg-teal-500 flex items-center justify-center p-8 min-h-[200px] lg:min-h-auto">
          <button
            onClick={handleLogoClick}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer"
          >
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-pink-400 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                </div>
              </div>
            </div>
            <span className="text-3xl font-bold text-white">pollet</span>
          </button>
        </div>

        {/* 우측 화이트 섹션 */}
        <div className="w-full lg:w-2/3 p-8">
          <div className="max-w-md mx-auto">
            {/* 제목 */}
            <h1 className="text-2xl font-semibold text-gray-800 text-center mb-8">
              로그인
            </h1>

            {/* 로그인 버튼들 */}
            <div className="space-y-4">
              <LoginButton
                onGoogleLogin={onGoogleLogin}
                onKakaoLogin={onKakaoLogin}
              />
            </div>

            {/* 회원가입 링크 */}
            <div className="text-center mt-6">
              <span className="text-gray-600">
                계정이 없으신가요?{' '}
                <a
                  href="#"
                  className="text-teal-600 underline hover:text-teal-700 transition-colors"
                >
                  회원가입 하기
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
