import * as React from 'react'

export function DotIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 6 6"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      className={`w-[6px] h-[6px] ${props.className ?? ''}`}
    >
      <circle
        cx="3"
        cy="3"
        r="3"
      />
    </svg>
  )
}
