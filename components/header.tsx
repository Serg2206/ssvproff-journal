'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { Stethoscope, Menu, X, LogIn, LogOut, Settings } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Главная' },
  { href: '/archive', label: 'Архив' },
  { href: '/for-authors', label: 'Для авторов' },
  { href: '/for-reviewers', label: 'Для рецензентов' },
  { href: '/ai-policy', label: 'Политика ИИ' },
  { href: '/editor-profile', label: 'Редактор' },
  { href: '/about', label: 'О журнале' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const { data: session } = useSession()
  const isAdmin = (session?.user as any)?.role === 'admin'

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Stethoscope className="h-8 w-8 text-[#1a73e8]" />
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-[#1a73e8]" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                SSV
              </span>
              <span className="text-xl text-[#202124]" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                proff
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === href
                    ? 'text-[#1a73e8] bg-[#e8f0fe]'
                    : 'text-[#202124] hover:bg-[#f8f9fa]'
                }`}
              >
                {label}
              </Link>
            ))}

            <div className="ml-2 pl-2 border-l border-gray-200 flex items-center space-x-1">
              {session ? (
                <>
                  {isAdmin && (
                    <Link
                      href="/admin"
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        pathname.startsWith('/admin')
                          ? 'text-[#1a73e8] bg-[#e8f0fe]'
                          : 'text-[#202124] hover:bg-[#f8f9fa]'
                      }`}
                    >
                      <Settings className="h-4 w-4 inline mr-1" />
                      Админ
                    </Link>
                  )}
                  <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-[#f8f9fa] transition-colors flex items-center space-x-1"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Выйти</span>
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-md text-sm font-medium bg-[#1a73e8] text-white hover:bg-[#1557b0] transition-colors flex items-center space-x-1"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Войти</span>
                </Link>
              )}
            </div>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-md text-[#202124] hover:bg-[#f8f9fa] transition-colors"
            aria-label="Меню"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <nav className="max-w-7xl mx-auto px-4 py-3 space-y-1">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                  pathname === href
                    ? 'text-[#1a73e8] bg-[#e8f0fe]'
                    : 'text-[#202124] hover:bg-[#f8f9fa]'
                }`}
              >
                {label}
              </Link>
            ))}
            <div className="border-t border-gray-200 pt-2 mt-2">
              {session ? (
                <>
                  {isAdmin && (
                    <Link
                      href="/admin"
                      onClick={() => setMobileOpen(false)}
                      className="block px-4 py-3 rounded-md text-sm font-medium text-[#202124] hover:bg-[#f8f9fa]"
                    >
                      <Settings className="h-4 w-4 inline mr-2" />
                      Админ-панель
                    </Link>
                  )}
                  <button
                    onClick={() => { setMobileOpen(false); signOut({ callbackUrl: '/' }) }}
                    className="block w-full text-left px-4 py-3 rounded-md text-sm font-medium text-gray-600 hover:bg-[#f8f9fa]"
                  >
                    <LogOut className="h-4 w-4 inline mr-2" />
                    Выйти ({session.user?.name})
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 rounded-md text-sm font-medium text-[#1a73e8] bg-[#e8f0fe]"
                >
                  <LogIn className="h-4 w-4 inline mr-2" />
                  Войти
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
