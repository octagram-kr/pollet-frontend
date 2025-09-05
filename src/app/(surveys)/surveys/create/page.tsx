import SectionHeader from './components/section-header'
import CreateOptions from './components/create-option-section'

export default function Page() {
  return (
    <main className="h-screen bg-gray-10">
      <section className="mx-auto max-w-5xl px-4 py-10">
        <div className="mt-8">
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
