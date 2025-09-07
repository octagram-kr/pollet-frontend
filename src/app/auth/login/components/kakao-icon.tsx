interface KakaoIconProps {
  className?: string
}

export function KakaoIcon({ className = "w-5 h-5" }: KakaoIconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="#000000">
      <path d="M12 3C6.48 3 2 6.48 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10c0-5.52-4.48-10-10-10zm-2 15l-5-5 1.41-1.41L10 16.17l7.59-7.59L19 10l-9 8z" />
    </svg>
  )
}
