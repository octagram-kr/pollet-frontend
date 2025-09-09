'use client'

import { LoginForm } from './components/login-form'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()

  const handleLogoClick = () => {
    router.push('/')
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center w-full max-w-[1440px] mx-auto px-4 sm:px-8 md:px-16 lg:px-32 xl:px-80"
      style={{
        background: 'var(--Background-mint-faint, #E9FEF8)',
        paddingTop: '30px',
        paddingBottom: '270px',
        gap: '200px',
      }}
    >
      {/* 상단 로고 */}
      <button
        onClick={handleLogoClick}
        className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer"
      >
        <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-pink-400 rounded-full flex items-center justify-center">
          <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
          </div>
        </div>
        <span className="text-2xl font-bold text-teal-600">pollet</span>
      </button>

      {/* 메인 로그인 카드 */}
      <LoginForm />
    </div>
  )
}
