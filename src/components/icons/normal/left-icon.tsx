import * as React from 'react'

export function LeftIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
      className={`size-6 ${props.className ?? ''}`}
    >
      <path d="M14.7931 5.29306C15.1836 4.90256 15.8166 4.90255 16.2071 5.29306C16.5976 5.68359 16.5976 6.31663 16.2071 6.70713L10.9141 12.0001L16.2071 17.2931C16.5976 17.6836 16.5976 18.3166 16.2071 18.7071C15.8166 19.0976 15.1836 19.0976 14.7931 18.7071L8.79305 12.7071C8.40253 12.3166 8.40253 11.6836 8.79305 11.2931L14.7931 5.29306Z" />
    </svg>
  )
}
