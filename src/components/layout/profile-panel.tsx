'use client'
import { useEffect, useRef } from 'react'
// import { X, User } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { CloseIcon } from '../icons'

interface Props {
  open: boolean
  onClose: () => void
  isAuthed: boolean
}

export default function ProfilePanel({ open, onClose, isAuthed }: Props) {
  const router = useRouter()
  const panelRef = useRef<HTMLDivElement | null>(null)

  const go = (path: string) => {
    onClose()
    router.push(path)
  }

  const logout = () => {
    // TODO: 실제 로그아웃 로직으로 교체 (예: next-auth signOut())
    onClose()
    router.push('/')
  }

  // ESC 닫기 + 스크롤 락 + 포커스 이동
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (open) {
      window.addEventListener('keydown', onKey)
      const prev = document.documentElement.style.overflow
      document.documentElement.style.overflow = 'hidden'
      // 첫 포커스 버튼으로 이동
      setTimeout(() => {
        const el =
          panelRef.current?.querySelector<HTMLButtonElement>('button, a')
        el?.focus()
      }, 0)
      return () => {
        window.removeEventListener('keydown', onKey)
        document.documentElement.style.overflow = prev
      }
    }
  }, [open, onClose])

  return (
    <>
      {/* 오버레이 */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-200 ${
          open
            ? 'opacity-100 pointer-events-auto bg-dim'
            : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden
      />

      {/* 패널 */}
      <aside
        ref={panelRef}
        className={`fixed right-0 top-0 z-50 h-dvh w-80 max-w-[90vw] bg-gray-50 shadow-2xl flex flex-col transform transition-transform duration-300 ease-out will-change-transform
          ${open ? 'translate-x-0' : 'translate-x-full'}`}
        role="dialog"
        aria-modal="true"
        aria-label="프로필 메뉴"
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between px-5 h-[70px] border-b border-stroke-default">
          <div className="flex items-center gap-2 text-text-default">
            <span className="font-medium">
              {isAuthed ? '내 계정' : '시작하기'}
            </span>
          </div>
          <button
            aria-label="닫기"
            onClick={onClose}
            className="p-2 rounded hover:bg-gray-100"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="p-5 space-y-3">
          {isAuthed ? (
            <>
              <button
                onClick={() => go('/my-page')}
                className="cursor-pointer w-full rounded-sm border border-stroke-subtle bg-fill-subtle text-text-default px-4 py-3 hover:bg-gray-100"
              >
                마이페이지
              </button>
              <button
                onClick={logout}
                className="cursor-pointer w-full rounded-sm bg-fill-primary text-text-default px-4 py-3 hover:bg-fill-primary-active"
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => go('/auth/login')}
                className="cursor-pointer w-full rounded-sm bg-fill-primary text-text-default px-4 py-3 hover:opacity-90"
              >
                로그인
              </button>
              <button
                onClick={() => go('/auth/login')}
                className="cursor-pointer w-full rounded-sm border border-stroke-subtle bg-fill-subtle text-text-default px-4 py-3 hover:bg-gray-100"
              >
                회원가입
              </button>
            </>
          )}
        </div>
      </aside>
    </>
  )
}
