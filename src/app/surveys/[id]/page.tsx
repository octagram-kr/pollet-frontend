// app/surveys/[id]/page.tsx
import { notFound } from 'next/navigation'
import { fetchSurveyById } from '@/lib/fetch-survey'
import SurveyDetailPage from '@/app/surveys/[id]/components/survey-detail-page'

type Props = { params: { id: string } }

export const revalidate = 60 // SSG + ISR 예시

export default async function Page({ params }: Props) {
  const survey = await fetchSurveyById(params.id)
  if (!survey) return notFound()

  return <SurveyDetailPage survey={survey} />
}
