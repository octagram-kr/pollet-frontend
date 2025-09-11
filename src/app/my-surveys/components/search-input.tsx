'use client'

import { SearchIcon } from '@/components/icons'

// import { Search } from 'lucide-react'

interface Props {
  /** 제출할 경로. 기본값: 현재 경로 */
  action?: string
  /** 입력 초기값 (URL의 q 등)을 바인딩) */
  defaultValue?: string
  /** 인풋 name (쿼리 파라미터 키) */
  name?: string
  placeholder?: string
  hiddenParams?: Record<string, string | undefined | null>
}

export default function SearchInput({
  action = '.',
  defaultValue = '',
  name = 'q',
  placeholder = '검색어를 입력하세요',
  hiddenParams,
}: Props) {
  return (
    <form
      action={action}
      method="GET"
      role="search"
      className="relative w-full max-w-md"
    >
      {hiddenParams &&
        Object.entries(hiddenParams).map(([k, v]) =>
          v ? (
            <input
              key={k}
              type="hidden"
              name={k}
              value={v}
            />
          ) : null,
        )}
      <div>
        <SearchIcon className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-5 w-6 text-text-default" />
        <input
          name={name}
          defaultValue={defaultValue}
          className="w-[241px] pl-5 py-2 rounded-xl bg-fill-subtle text-body-5 font-body-5 leading-body-5 tracking-body-5"
          placeholder={placeholder}
          aria-label="내 설문 검색"
        />
      </div>
    </form>
  )
}
