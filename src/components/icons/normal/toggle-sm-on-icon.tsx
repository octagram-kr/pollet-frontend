export function ToggleSmOnIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 21 13"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      {...props}
      className={`size-6 ${props.className ?? ''}`}
    >
      <rect
        y="0.5"
        width="21"
        height="12"
        rx="6"
        fill="#0DB2A4"
      />
      <circle
        cx="15"
        cy="6.5"
        r="4"
        fill="white"
      />
    </svg>
  )
}
