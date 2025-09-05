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
      <path d="M11.8692 8.48963C12.262 8.16928 12.841 8.19188 13.2071 8.55799L19.2071 14.558C19.5975 14.9485 19.5976 15.5816 19.2071 15.9721C18.8166 16.3625 18.1836 16.3624 17.793 15.9721L12.5001 10.6791L7.20711 15.9721C6.81663 16.3625 6.18356 16.3624 5.79305 15.9721C5.40255 15.5816 5.4026 14.9485 5.79305 14.558L11.793 8.55799L11.8692 8.48963Z" />
    </svg>
  )
}
