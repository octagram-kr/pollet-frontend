'use client'

import { LoginForm } from './components/login-form'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="bg-[#e9fef8] relative min-h-screen">
      {/* 상단 로고 */}
      <Link
        href="/"
        aria-label="홈으로 이동"
        className="absolute left-1/2 top-[30px] translate-x-[-50%] hover:opacity-80 transition-opacity"
      >
        <img
          src="/icons/logo/logo-all-row-default-icon.svg"
          alt="Pollet 로고"
          className="w-[169px] h-[40px]"
        />
      </Link>

      {/* 메인 로그인 카드 */}
      <LoginForm />
    </div>
  )
}
