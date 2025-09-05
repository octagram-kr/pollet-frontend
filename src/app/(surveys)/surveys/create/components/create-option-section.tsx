import DirectCreateCard from './direct-card'
import TemplateCard from './template-card'
import ComingSoonCard from './coming-soon-card'

export default function CreateOptions({
  className = '',
}: {
  className?: string
}) {
  return (
    <div
      className={`grid gap-6 grid-cols-[0.8fr_1.2fr] auto-rows-[212px] ${className}`}
    >
      <div className="lg:row-span-2">
        <DirectCreateCard layout="tall" />
      </div>
      <TemplateCard layout="wide" />
      <ComingSoonCard layout="wide" />
    </div>
  )
}
