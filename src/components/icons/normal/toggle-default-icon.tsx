import * as React from 'react'

export function ToggleDefaultIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 8C11.2091 8 13 9.79086 13 12C13 14.2091 11.2091 16 9 16C6.79086 16 5 14.2091 5 12C5 9.79086 6.79086 8 9 8ZM9 10C7.89543 10 7 10.8954 7 12C7 13.1046 7.89543 14 9 14C10.1046 14 11 13.1046 11 12C11 10.8954 10.1046 10 9 10Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15 4C19.4183 4 23 7.58172 23 12C23 16.4183 19.4183 20 15 20H9C4.58172 20 1 16.4183 1 12C1 7.58172 4.58172 4 9 4H15ZM9 6C5.68629 6 3 8.68629 3 12C3 15.3137 5.68629 18 9 18H15C18.3137 18 21 15.3137 21 12C21 8.68629 18.3137 6 15 6H9Z"
      />
    </svg>
  )
}
