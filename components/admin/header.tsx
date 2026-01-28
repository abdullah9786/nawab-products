'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// Map paths to page titles
const pageTitles: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/products': 'Products',
  '/admin/products/new': 'New Product',
  '/admin/categories': 'Categories',
  '/admin/orders': 'Orders',
  '/admin/settings': 'Settings',
}

export function AdminHeader() {
  const pathname = usePathname()
  
  // Get page title
  let pageTitle = pageTitles[pathname] || 'Admin'
  
  // Handle dynamic routes
  if (pathname.startsWith('/admin/products/') && pathname !== '/admin/products/new') {
    pageTitle = 'Edit Product'
  }

  return (
    <header className="px-6 lg:px-8 py-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        {/* Page title & breadcrumb */}
        <div>
          <div className="flex items-center gap-2 text-xs text-parchment/60 mb-1">
            <Link href="/admin" className="hover:text-parchment/80 transition-colors">
              Admin
            </Link>
            {pathname !== '/admin' && (
              <>
                <span>/</span>
                <span className="text-gold">{pageTitle}</span>
              </>
            )}
          </div>
          <h1 className="text-2xl font-serif text-parchment">
            {pageTitle}
          </h1>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* View site button */}
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 px-4 py-2 text-sm text-parchment/70 hover:text-parchment transition-colors duration-300"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 2H3C2.44772 2 2 2.44772 2 3V13C2 13.5523 2.44772 14 3 14H13C13.5523 14 14 13.5523 14 13V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M9 2H14V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 2L7 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            View Site
          </Link>

          {/* Quick actions based on page */}
          {pathname === '/admin/products' && (
            <Link
              href="/admin/products/new"
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-display tracking-wide bg-gold text-cocoa rounded-full hover:bg-gold-light transition-colors duration-300"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              New Product
            </Link>
          )}

          {pathname === '/admin/categories' && (
            <button className="flex items-center gap-2 px-5 py-2.5 text-sm font-display tracking-wide bg-gold text-cocoa rounded-full hover:bg-gold-light transition-colors duration-300">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              New Category
            </button>
          )}
        </div>
      </motion.div>
    </header>
  )
}

