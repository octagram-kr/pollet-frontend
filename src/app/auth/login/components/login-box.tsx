'use client'

import { LoginButton } from './login-button'

interface LoginBoxProps {
  onGoogleLogin?: () => void
  onKakaoLogin?: () => void
}

export function LoginBox({ onGoogleLogin, onKakaoLogin }: LoginBoxProps) {
  return (
    <div className="bg-white rounded-[40px] shadow-[0px_0px_8px_0px_rgba(0,0,0,0.12),0px_1px_4px_0px_rgba(0,0,0,0.08),0px_0px_2px_0px_rgba(0,0,0,0.04)] overflow-hidden h-[480px] w-[792px]">
      <div className="flex h-full">
        {/* 좌측 틸 섹션 */}
        <div className="bg-[#5ed7c3] flex flex-col gap-6 h-full items-center justify-center w-[281px]">
          <div className="flex flex-col items-center">
            {/* 심볼 로고 */}
            <img 
              src="/icons/logo/logo-symbol-white-icon.svg" 
              alt="Pollet 심볼" 
              className="w-[80px] h-[80px] -mb-2"
            />
            {/* 텍스트 로고 */}
            <img 
              src="/icons/logo/logo-none-white-icon.svg" 
              alt="Pollet" 
              className="w-[102px] h-[35px]"
            />
          </div>
        </div>

        {/* 우측 화이트 섹션 */}
        <div className="flex flex-col gap-12 grow h-full items-center justify-center px-6 py-12">
          {/* 제목 */}
          <h1 className="text-[22px] font-semibold text-[#292a2c] leading-[30px]">
            로그인 / 회원가입
          </h1>

          {/* 로그인 버튼들 */}
          <div className="flex flex-col gap-3">
            <LoginButton
              onGoogleLogin={onGoogleLogin}
              onKakaoLogin={onKakaoLogin}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
