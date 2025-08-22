import type { Metadata } from 'next'
import { Providers } from './provider'

export const metadata: Metadata = {
  title: 'USPS Shipping Label Generator',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
