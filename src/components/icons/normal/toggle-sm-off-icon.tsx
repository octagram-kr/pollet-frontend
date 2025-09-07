export function ToggleSmOffIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 21 12"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      {...props}
      className={`size-6 ${props.className ?? ''}`}
    >
      <rect
        width="21"
        height="12"
        rx="6"
        fill="#E8E9EB"
      />
      <circle
        cx="6"
        cy="6"
        r="4"
        fill="white"
      />
    </svg>
  )
}
