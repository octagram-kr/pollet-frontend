import * as React from 'react'

export function UpIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
      className={`size-6 ${props.className ?? ''}`}
    >
      <path d="M11.8692 6.08714C12.262 5.76679 12.841 5.78938 13.2071 6.1555L19.2071 12.1555C19.5975 12.546 19.5976 13.1791 19.2071 13.5696C18.8166 13.96 18.1836 13.9599 17.793 13.5696L12.5001 8.27659L7.20711 13.5696C6.81663 13.96 6.18356 13.9599 5.79305 13.5696C5.40255 13.1791 5.4026 12.546 5.79305 12.1555L11.793 6.1555L11.8692 6.08714Z" />
    </svg>
  )
}
