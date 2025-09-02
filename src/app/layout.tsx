import './globals.css'
import { ReactNode } from 'react'
import { Metadata } from 'next/types'

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
      <body>
        <main className="font-sans min-h-screen min-w-lg bg-white text-gray-900">
          {children}
        </main>
      </body>
    </html>
  )
}
