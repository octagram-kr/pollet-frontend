'use client'

import { LoginForm } from './components/login-form'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()

  const handleLogoClick = () => {
    router.push('/')
  }

  return (
    <div className="bg-[#e9fef8] relative min-h-screen">
      {/* 상단 로고 */}
      <button
        aria-label="홈으로 이동"
        onClick={handleLogoClick}
        className="absolute left-1/2 top-[30px] translate-x-[-50%] hover:opacity-80 transition-opacity cursor-pointer"
      >
        <img 
          src="/icons/logo/logo-all-row-default-icon.svg" 
          alt="Pollet 로고" 
          className="w-[169px] h-[40px]"
        />
      </button>

      {/* 메인 로그인 카드 */}
      <LoginForm />
    </div>
  )
}
