import SiteHeader from '@/components/layout/site-header'

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>{children}</main>
    </div>
  )
}
