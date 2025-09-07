'use client'

import { useMemo, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'
import FilterSection from './filter-section'
import TagList from './tag-list'
import BaseModal from './base-modal'
import FilterModalContent, { FilterFormState } from './filter-modal-content'
import TagModalContent from './tag-modal-content'

export default function TagChipsSection({
  className,
  availableTags = [
    'AI',
    '교육',
    '금융',
    '헬스케어',
    '여행',
    '패션뷰티',
    '커머스',
    '라이프스타일',
    '엔터테인먼트',
    '웰빙',
    '식품',
    '반려동물',
  ],
  maxVisible = 9,
}: {
  className?: string
  availableTags?: string[]
  maxVisible?: number
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [modalVariant, setModalVariant] = useState<null | 'filter' | 'tag'>(
    null,
  )
  // 현재 필터값 파싱
  const gender =
    (searchParams.get('gender') as 'male' | 'female' | 'all' | null) ?? 'all'
  const age = searchParams.get('age') // 단일 선택으로 key 변경
  const job = searchParams.get('job')
  const pmin = searchParams.get('pmin')
  const pmax = searchParams.get('pmax')
  const durList = (searchParams.get('dur') || '').split(',').filter(Boolean)

  // 카드1: 성별·연령·직업
  const card1Selected = !(gender === 'all' && !age && !job)
  const genderLabel =
    gender === 'male' ? '남자' : gender === 'female' ? '여자' : null
  const ageLabel = age ? (age === '60+' ? '60대 이상' : `${age}대`) : null
  const jobLabel = job ?? null
  const card1Title = card1Selected
    ? [genderLabel, ageLabel, jobLabel].filter(Boolean).join(' · ')
    : '선택 사항 없음'

  // 카드2: 포인트
  const card2Selected = Boolean(pmin || pmax)
  const card2Title = card2Selected
    ? `${Number(pmin ?? 50).toLocaleString()}개 - ${Number(pmax ?? 30000).toLocaleString()}개`
    : '50개 - 30,000개'

  // 카드3: 시간 (dur 다중 선택 → 최소/최대 표시)
  const mins = durList
    .map((d) => (d === '30+' ? 999 : Number(d)))
    .filter((n) => !Number.isNaN(n))
    .sort((a, b) => a - b)
  const hasDur = mins.length > 0
  const minLabel = hasDur ? `${mins[0]}분` : '1분'
  const maxLabel = hasDur
    ? mins[mins.length - 1] >= 999
      ? '30분 이상'
      : `${mins[mins.length - 1]}분`
    : '30분 이상'
  const card3Title = `${minLabel} - ${maxLabel}`

  const isOpen = modalVariant !== null

  // URL ↔ 선택 태그
  const selectedTags = useMemo(() => {
    const raw = searchParams.get('tags') || ''
    return new Set(
      raw
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
    )
  }, [searchParams])

  const replaceSearch = (sp: URLSearchParams) => {
    router.replace(`${pathname}?${sp.toString()}`, { scroll: false })
  }

  const replaceTags = (set: Set<string>) => {
    const sp = new URLSearchParams(searchParams.toString())
    const arr = [...set]
    if (arr.length) sp.set('tags', arr.join(','))
    else sp.delete('tags')
    replaceSearch(sp)
  }
  const toggleTag = (tag: string) => {
    const next = new Set(selectedTags)
    if (next.has(tag)) {
      next.delete(tag)
    } else {
      next.add(tag)
    }
    replaceTags(next)
  }
  const clearTags = () => replaceTags(new Set())

  // 필터 적용 시 반영
  const handleApplyFilter = (form: FilterFormState) => {
    // 간단한 직렬화 규칙(필요 시 서버 규격에 맞춰 교체)
    const sp = new URLSearchParams(searchParams.toString())
    if (form.gender) {
      sp.set('gender', form.gender)
    } else {
      sp.delete('gender')
    }
    if (form.age) {
      sp.set('age', form.age)
    } else {
      sp.delete('age')
    }
    if (form.job) {
      sp.set('job', form.job)
    } else {
      sp.delete('job')
    }
    if (form.pointMin != null) {
      sp.set('pmin', String(form.pointMin))
    } else {
      sp.delete('pmin')
    }
    if (form.pointMax != null) {
      sp.set('pmax', String(form.pointMax))
    } else {
      sp.delete('pmax')
    }
    if (form.gifticonOnly) {
      sp.set('gifticon', '1')
    } else {
      sp.delete('gifticon')
    }
    if (form.durations.length) {
      sp.set('dur', form.durations.join(','))
    } else {
      sp.delete('dur')
    }
    router.replace(`${pathname}?${sp.toString()}`, { scroll: false })
    setModalVariant(null)
  }

  return (
    <section
      className={cn(
        'flex items-center bg-fill-subtle mt-4 pt-8 pb-6',
        className,
      )}
    >
      <div className="mx-auto max-w-7xl flex flex-col items-center">
        <FilterSection
          cards={[
            { icon: 'user', title: card1Title, muted: !card1Selected },
            { icon: 'starcandy', title: card2Title, muted: !card2Selected },
            { icon: 'clock', title: card3Title, muted: !hasDur },
          ]}
          onAnyCardClick={() => setModalVariant('filter')}
        />

        <TagList
          className="mt-6"
          tags={availableTags}
          maxVisible={maxVisible}
          selected={selectedTags}
          onToggle={toggleTag}
          onClear={clearTags}
          onOpenTagModal={() => setModalVariant('tag')}
        />
      </div>

      <BaseModal
        open={isOpen}
        onClose={() => setModalVariant(null)}
        title={modalVariant === 'filter' ? '필터' : '태그'}
        id="surveys-modal"
      >
        {modalVariant === 'filter' ? (
          <FilterModalContent
            // 초기값은 URL에서 읽어서 전달 (간단 파싱)
            initial={{
              gender: ['male', 'female', 'all'].includes(
                searchParams.get('gender') ?? '',
              )
                ? (searchParams.get('gender') as 'male' | 'female' | 'all')
                : 'all',

              age: searchParams.get('age'),
              job: searchParams.get('job'),
              pointMin: searchParams.get('pmin')
                ? Number(searchParams.get('pmin'))
                : 50,
              pointMax: searchParams.get('pmax')
                ? Number(searchParams.get('pmax'))
                : 30000,
              gifticonOnly: searchParams.get('gifticon') === '1',
              durations: (searchParams.get('dur') || '')
                .split(',')
                .filter(Boolean),
            }}
            onApply={handleApplyFilter}
          />
        ) : (
          <TagModalContent
            tags={availableTags}
            selected={selectedTags}
            maxSelectable={3}
            onToggle={toggleTag}
            onClear={clearTags}
            onApply={() => setModalVariant(null)}
          />
        )}
      </BaseModal>
    </section>
  )
}
