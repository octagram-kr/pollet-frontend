import * as React from 'react'

export function ToggleFillIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
      className={`size-6 ${props.className ?? ''}`}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15 4C19.4183 4 23 7.58172 23 12C23 16.4183 19.4183 20 15 20H9C4.58172 20 1 16.4183 1 12C1 7.58172 4.58172 4 9 4H15ZM15 8.25C12.9289 8.25 11.25 9.92893 11.25 12C11.25 14.0711 12.9289 15.75 15 15.75C17.0711 15.75 18.75 14.0711 18.75 12C18.75 9.92893 17.0711 8.25 15 8.25Z"
      />
    </svg>
  )
}
