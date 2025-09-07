export function ToggleLgOffIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 36 20"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      {...props}
      className={`size-9 ${props.className ?? ''}`}
    >
      <rect
        width="36"
        height="20"
        rx="10"
        fill="#E8E9EB"
      />
      <circle
        cx="10"
        cy="10"
        r="8"
        fill="white"
      />
      <circle
        cx="28"
        cy="10"
        r="3.75"
        stroke="white"
        strokeWidth="0.5"
      />
    </svg>
  )
}
