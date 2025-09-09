'use client'

import { GoogleIcon } from './google-icon'
import { KakaoIcon } from './kakao-icon'

interface LoginButtonProps {
  onGoogleLogin?: () => void
  onKakaoLogin?: () => void
}

export function LoginButton({ onGoogleLogin, onKakaoLogin }: LoginButtonProps) {
  const handleGoogleLogin = () => {
    try {
      if (onGoogleLogin) {
        onGoogleLogin()
      } else {
        console.log('Google login clicked')
      }
    } catch (error) {
      console.error('Google 로그인 처리 중 오류 발생:', error)
    }
  }

  const handleKakaoLogin = () => {
    try {
      if (onKakaoLogin) {
        onKakaoLogin()
      } else {
        console.log('Kakao login clicked')
      }
    } catch (error) {
      console.error('카카오 로그인 처리 중 오류 발생:', error)
    }
  }

  return (
    <div className="flex flex-col gap-3">
      {/* 카카오 로그인 버튼 */}
      <button
        type="button"
        aria-label="카카오로 계속하기"
        onClick={handleKakaoLogin}
        className="bg-[#fee500] hover:bg-[#fdd835] rounded-[32px] w-[400px] px-0 py-3 flex items-center justify-center gap-3 transition-all duration-200"
      >
        <div className="size-6 flex items-center justify-center">
          <KakaoIcon className="w-6 h-6" />
        </div>
        <span className="text-[18px] font-semibold text-[#434447] leading-[26px] tracking-[-0.48px]">
          카카오로 계속하기
        </span>
      </button>

      {/* 구글 로그인 버튼 */}
      <button
        type="button"
        aria-label="구글로 계속하기"
        onClick={handleGoogleLogin}
        className="bg-[#f3f4f5] hover:bg-[#e5e7eb] rounded-[32px] w-[400px] px-0 py-3 flex items-center justify-center gap-3 transition-all duration-200"
      >
        <div className="size-6 flex items-center justify-center">
          <GoogleIcon className="w-6 h-6" />
        </div>
        <span className="text-[18px] font-semibold text-[#434447] leading-[26px] tracking-[-0.48px]">
          구글로 계속하기
        </span>
      </button>
    </div>
  )
}
