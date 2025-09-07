export function ToggleLgOnIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 36 21"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      {...props}
      className={`size-9 ${props.className ?? ''}`}
    >
      <rect
        y="0.5"
        width="36"
        height="20"
        rx="10"
        fill="#0DB2A4"
      />
      <line
        x1="8.5"
        y1="5.5"
        x2="8.5"
        y2="15.5"
        stroke="#0A898B"
      />
      <circle
        cx="26"
        cy="10.5"
        r="8"
        fill="white"
      />
    </svg>
  )
}
