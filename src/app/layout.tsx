import './globals.css'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className="flex min-h-screen flex-col bg-gray-50">
        <Header />
        <main className="flex-1 px-6 py-8">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
