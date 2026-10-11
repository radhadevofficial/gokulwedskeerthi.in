import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://gokulwedskeerthi.in'),
  title: 'Gokulakannan & Keerthika | Wedding Invitation',
  description: 'A warm invitation to celebrate the wedding of Gokulakannan and Keerthika on Sunday, 25 October 2026.',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Gokulakannan & Keerthika | Wedding Invitation',
    description: 'Join Gokulakannan and Keerthika as they begin their forever together.',
    url: 'https://gokulwedskeerthi.in',
    siteName: 'Gokulakannan & Keerthika',
    type: 'website',
    images: [{ url: '/images/hero-port-v2.jpg', alt: 'Gokulakannan and Keerthika wedding invitation' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gokulakannan & Keerthika | Wedding Invitation',
    description: 'Join Gokulakannan and Keerthika as they begin their forever together.',
    images: ['/images/hero-port-v2.jpg'],
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
