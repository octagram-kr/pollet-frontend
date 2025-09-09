'use client'

import { useState } from 'react'
import Image from 'next/image'
import { GoogleIcon } from './google-icon'
import { KakaoIcon } from './kakao-icon'

interface LoginButtonProps {
  onGoogleLogin?: () => void
  onKakaoLogin?: () => void
}

export function LoginButton({ onGoogleLogin, onKakaoLogin }: LoginButtonProps) {
  const [kakaoImageError, setKakaoImageError] = useState(false)

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

  const handleKakaoImageError = () => {
    console.warn('카카오 로그인 이미지 로드 실패, 백업 버전으로 전환')
    setKakaoImageError(true)
  }

  return (
    <div className="space-y-4">
      {/* 카카오 로그인 버튼 */}
      <button
        type="button"
        aria-label="카카오로 계속하기"
        onClick={handleKakaoLogin}
        className="w-full h-14 bg-[#FEE500] hover:bg-[#FDD835] rounded-xl flex items-center justify-center gap-3 transition-all duration-200 shadow-sm hover:shadow-md"
      >
        {!kakaoImageError ? (
          <div className="flex items-center justify-center w-full h-full">
            <Image
              src="/images/kakao_login_large_narrow.png"
              alt="카카오로 계속하기"
              width={180}
              height={48}
              className="object-contain h-full max-w-none"
              priority
              onError={handleKakaoImageError}
            />
          </div>
        ) : (
          <div className="flex items-center justify-center gap-3 w-full h-full">
            <div className="flex items-center justify-center w-6 h-6">
              <KakaoIcon className="w-6 h-6" />
            </div>
            <span className="text-base font-medium text-black">
              카카오로 계속하기
            </span>
          </div>
        )}
      </button>

      {/* 구글 로그인 버튼 */}
      <button
        type="button"
        aria-label="구글로 계속하기"
        onClick={handleGoogleLogin}
        className="w-full h-14 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-xl flex items-center justify-center gap-3 transition-all duration-200 shadow-sm hover:shadow-md"
      >
        <div className="flex items-center justify-center w-6 h-6">
          <GoogleIcon className="w-6 h-6" />
        </div>
        <span className="text-base font-medium text-gray-700">구글로 계속하기</span>
      </button>
    </div>
  )
}
