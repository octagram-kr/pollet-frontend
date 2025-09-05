import SiteHeader from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
