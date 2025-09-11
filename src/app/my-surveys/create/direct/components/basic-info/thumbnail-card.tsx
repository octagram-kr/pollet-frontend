'use client'

import { useState } from 'react'
import CoverModal, { ThemeCategory, SourceType } from './cover-modal'
import { PlusIcon, ImageIcon, TrashIcon } from '@/components/icons'

type Props = {
  className?: string
  value?: string | null
  onChange?: (url: string | null) => void
}

/** 썸네일 카드(업로드/변경 모달 포함) */
export default function ThumbnailCard({ className }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [thumbnail, setThumbnail] = useState<string | null>(null)
  const [source, setSource] = useState<SourceType | null>(null)

  // 데모용 테마 이미지(placeholder). 이후 서버/정적 자원으로 교체하면 됨.
  const categories: ThemeCategory[] = [
    {
      id: 'ai',
      name: 'AI',
      images: [
        { id: 'ai-1', src: '/images/themes/ai-1.png', alt: 'AI 1' },
        { id: 'ai-2', src: '/images/themes/ai-2.png', alt: 'AI 2' },
      ],
    },
    {
      id: 'edu',
      name: '교육',
      images: [
        { id: 'edu-1', src: '/images/themes/edu-1.png', alt: '교육 1' },
        { id: 'edu-2', src: '/images/themes/edu-2.png', alt: '교육 2' },
        { id: 'edu-3', src: '/images/themes/edu-3.png', alt: '교육 3' },
        { id: 'edu-4', src: '/images/themes/edu-4.png', alt: '교육 4' },
        { id: 'edu-5', src: '/images/themes/edu-5.png', alt: '교육 5' },
      ],
    },
    {
      id: 'finance',
      name: '금융',
      images: [
        { id: 'fin-1', src: '/images/themes/fin-1.png', alt: '금융 1' },
        { id: 'fin-2', src: '/images/themes/fin-2.png', alt: '금융 2' },
      ],
    },
    {
      id: 'pet',
      name: '반려동물',
      images: [],
    },
    {
      id: 'health',
      name: '헬스케어',
      images: [],
    },
    {
      id: 'travel',
      name: '여행',
      images: [],
    },
    {
      id: 'fashion',
      name: '패션뷰티',
      images: [],
    },
    {
      id: 'cumors',
      name: '커머스',
      images: [],
    },
    {
      id: 'wellbing',
      name: '웰빙',
      images: [],
    },
    {
      id: 'lifestyle',
      name: '라이프스타일',
      images: [],
    },
    {
      id: 'entertainment',
      name: '엔터테인먼트',
      images: [],
    },
  ]

  return (
    <>
      <div
        className={[
          'relative overflow-hidden rounded-sm rounded-tl-none border-[1.8px] border-dashed border-stroke-subtle bg-fill-white',
          'min-h-[212px]',
          className ?? '',
        ].join(' ')}
      >
        {/* 미적용 상태 */}
        {!thumbnail && (
          <div className="flex flex-col h-[212px] items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="w-fit group inline-flex items-center justify-center rounded-xl bg-fill-subtle cursor-pointer hover:opacity-80"
              aria-label="썸네일 업로드하기"
            >
              <PlusIcon className="w-16 h-16 fill-fill-active" />
            </button>
            <p className="text-body-1 font-body-1 leading-body-1 tracking-body-1 text-text-default">
              썸네일 업로드하기
            </p>
          </div>
        )}

        {/* 적용 상태 */}
        {thumbnail && (
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={thumbnail}
              alt="선택된 썸네일"
              className="h-[212px] w-full object-cover"
              draggable={false}
            />
            <div className="absolute right-3 top-2 z-10 flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(true)
                }}
                className="w-[40px] h-[40px] flex items-center justify-center rounded-xl border border-stroke-primary bg-fill-primary cursor-pointer hover:opacity-90"
              >
                <ImageIcon className="w-5 fill-fill-deep" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setThumbnail(null)
                  setSource(null)
                }}
                className="w-[40px] h-[40px] flex items-center justify-center rounded-xl border border-stroke-primary bg-fill-primary cursor-pointer hover:opacity-90"
              >
                <TrashIcon className="w-5 fill-fill-deep" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 모달 */}
      {isOpen && (
        <CoverModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          // 현재 썸네일 정보 전달
          currentSource={source ?? undefined}
          currentSrc={thumbnail ?? undefined}
          // 적용(테마/업로드 출처 함께 전달)
          onApply={(src, nextSource) => {
            setThumbnail(src)
            setSource(nextSource)
            setIsOpen(false)
          }}
          // 취소(삭제)
          onClear={() => {
            setThumbnail(null)
            setSource(null)
          }}
          hasThumbnail={Boolean(thumbnail)}
          categories={categories}
        />
      )}
    </>
  )
}
