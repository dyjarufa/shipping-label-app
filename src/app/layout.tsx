import type { Metadata } from 'next';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Providers } from './provider';

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
        <ToastContainer position="top-right" autoClose={5000} />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
