'use client'

import { cn } from '@/lib/utils'

type Tone = 'mint' | 'pink'
type Chip = { label: string; tone: Tone }

type SimpleProps = {
  /** 문자열 태그 배열 버전 (SurveyCard에서 사용) */
  tags: string[]
  className?: string
}

type DemographicProps = {
  /** 구조화된 태그 버전 */
  gender: 'male' | 'female'
  age: '10' | '20' | '30' | '40' | '50' | '60+'
  job: string
  tag1?: string | null
  tag2?: string | null
  className?: string
}

type Props = SimpleProps | DemographicProps

export function TagList(props: Props) {
  const chips: Chip[] =
    'tags' in props
      ? // ------- 1) 문자열 배열 버전 -------
        (props.tags ?? [])
          .filter((t): t is string => typeof t === 'string' && t.length > 0)
          .map((raw) => {
            const label = String(raw).trim().replace(/^#+/, '')
            const tone: Tone = isDemographicTag(label) ? 'mint' : 'pink'
            return { label, tone }
          })
      : // ------- 2) 구조화된 버전 -------
        (
          [
            {
              label: props.gender === 'male' ? '남자' : '여자',
              tone: 'mint' as const,
            },
            {
              label: props.age === '60+' ? '60대 이상' : `${props.age}대`,
              tone: 'mint' as const,
            },
            { label: String(props.job ?? ''), tone: 'mint' as const },
            {
              label: props.tag1 ?? '',
              tone: 'pink' as const,
            },
            {
              label: props.tag2 ?? '',
              tone: 'pink' as const,
            },
          ] as const
        ).filter((c) => c.label && c.label.trim().length > 0)

  return (
    <div
      className={cn(
        'flex flex-wrap gap-2',
        'className' in props ? props.className : undefined,
      )}
    >
      {chips.map((c, idx) => (
        <span
          key={`${c.label}-${idx}`}
          className={cn(
            'inline-flex items-center px-0.5 py-1 text-label-8 font-label-8 leading-label-8 tracking-label-8 text-text-default',
            c.tone === 'mint' ? 'bg-bg-mint-lighter' : 'bg-bg-pink-light',
          )}
        >
          #{c.label}
        </span>
      ))}
    </div>
  )
}

function isDemographicTag(tag: string) {
  const t = tag.replace(/\s+/g, '').toLowerCase()
  if (/(성별|남성|여성|남자|여자|male|female)/.test(t)) return true
  if (/(나이|^\d{1,2}대$|^\d{1,3}세$)/.test(t)) return true
  if (
    /(직업|학생|대학생|취준|회사원|사무직|전문직|자영업|프리랜서|공무원|군인|개발자|디자이너|마케터|기획자|교사|의사|간호사)/.test(
      t,
    )
  )
    return true
  return false
}
