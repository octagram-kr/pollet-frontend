'use client'

import { useState } from 'react'
import Image from 'next/image'
import { GoogleIcon } from './google-icon'
import { KakaoIcon } from './kakao-icon'

interface LoginButtonProps {
  isGoogleRecent?: boolean
  onGoogleLogin?: () => void
  onKakaoLogin?: () => void
}

export function LoginButton({ 
  isGoogleRecent = false, 
  onGoogleLogin, 
  onKakaoLogin 
}: LoginButtonProps) {
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
    <div className="space-y-3">
      {/* 구글 로그인 버튼 - 공식 가이드라인 준수 */}
      <button
        onClick={handleGoogleLogin}
        className="w-full h-12 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg flex items-center justify-center gap-3 transition-all duration-200 shadow-sm hover:shadow-md"
      >
        <div className="flex items-center justify-center w-6 h-6">
          <GoogleIcon className="w-5 h-5" />
        </div>
        <span className="text-sm font-medium text-gray-700">Google로 로그인</span>
      </button>

      {/* 카카오 로그인 버튼 - 공식 가이드라인 준수 */}
      <button
        onClick={handleKakaoLogin}
        className="w-full h-12 bg-[#FEE500] rounded-lg flex items-center justify-center px-8 transition-all duration-200 shadow-sm"
      >
        {!kakaoImageError ? (
          <div className="flex items-center justify-center w-full h-full">
            <Image
              src="/images/kakao_login_large_narrow.png"
              alt="카카오 로그인"
              width={180}
              height={48}
              className="object-contain h-full max-w-none"
              priority
              onError={handleKakaoImageError}
            />
          </div>
        ) : (
          /* 이미지 로드 실패 시 CSS로 구현한 백업 버전 */
          <div className="flex items-center justify-center gap-3 w-full h-full">
            <div className="flex items-center justify-center w-6 h-6">
              <KakaoIcon className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium text-black opacity-85">
              카카오 로그인
            </span>
          </div>
        )}
      </button>

      {/* 우측 아이콘들 */}
      <div className="flex justify-end gap-2">
        <div className="h-4 w-4 rounded bg-yellow-300 flex items-center justify-center">
          <svg
            className="w-3 h-3"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 3C6.48 3 2 6.48 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10c0-5.52-4.48-10-10-10zm-2 15l-5-5 1.41-1.41L10 16.17l7.59-7.59L19 10l-9 8z" />
          </svg>
        </div>
        <div className="h-4 w-4 rounded bg-gray-200 flex items-center justify-center text-gray-700 font-bold text-xs">
          G
        </div>
      </div>
    </div>
  )
}
