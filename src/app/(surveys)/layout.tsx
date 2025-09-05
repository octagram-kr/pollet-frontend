import SurveysHeader from '@/components/layout/surveys-header'

export default function SurveysLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      <SurveysHeader />
      <main>{children}</main>
    </div>
  )
}
