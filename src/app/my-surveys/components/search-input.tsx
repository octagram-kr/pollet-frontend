'use client'
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
  placeholder = '내 설문 검색',
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
      {/* <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-500" /> */}
      <input
        name={name}
        defaultValue={defaultValue}
        className="w-full pl-9 pr-3 py-2 rounded-md border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
        placeholder={placeholder}
        aria-label="내 설문 검색"
      />
    </form>
  )
}
