import Link from 'next/link'
import { cn } from '@/lib/utils'
import { RightIcon, StarcandyFillIcon } from '@/components/icons'

export function StatusSection({
  nickname,
  newResponseCount,
  newResponseSurveyTitle,
  weeklyPoints,
  responseHref = '/my-surveys',
  pointsHref = '/my-page',
  hasSurveys = true,
}: {
  nickname: string
  newResponseCount: number
  newResponseSurveyTitle?: string
  weeklyPoints: number
  responseHref?: string
  pointsHref?: string
  hasSurveys?: boolean
}) {
  const formattedResponses = newResponseCount.toLocaleString()
  const formattedPoints = weeklyPoints.toLocaleString()

  const CardInner = ({
    top,
    bottom,
    accent = false,
  }: {
    top: React.ReactNode
    bottom: React.ReactNode
    accent?: boolean
  }) => (
    <div
      className={cn(
        'block rounded-sm border-2 pl-8 pr-4 py-3 hover:shadow-md',
        accent
          ? 'border-stroke-primary bg-fill-primary-disabled'
          : 'border-stroke-subtle bg-fill-white',
      )}
    >
      <div className="flex items-stretch justify-between">
        {/* 왼쪽 텍스트 */}
        <div className="flex min-w-0 flex-1 flex-col justify-center">
          <div>{top}</div>
          <div className="mt-1 items-center leading-tight">{bottom}</div>
        </div>
        {/* 오른쪽 아이콘 */}
        <div className="flex items-center">
          <RightIcon className="size-16 fill-fill-primary" />
        </div>
      </div>
    </div>
  )
  return (
    <section>
      {hasSurveys ? (
        <div className="flex justify-center gap-6">
          <div className="hidden md:col-span-2 md:block" />
          <Link
            href={responseHref}
            className="col-span-1 mx-auto w-[486px] md:col-span-4 md:mx-0"
          >
            <CardInner
              top={
                <>
                  <div className="flex flex-col">
                    <span className="item-center text-body-1 font-body-1 leading-body-1 tracking-body-1 text-text-default">
                      새 설문 응답이
                      <span className="text-label-1 font-label-1 leading-label-1 tracking-label-1 text-text-primary">
                        {' '}
                        {formattedResponses}
                      </span>
                      개 들어왔어요!
                    </span>
                    {`${newResponseSurveyTitle ? newResponseSurveyTitle : ''}`}
                  </div>
                </>
              }
              bottom={'' /* 두 줄 구성이라 아래 줄은 비움 */}
            />
          </Link>

          <Link
            href={pointsHref}
            className="col-span-1 mx-auto w-[486px] md:col-span-4 md:mx-0"
          >
            <CardInner
              top={`${nickname} 님의 일주일 누적 포인트`}
              bottom={
                <>
                  <span className="flex items-center tabular-nums text-label-1 font-label-1 leading-label-1">
                    <StarcandyFillIcon className="fill-fill-primary-active" />
                    {formattedPoints}
                    <span className="text-label-2 font-label-2 leading-label-2">
                      개
                    </span>
                  </span>
                </>
              }
              accent
            />
          </Link>
          <div className="hidden md:col-span-2 md:block" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-12">
          <div className="hidden md:col-span-3 md:block" />
          <Link
            href={pointsHref}
            className="col-span-1 mx-auto w-full max-w-[640px] md:col-span-6"
          >
            <CardInner
              top={`${nickname} 님은 일주일 동안`}
              bottom={
                <>
                  <span className="flex tabular-nums text-label-1 font-label-1 leading-label-1">
                    <StarcandyFillIcon className="fill-fill-primary-active" />
                    {formattedPoints}
                  </span>
                  <span className="text-label-2 font-label-2 leading-label-2">
                    개 를 모았어요!
                  </span>
                </>
              }
              accent
            />
          </Link>
          <div className="hidden md:col-span-3 md:block" />
        </div>
      )}
    </section>
  )
}
