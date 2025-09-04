import * as React from 'react'

export function CheckboxFillIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      className={`size-6 ${props.className ?? ''}`}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19 2C20.6569 2 22 3.34315 22 5V19C22 20.6569 20.6569 22 19 22H5C3.34315 22 2 20.6569 2 19V5C2 3.34315 3.34315 2 5 2H19ZM18.5186 7.5791C18.1281 7.18867 17.4941 7.18885 17.1035 7.5791L9.81641 14.8662L6.88965 11.9395C6.49925 11.5492 5.8661 11.5494 5.47559 11.9395C5.08511 12.3299 5.08521 12.963 5.47559 13.3535L9.10938 16.9873C9.4999 17.3778 10.1329 17.3778 10.5234 16.9873L18.5186 8.99316C18.9084 8.60269 18.9086 7.96947 18.5186 7.5791Z"
        fill="currentColor"
      />
    </svg>
  )
}
