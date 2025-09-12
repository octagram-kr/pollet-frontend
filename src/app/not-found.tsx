import Link from 'next/link'
export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-label-3 font-label-3 leading-label-3 text-text-strong">
          추후 업데이트 예정입니다
        </h1>
        <p className="mt-1 text-caption-3 font-caption-3 leading-caption-3 tracking-caption-3 text-text-subtle">
          요청한 리소스가 존재하지 않습니다.
        </p>
        <Link
          href="/"
          className="w-[336px] mt-6 inline-block rounded-xs bg-fill-primary px-4 py-3 text-label-4 font-label-4 leading-label-4 text-text-default"
        >
          홈으로
        </Link>
      </div>
    </main>
  )
}
