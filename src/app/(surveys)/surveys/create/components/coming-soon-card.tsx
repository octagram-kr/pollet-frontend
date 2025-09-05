import Image from 'next/image'

type ComingSoonCardProps = { layout?: 'tall' | 'wide' }

export default function ComingSoonCard({
  layout = 'wide',
}: ComingSoonCardProps) {
  return (
    <div
      className={[
        'block h-full rounded-md border-2 border-stroke-subtler bg-fill-white px-12 py-5 cursor-not-allowed',

        layout === 'tall'
          ? 'flex flex-col items-center justify-center text-center'
          : 'flex flex-col justify-center',
      ].join(' ')}
    >
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center">
          <Image
            src={'/icons/survey/coming-soon-icon.svg'}
            alt="Coming Soon"
            className="opacity-80"
            width={56}
            height={56}
          />
        </div>
        <div className="flex-1">
          <h3 className="text-text-subtle text-title-2 font-title-2 leading-title-2">
            업데이트 예정
          </h3>
          <p className="text-text-subtle text-body-6 font-body-6 leading-body-6">
            새로운 설문조사 제작 방식이 추가될 예정이에요.
          </p>
        </div>
      </div>
    </div>
  )
}
