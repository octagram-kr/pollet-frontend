import './globals.css'
import { ReactNode } from 'react'
import { Metadata } from 'next/types'
import SiteHeader from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export const metadata: Metadata = {
  title: 'Pollet',
  description: 'goorm-deepdive: Final Team Project',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://fastly.jsdelivr.net/gh/wanteddev/wanted-sans@v1.0.1/packages/wanted-sans/fonts/webfonts/variable/split/WantedSansVariable.min.css"
        />
      </head>
      <body className="font-sans bg-bg-white text-text-default">
        <div className="min-h-screen flex flex-col">
          <SiteHeader />
          <div className="flex-1 min-w-0">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  )
}
