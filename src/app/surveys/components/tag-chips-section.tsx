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
    next.has(tag) ? next.delete(tag) : next.add(tag)
    replaceTags(next)
  }
  const clearTags = () => replaceTags(new Set())

  // 필터 적용 시 반영
  const handleApplyFilter = (form: FilterFormState) => {
    const sp = new URLSearchParams(searchParams.toString())
    // 간단한 직렬화 규칙(필요 시 서버 규격에 맞춰 교체)
    form.gender ? sp.set('gender', form.gender) : sp.delete('gender')
    form.ages.length ? sp.set('ages', form.ages.join(',')) : sp.delete('ages')
    form.jobs.length ? sp.set('jobs', form.jobs.join(',')) : sp.delete('jobs')
    form.pointMin != null
      ? sp.set('pmin', String(form.pointMin))
      : sp.delete('pmin')
    form.pointMax != null
      ? sp.set('pmax', String(form.pointMax))
      : sp.delete('pmax')
    form.gifticonOnly ? sp.set('gifticon', '1') : sp.delete('gifticon')
    form.durations.length
      ? sp.set('dur', form.durations.join(','))
      : sp.delete('dur')
    replaceSearch(sp)
    setModalVariant(null)
  }

  return (
    <section
      className={cn('flex items-center bg-fill-subtle pt-8 pb-6', className)}
    >
      <div className="mx-auto max-w-7xl flex flex-col items-center">
        <FilterSection
          cards={[
            { icon: 'user', title: '여자' },
            { icon: 'starcandy', title: '50개 - 1,000개' },
            { icon: 'clock', title: '1분 - 10분' },
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
              gender:
                (searchParams.get('gender') as
                  | 'male'
                  | 'female'
                  | 'all'
                  | null) || 'all',
              ages: (searchParams.get('ages') || '').split(',').filter(Boolean),
              jobs: (searchParams.get('jobs') || '').split(',').filter(Boolean),
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
