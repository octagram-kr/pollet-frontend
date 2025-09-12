'use client'

import { useState, useEffect } from 'react'
import CoverModal, { ThemeCategory, SourceType } from './cover-modal'
import { PlusIcon, ImageIcon, TrashIcon } from '@/components/icons'

type Props = {
  className?: string
  value?: string | null
  onChange?: (url: string | null) => void
}

/** 썸네일 카드(업로드/변경 모달 포함) */
export default function ThumbnailCard({ className, value, onChange }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [thumbnail, setThumbnail] = useState<string | null>(value ?? null)
  const [source, setSource] = useState<SourceType | null>(null)

  useEffect(() => {
    if (value !== undefined) setThumbnail(value)
  }, [value])

  const setThumbnailAndNotify = (url: string | null) => {
    setThumbnail(url)
    onChange?.(url)
  }

  // 데모용 테마 이미지(placeholder). 이후 서버/정적 자원으로 교체하면 됨.
  const categories: ThemeCategory[] = [
    {
      id: 'ai',
      name: 'AI',
      images: [{ id: 'ai-1', src: '/images/thumbnails/AI.png', alt: 'AI 1' }],
    },
    {
      id: 'edu',
      name: '교육',
      images: [
        { id: 'edu-1', src: '/images/thumbnails/Education.png', alt: '교육 1' },
      ],
    },
    {
      id: 'finance',
      name: '금융',
      images: [
        { id: 'fin-1', src: '/images/thumbnails/Finance.png', alt: '금융 1' },
      ],
    },
    {
      id: 'pet',
      name: '반려동물',
      images: [
        { id: 'pet-1', src: '/images/thumbnails/Pet.png', alt: '반려동물 1' },
      ],
    },
    {
      id: 'health',
      name: '헬스케어',
      images: [
        {
          id: 'heal-1',
          src: '/images/thumbnails/Healthcare.png',
          alt: '헬스케어 1',
        },
      ],
    },
    {
      id: 'travel',
      name: '여행',
      images: [
        { id: 'tra-1', src: '/images/thumbnails/Travel.png', alt: '여행 1' },
      ],
    },
    {
      id: 'fashion',
      name: '패션뷰티',
      images: [
        {
          id: 'fas-1',
          src: '/images/thumbnails/Fashion.png',
          alt: '패션뷰티 1',
        },
      ],
    },
    {
      id: 'commerce',
      name: '커머스',
      images: [
        {
          id: 'com-1',
          src: '/images/thumbnails/Commerce.png',
          alt: '커머스 1',
        },
      ],
    },
    {
      id: 'wellbeing',
      name: '웰빙',
      images: [
        {
          id: 'well-1',
          src: '/images/thumbnails/Wellbeing.png',
          alt: '웰빙 1',
        },
      ],
    },
    {
      id: 'lifestyle',
      name: '라이프스타일',
      images: [
        {
          id: 'lif-1',
          src: '/images/thumbnails/Lifestyle.png',
          alt: '라이프스타일 1',
        },
      ],
    },
    {
      id: 'entertainment',
      name: '엔터테인먼트',
      images: [
        {
          id: 'ent-1',
          src: '/images/thumbnails/Entertainment.png',
          alt: '엔터테인먼트 1',
        },
      ],
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
                  setThumbnailAndNotify(null)
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
            setThumbnailAndNotify(src)
            setSource(nextSource)
            setIsOpen(false)
          }}
          // 취소(삭제)
          onClear={() => {
            setThumbnailAndNotify(null)
            setSource(null)
          }}
          hasThumbnail={Boolean(thumbnail)}
          categories={categories}
        />
      )}
    </>
  )
}
