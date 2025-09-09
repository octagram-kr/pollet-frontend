import Image from 'next/image'

interface KakaoIconProps {
  className?: string
}

export function KakaoIcon({ className = 'w-6 h-6' }: KakaoIconProps) {
  return (
    <Image
      src="/icons/logo/KakaoLogo.svg"
      alt="카카오 로고"
      width={24}
      height={24}
      className={className}
    />
  )
}
