import * as React from 'react'

export function RightFillIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
      className={`size-6 ${props.className ?? ''}`}
    >
      <path d="M9.61719 5.0762C9.99086 4.92142 10.421 5.007 10.707 5.293L16.707 11.293C17.0975 11.6835 17.0975 12.3165 16.707 12.7071L10.707 18.7071C10.421 18.993 9.99084 19.0786 9.61719 18.9239C9.2436 18.7691 9.00002 18.4044 9 18V6.00003C9 5.59562 9.2436 5.23102 9.61719 5.0762Z" />
    </svg>
  )
}
