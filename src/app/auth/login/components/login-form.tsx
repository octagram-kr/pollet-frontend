'use client'

import { LoginBox } from './login-box'

export function LoginForm() {
  return (
    <div className="min-h-dvh flex items-center justify-center px-5">
      <div className="w-full max-w-[792px]">
        <LoginBox />
      </div>
    </div>
  )
}
