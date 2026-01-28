'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { cn, getInitials } from '@/lib/utils'

const navItems = [
  {
    name: 'Dashboard',
    href: '/admin',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="2" y="11" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="11" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="11" y="11" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    name: 'Products',
    href: '/admin/products',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M2.5 5.833L10 2.5L17.5 5.833V14.167L10 17.5L2.5 14.167V5.833Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 9.167V17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2.5 5.833L10 9.167L17.5 5.833" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    name: 'Categories',
    href: '/admin/categories',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M3.333 5H16.667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M3.333 10H16.667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M3.333 15H16.667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: 'Settings',
    href: '/admin/settings',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M10 2.5V4.167M10 15.833V17.5M17.5 10H15.833M4.167 10H2.5M15.303 4.697L14.125 5.875M5.875 14.125L4.697 15.303M15.303 15.303L14.125 14.125M5.875 5.875L4.697 4.697" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()

  return (
    <aside className="w-64 min-h-screen flex flex-col">
      {/* Glass panel sidebar */}
      <div className="m-4 flex-1 flex flex-col rounded-3xl overflow-hidden glass-panel">
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <Link href="/admin" className="flex flex-col">
            <span className="text-xl font-serif tracking-wider text-ink">
              NAWAB
            </span>
            <span className="text-xs tracking-[0.3em] text-gold uppercase -mt-0.5">
              KHANA
            </span>
          </Link>
          <span className="text-xs text-muted mt-2 block">Admin Panel</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || 
                (item.href !== '/admin' && pathname.startsWith(item.href))
              
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-xl',
                      'text-sm font-display tracking-wide',
                      'transition-all duration-300 ease-luxury',
                      'relative overflow-hidden',
                      isActive
                        ? 'bg-cocoa text-parchment'
                        : 'text-ink/70 hover:bg-cocoa/10 hover:text-ink'
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="sidebar-active"
                        className="absolute inset-0 bg-cocoa rounded-xl"
                        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                      />
                    )}
                    <span className="relative z-10">{item.icon}</span>
                    <span className="relative z-10">{item.name}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* User section */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold font-medium">
              {session?.user?.name ? getInitials(session.user.name) : 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-ink truncate">
                {session?.user?.name || 'Admin'}
              </p>
              <p className="text-xs text-muted truncate">
                {session?.user?.email || 'admin@nawabkhana.com'}
              </p>
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/admin/login' })}
            className="w-full mt-2 px-4 py-2 text-sm text-muted hover:text-ink hover:bg-cocoa/10 rounded-lg transition-colors duration-300"
          >
            Sign Out
          </button>
        </div>
      </div>
    </aside>
  )
}

