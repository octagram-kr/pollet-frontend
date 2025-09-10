import { Metadata } from 'next/types'

export const metadata: Metadata = {
  title: '회원 정보 입력 - Pollet',
  description: 'Pollet 회원가입을 위한 정보를 입력해주세요',
}

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
