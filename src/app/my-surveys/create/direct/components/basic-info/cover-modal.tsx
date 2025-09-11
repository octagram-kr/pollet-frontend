'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import { CloseIcon } from '@/components/icons'

export type ThemeImage = {
  id: string
  src: string
  alt?: string
}
export type ThemeCategory = { id: string; name: string; images: ThemeImage[] }
export type SourceType = 'theme' | 'upload'
type Tab = 'theme' | 'upload'

type Props = {
  isOpen: boolean
  onClose: () => void
  onApply: (src: string, source: SourceType) => void
  onClear: () => void
  hasThumbnail?: boolean
  categories: ThemeCategory[]
  currentSource?: SourceType
  currentSrc?: string
}

export default function CoverModal({
  isOpen,
  onClose,
  onApply,
  onClear,
  hasThumbnail = false,
  categories,
  currentSource,
  currentSrc,
}: Props) {
  const [tab, setTab] = useState<Tab>('theme')
  const [selectedCat, setSelectedCat] = useState<string>(
    categories[0]?.id ?? '',
  )
  const [fileUrl, setFileUrl] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  // 기존 썸네일이 업로드 이미지라면 업로드 탭에서 바로 미리보기 보여주기
  useEffect(() => {
    if (isOpen) {
      if (currentSource === 'upload' && currentSrc) {
        setTab('upload')
        setFileUrl(currentSrc) // 선택된 업로드 이미지를 그대로 보여줌
      } else {
        setTab('theme')
        setFileUrl(null)
      }
    }
  }, [isOpen, currentSource, currentSrc])

  const actionLabel = useMemo(
    () => (hasThumbnail ? '변경하기' : '적용하기'),
    [hasThumbnail],
  )
  const currentImages = useMemo(
    () => categories.find((c) => c.id === selectedCat)?.images ?? [],
    [categories, selectedCat],
  )

  const openPicker = () => inputRef.current?.click()
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) return
    const url = URL.createObjectURL(f)
    setFileUrl(url)
  }

  // 모달 오픈 시 백그라운드 스크롤 잠금
  useEffect(() => {
    // 이전 값 저장
    const html = document.documentElement
    const prevHtmlOverflow = html.style.overflow
    const prevHtmlOverscroll = html.style.overscrollBehavior
    const prevBodyPaddingRight = document.body.style.paddingRight

    // 스크롤바 폭 계산(레이아웃 점프 방지용)
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth

    html.style.overflow = 'hidden'
    html.style.overscrollBehavior = 'contain' // 스크롤 체이닝 방지
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`
    }

    return () => {
      // 복원
      html.style.overflow = prevHtmlOverflow
      html.style.overscrollBehavior = prevHtmlOverscroll
      document.body.style.paddingRight = prevBodyPaddingRight
    }
  }, [])

  if (!isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] overscroll-contain"
      onClick={onClose}
    >
      {/* backdrop */}
      <div className="absolute inset-0 bg-dim" />

      {/* panel */}
      <div
        className="absolute left-1/2 top-1/2 w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-sm p-5 bg-fill-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* header */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-label-5 font-label-5 leading-label-5 tracking-label-5 text-text-default">
            커버 이미지 선택하기
          </h2>
          <button
            onClick={onClose}
            className="cursor-pointer hover:opacity-80"
            aria-label="닫기"
          >
            <CloseIcon className="w-[28px] fill-fill-deep" />
          </button>
        </div>

        {/* tabs */}
        <div className="pt-5 mb-6">
          <div className="grid grid-cols-2 border-b border-stroke-subtle">
            <button
              className={`-mb-px border-b-2 px-1 py-[6px] cursor-pointer ${
                tab === 'theme'
                  ? 'border-stroke-mint text-label-5 font-label-5 leading-label-5 tracking-label-5 text-text-primary'
                  : 'border-transparent text-label-2 font-label-2 leading-label-2 text-text-subtle hover:opacity-80'
              }`}
              onClick={() => setTab('theme')}
            >
              테마
            </button>
            <button
              className={`-mb-px border-b-2 px-1 py-[6px] cursor-pointer ${
                tab === 'upload'
                  ? 'border-stroke-mint text-label-5 font-label-5 leading-label-5 tracking-label-5 text-text-primary'
                  : 'border-transparent text-label-2 font-label-2 leading-label-2 text-text-subtle hover:opacity-80'
              }`}
              onClick={() => setTab('upload')}
            >
              업로드
            </button>
          </div>
        </div>

        {/* body */}
        <div className="mb-5">
          {/* THEME TAB */}
          {tab === 'theme' && (
            <div className="flex gap-6">
              {/* 좌측 카테고리 탭 */}
              <nav
                aria-label="테마 카테고리"
                className="w-40 shrink-0"
                role="tablist"
                aria-orientation="vertical"
              >
                <ul className="max-h-[440px] overflow-auto">
                  {categories.map((cat) => {
                    const active = selectedCat === cat.id
                    return (
                      <li key={cat.id}>
                        <button
                          role="tab"
                          aria-selected={active}
                          onClick={() => setSelectedCat(cat.id)}
                          className={`w-full rounded-r-md px-4 py-2 text-left text-label-7 font-label-7 leading-label-7 text-text-default transition cursor-pointer
                            ${active ? 'bg-fill-primary-subtle' : 'hover:bg-fill-subtle'}`}
                        >
                          {cat.name}
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </nav>

              {/* 우측 이미지 그리드 */}
              <div className="flex-1 h-[420px] overflow-auto pr-1">
                {currentImages.length > 0 ? (
                  <div className="flex flex-wrap gap-4">
                    {currentImages.map((img) => (
                      <ThemeTile
                        key={img.id}
                        img={img}
                        selected={
                          currentSource === 'theme' && currentSrc === img.src
                        }
                        onCancelSelected={() => {
                          onClear()
                        }}
                        onApply={() => {
                          onApply(img.src, 'theme')
                          onClose()
                        }}
                        ctaLabel={actionLabel}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="grid h-[420px] w-full place-items-center">
                    <p className="text-label-7 font-label-7 leading-label-7 text-text-default">
                      해당 카테고리의 이미지가 없습니다.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* UPLOAD TAB */}
          {tab === 'upload' && (
            <div className="h-[420px] flex flex-col items-center justify-center">
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onFileChange}
              />

              {!fileUrl ? (
                <>
                  <button
                    type="button"
                    onClick={openPicker}
                    className="cursor-pointer w-[320px] rounded-xs bg-fill-primary px-4 py-3 text-label-7 font-label-7 leading-label-7 text-text-default hover:opacity-80"
                  >
                    내 PC에서 찾기
                  </button>
                  <p className="mt-2 text-caption-3 font-caption-3 leading-caption-3 tracking-caption-3 text-text-subtle">
                    또는 파일을 여기로 드래그하세요.
                  </p>
                </>
              ) : (
                <>
                  {/* <img
                    src={fileUrl}
                    alt="미리보기"
                    className="mb-6 h-[270px] w-[360px] rounded-sm object-cover"
                  /> */}
                  <Image
                    src={fileUrl}
                    alt="미리보기"
                    width={90}
                    height={70}
                    className="mb-6 h-[270px] w-[360px] rounded-sm object-cover"
                  />

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => openPicker()}
                      className="cursor-pointer w-[120px] rounded-xs bg-fill-default px-4 py-2 text-label-7 font-label-7 leading-label-7 text-text-default hover:opacity-80"
                    >
                      다시 불러오기
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (fileUrl) {
                          onApply(fileUrl, 'upload')
                          onClose()
                        }
                      }}
                      className="cursor-pointer w-[120px] rounded-xs bg-fill-primary px-4 py-2 text-label-7 font-label-7 leading-label-7 text-text-default hover:opacity-80"
                    >
                      적용하기
                    </button>
                  </div>
                  <p className="mt-2 text-caption-3 font-caption-3 leading-caption-3 tracking-caption-3 text-text-subtle">
                    또는 파일을 여기로 드래그하세요.
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/** 테마 타일(호버 시 적용/변경 버튼 노출) */
function ThemeTile({
  img,
  ctaLabel,
  onApply,
  selected,
  onCancelSelected,
}: {
  img: ThemeImage
  ctaLabel: string
  onApply: () => void
  selected?: boolean
  onCancelSelected?: () => void
}) {
  return (
    <div
      className="group relative w-[260px] h-[195px] overflow-hidden rounded-sm
    border-2 border-transparent transition-colors
      hover:border-stroke-primary"
    >
      <Image
        src={img.src}
        alt={img.alt ?? ''}
        fill
        className="object-cover"
        sizes="260px"
      />

      {selected ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            type="button"
            onClick={onCancelSelected}
            className="w-[100px] rounded-xs bg-fill-primary px-4 py-2 text-label-7 font-label-7 leading-label-7 text-text-default shadow cursor-pointer hover:opacity-80"
          >
            취소하기
          </button>
        </div>
      ) : (
        <div className="pointer-events-none absolute inset-0 hidden items-center justify-center group-hover:flex">
          <button
            type="button"
            onClick={onApply}
            className="w-[100px] pointer-events-auto rounded-xs bg-fill-primary px-4 py-2 text-label-7 font-label-7 leading-label-7 text-text-default shadow cursor-pointer hover:opacity-80"
          >
            {ctaLabel}
          </button>
        </div>
      )}
    </div>
  )
}
