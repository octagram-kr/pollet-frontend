import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
// import { ArrowRight } from 'lucide-react'

export function StatusSection({
  newResponseCount,
  newResponseSurveyTitle,
  weeklyPoints,
  responseHref = '/my-surveys',
  pointsHref = '/my-page',
  cardHeightClass = 'h-28 md:h-32',
}: {
  newResponseCount: number
  newResponseSurveyTitle?: string
  weeklyPoints: number
  responseHref?: string
  pointsHref?: string
  cardHeightClass?: string
}) {
  const CardInner = ({
    title,
    value,
    sub,
  }: {
    title: string
    value: string
    sub?: string
  }) => (
    <Card
      className={cn(
        'flex items-stretch justify-between', // 좌/우 배치
        cardHeightClass, // 🔒 고정 높이
      )}
    >
      {/* 왼쪽 텍스트 영역: 세로 정렬 + 자리 채우기 */}
      <div className="flex min-w-0 flex-1 flex-col justify-center">
        <p className="text-sm text-gray-600">{title}</p>
        <p className="mt-1 text-2xl font-semibold leading-tight">{value}</p>
        {sub && (
          <p className="mt-1 line-clamp-1 text-sm text-gray-500">{sub}</p>
        )}
      </div>

      {/* 오른쪽 아이콘: 세로 가운데 정렬 */}
      <div className="ml-3 flex items-center">
        {/* <ArrowRight className="h-5 w-5 flex-shrink-0 text-gray-400" /> */}
      </div>
    </Card>
  )
  return (
    <section>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Link
          href={responseHref}
          className="group"
        >
          <CardInner
            title="새 응답"
            value={`${newResponseCount.toLocaleString()}개`}
            sub={newResponseSurveyTitle}
          />
        </Link>

        <Link
          href={pointsHref}
          className="group"
        >
          <CardInner
            title="이번 주 누적 포인트"
            value={`${weeklyPoints.toLocaleString()} P`}
          />
        </Link>
      </div>
    </section>
  )
}
