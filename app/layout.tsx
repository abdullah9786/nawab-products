import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter, DM_Sans } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://nawabkhana.com'),
  title: {
    default: 'NAWAB KHANA | Luxury Dry Fruits & Masalas',
    template: '%s | NAWAB KHANA',
  },
  description: 'Experience the finest collection of premium dry fruits and artisanal masalas. Pure ingredients, royal traditions — from heritage kitchens to modern homes.',
  keywords: ['dry fruits', 'masalas', 'premium spices', 'luxury food', 'Indian heritage', 'artisanal', 'gourmet'],
  authors: [{ name: 'NAWAB KHANA' }],
  creator: 'NAWAB KHANA',
  publisher: 'NAWAB KHANA',
  formatDetection: {
    email: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://nawabkhana.com',
    siteName: 'NAWAB KHANA',
    title: 'NAWAB KHANA | Luxury Dry Fruits & Masalas',
    description: 'Experience the finest collection of premium dry fruits and artisanal masalas.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'NAWAB KHANA - Luxury Dry Fruits & Masalas',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NAWAB KHANA | Luxury Dry Fruits & Masalas',
    description: 'Experience the finest collection of premium dry fruits and artisanal masalas.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport: Viewport = {
  themeColor: '#FBF8F3',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="en" 
      className={`${playfair.variable} ${inter.variable} ${dmSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="min-h-screen">
        {/* Grain texture overlay */}
        <div className="grain-overlay" aria-hidden="true" />
        
        {children}
      </body>
    </html>
  )
}

