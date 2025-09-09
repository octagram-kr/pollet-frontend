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
    <div className="space-y-3">
      {/* 구글 로그인 버튼 - 공식 가이드라인 준수 */}
      <button
        onClick={handleGoogleLogin}
        className="w-full h-12 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg flex items-center justify-center gap-3 transition-all duration-200 shadow-sm hover:shadow-md"
      >
        <div className="flex items-center justify-center w-6 h-6">
          <GoogleIcon className="w-5 h-5" />
        </div>
        <span className="text-sm font-medium text-gray-700">
          Google로 로그인
        </span>
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
    </div>
  )
}
