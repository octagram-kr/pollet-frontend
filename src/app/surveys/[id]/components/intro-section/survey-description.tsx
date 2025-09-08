export default function SurveyDescription({ text }: { text: string }) {
  return (
    <div className="prose prose-sm mt-5 whitespace-pre-line text-gray-700">
      {text}
    </div>
  )
}
