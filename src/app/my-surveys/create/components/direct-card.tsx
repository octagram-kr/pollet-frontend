import Link from 'next/link'
import Image from 'next/image'

export default function DirectCreateCard({
  layout = 'tall' as 'tall' | 'wide',
}) {
  return (
    <Link
      href="/surveys/create/direct"
      className={[
        'group block h-full rounded-md border-2 border-stroke-subtle bg-fill-white p-5',
        'transition shadow-sm hover:shadow-md hover:-translate-y-0.5 focus:outline-none',
        layout === 'tall'
          ? 'flex flex-col items-center justify-center text-center'
          : 'flex flex-col justify-center',
      ].join(' ')}
    >
      <div className="flex items-center justify-center">
        <Image
          src={'/icons/survey/direct-create-icon.svg'}
          alt="Direct Create"
          width={56}
          height={56}
        />
      </div>
      <h3 className="mt-4 text-text-strong text-title-2 font-title-2 leading-title-2">
        직접 만들기
      </h3>
      <p className="mt-1 text-text-default text-caption-3 font-caption-3 leading-caption-3 tracking-caption-3">
        질문부터 디자인까지 원하는 대로
        <br />
        구성할 수 있어요.
      </p>
    </Link>
  )
}
