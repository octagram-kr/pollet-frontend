import { notFound } from 'next/navigation'
import { fetchSurveyById } from '@/lib/fetch-survey'
import SurveyDetailPage from '@/app/surveys/[id]/components/survey-detail-page'

type Props = { params: Promise<{ id: string }> }

export const revalidate = 60 // SSG + ISR 예시

export default async function Page({ params }: Props) {
  const resolvedParams = await params
  const survey = await fetchSurveyById(resolvedParams.id)
  if (!survey) return notFound()

  return <SurveyDetailPage survey={survey} />
}
