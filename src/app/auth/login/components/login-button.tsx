'use client'

import { useState } from 'react'
import Image from 'next/image'

export function LoginButton() {
  const [isGoogleRecent] = useState(true)
  const [kakaoImageError, setKakaoImageError] = useState(false)

  const handleGoogleLogin = () => {
    // 구글 로그인 로직 구현
    console.log('Google login clicked')
  }

  const handleKakaoLogin = () => {
    // 카카오 로그인 로직 구현
    console.log('Kakao login clicked')
  }

  const handleKakaoImageError = () => {
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
          {/* 구글 로고 SVG */}
          <svg viewBox="0 0 24 24" className="w-5 h-5">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
        </div>
        <span className="text-sm font-medium text-gray-700">Google로 로그인</span>
      </button>

      {/* 카카오 로그인 버튼 - 공식 가이드라인 준수 */}
      <button
        onClick={handleKakaoLogin}
        className="w-full h-12 bg-[#FEE500] rounded-lg flex items-center justify-center transition-all duration-200 shadow-sm"
        style={{
          paddingLeft: '2rem',
          paddingRight: '2rem'
        }}
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
          // 이미지 로드 실패 시 CSS로 구현한 백업 버전
          <div className="flex items-center justify-center gap-3 w-full h-full">
            <div className="flex items-center justify-center w-6 h-6">
              {/* 카카오톡 말풍선 아이콘 SVG */}
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#000000">
                <path d="M12 3C6.48 3 2 6.48 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10c0-5.52-4.48-10-10-10zm-2 15l-5-5 1.41-1.41L10 16.17l7.59-7.59L19 10l-9 8z" />
              </svg>
            </div>
            <span className="text-sm font-medium text-black" style={{ opacity: 0.85 }}>
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
