import * as React from 'react'

export function RadioFillIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      className={`size-6 ${props.className ?? ''}`}
    >
      <path
        d="M21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12ZM23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12Z"
        fill="currentColor"
      />
      <path
        d="M18.4211 12.0523C18.4211 15.607 15.5395 18.4886 11.9848 18.4886C8.43011 18.4886 5.54846 15.607 5.54846 12.0523C5.54846 8.49761 8.43011 5.61597 11.9848 5.61597C15.5395 5.61597 18.4211 8.49761 18.4211 12.0523Z"
        fill="currentColor"
      />
    </svg>
  )
}
