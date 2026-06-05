import type { Metadata } from 'next'
import { Space_Grotesk, Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { GoogleAnalytics } from '@next/third-parties/google'
import Header from '@/components/header'
import AuthProvider from '@/components/session-provider'
import { Stethoscope } from 'lucide-react'

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  weight: ['400', '700']
})

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'SSVproff - Профессиональный хирургический журнал',
  description: 'Ваш навигатор в мировой хирургии. Научные исследования, клиническая практика, технологии и инновации.',
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'http://localhost:3000'),
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  openGraph: {
    title: 'SSVproff - Профессиональный хирургический журнал',
    description: 'Ваш навигатор в мировой хирургии',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" suppressHydrationWarning className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        <AuthProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Header />

          {/* Main Content */}
          <main className="min-h-screen">
            {children}
          </main>

          {/* Google Analytics */}
          {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
            <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
          )}

          {/* Footer */}
          <footer className="border-t border-gray-200 bg-[#f8f9fa] py-12 mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <div className="flex items-center space-x-2">
                  <Stethoscope className="h-6 w-6 text-[#1a73e8]" />
                  <div className="flex items-baseline">
                    <span className="text-xl font-bold text-[#1a73e8]" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                      SSV
                    </span>
                    <span className="text-lg text-[#202124]" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                      proff
                    </span>
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <p className="text-sm text-gray-600">
                    © 2025 SSVproff. Все права защищены.
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Контакт: <a href="mailto:ssvnauka@gmail.com" className="text-[#1a73e8] hover:underline">ssvnauka@gmail.com</a>
                  </p>
                </div>
              </div>
            </div>
          </footer>
        </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
