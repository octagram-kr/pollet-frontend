export default function Duration({ minutes }: { minutes: number }) {
  return (
    <span className="inline-flex items-center rounded-full bg-[#F6F0FF] px-2.5 py-1 text-xs font-semibold text-[#8A42FF]">
      {minutes}분
    </span>
  )
}
