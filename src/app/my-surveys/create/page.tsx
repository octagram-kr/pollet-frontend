import SectionHeader from './components/section-header'
import CreateOptions from './components/create-option-section'

export default function Page() {
  return (
    <main className="bg-gray-10">
      <section className="mx-auto flex min-h-[calc(100vh-280px)] max-w-5xl items-center justify-center px-16">
        <div className="w-full">
          <SectionHeader
            title="설문조사 만들기"
            description="원하는 방식을 선택하여 설문조사 제작을 시작해보세요"
          />

          <CreateOptions className="mt-6" />
        </div>
      </section>
    </main>
  )
}
