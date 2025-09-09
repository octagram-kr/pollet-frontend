'use client'

import { RegisterBox } from './register-box'

export function RegisterForm() {
  return (
    <div className="min-h-dvh flex items-center justify-center px-5">
      <div className="w-full max-w-[792px]">
        <RegisterBox />
      </div>
    </div>
  )
}
