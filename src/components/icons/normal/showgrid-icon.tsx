import * as React from 'react'

export function ShowGridIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 13C10.1046 13 11 13.8954 11 15V20C11 21.1046 10.1046 22 9 22H4C2.89543 22 2 21.1046 2 20V15C2 13.8954 2.89543 13 4 13H9ZM4 20H9V15H4V20Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20 13C21.1046 13 22 13.8954 22 15V20C22 21.1046 21.1046 22 20 22H15C13.8954 22 13 21.1046 13 20V15C13 13.8954 13.8954 13 15 13H20ZM15 20H20V15H15V20Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 2C10.1046 2 11 2.89543 11 4V9C11 10.1046 10.1046 11 9 11H4C2.89543 11 2 10.1046 2 9V4C2 2.89543 2.89543 2 4 2H9ZM4 9H9V4H4V9Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20 2C21.1046 2 22 2.89543 22 4V9C22 10.1046 21.1046 11 20 11H15C13.8954 11 13 10.1046 13 9V4C13 2.89543 13.8954 2 15 2H20ZM15 9H20V4H15V9Z"
      />
    </svg>
  )
}
