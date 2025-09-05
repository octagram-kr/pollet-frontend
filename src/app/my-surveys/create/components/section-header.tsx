import Title from './title'
import Description from './description'

export default function SectionHeader({
  title,
  description,
}: {
  title: string
  description?: string
}) {
  return (
    <div className="space-y-1">
      <Title>{title}</Title>
      {description ? <Description>{description}</Description> : null}
    </div>
  )
}
