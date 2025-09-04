import * as React from 'react'

export function LeftFillIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
      className={`size-6 ${props.className ?? ''}`}
    >
      <path d="M14.293 5.293C14.579 5.00701 15.0092 4.92142 15.3829 5.0762C15.7564 5.23103 16.0001 5.59565 16.0001 6.00003V18C16.0001 18.4044 15.7564 18.769 15.3829 18.9239C15.0092 19.0786 14.579 18.993 14.293 18.7071L8.29305 12.7071C7.90252 12.3165 7.90252 11.6835 8.29305 11.293L14.293 5.293Z" />
    </svg>
  )
}
