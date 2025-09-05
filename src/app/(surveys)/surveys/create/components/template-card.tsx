import Image from 'next/image'

type TemplateCardProps = { layout?: 'tall' | 'wide' }

export default function TemplateCard({ layout = 'wide' }: TemplateCardProps) {
  return (
    <div
      className={[
        'group block h-full rounded-md border-2 border-stroke-subtle bg-fill-white px-12 py-5 cursor-not-allowed',

        layout === 'tall'
          ? 'flex flex-col items-center justify-center text-center'
          : 'flex flex-col justify-center',
      ].join(' ')}
    >
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center">
          <Image
            src={'/icons/survey/search-template-icon.svg'}
            alt="Template Create"
            width={56}
            height={56}
          />
        </div>
        <div className="flex-1">
          <h3 className="text-text-strong text-title-2 font-title-2 leading-title-2">
            템플릿 사용하기
          </h3>
          <p className="text-text-default text-body-6 font-body-6 tracking-body-6 leading-body-6">
            복잡한 과정 없이 손쉽게 설문을 시작하세요.
          </p>
        </div>
      </div>
    </div>
  )
}
