import { Metadata } from 'next/types'

export const metadata: Metadata = {
  title: '로그인 또는 회원 가입 - Pollet',
  description: 'Pollet에 로그인하거나 새 계정을 만드세요',
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
