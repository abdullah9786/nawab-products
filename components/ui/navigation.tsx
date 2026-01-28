'use client'

import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface Category {
  _id: string
  name: string
  slug: string
}

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/about', label: 'Our Story' },
  { href: '/contact', label: 'Contact' },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  
  const { scrollY } = useScroll()
  const headerOpacity = useTransform(scrollY, [0, 100], [0, 1])
  const headerBlur = useTransform(scrollY, [0, 100], [0, 20])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/categories')
        const data = await res.json()
        if (data.success) {
          setCategories(data.data || [])
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error)
      }
    }
    fetchCategories()
  }, [])

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-50',
          'transition-colors duration-500'
        )}
        style={{
          backgroundColor: isScrolled ? 'rgba(251, 248, 243, 0.9)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(20px)' : 'none',
        }}
      >
        <nav className="container-luxury">
          <div className="flex items-center justify-between h-20 md:h-24">
            {/* Logo */}
            <Link
              href="/"
              className="relative z-10"
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex flex-col"
              >
                <span className="text-xl md:text-2xl font-serif tracking-wider text-ink">
                  NAWAB
                </span>
                <span className="text-xs tracking-[0.3em] text-gold uppercase -mt-1">
                  KHANA
                </span>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden md:flex items-center gap-10"
            >
              {navLinks.slice(0, 2).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group relative text-sm font-display tracking-wider uppercase text-ink/80 hover:text-ink transition-colors duration-300"
                >
                  {link.label}
                  <span className="absolute left-0 -bottom-1 w-full h-px bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </Link>
              ))}

              {/* Categories Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setIsCategoryOpen(true)}
                onMouseLeave={() => setIsCategoryOpen(false)}
              >
                <button className="group relative text-sm font-display tracking-wider uppercase text-ink/80 hover:text-ink transition-colors duration-300 flex items-center gap-1">
                  Categories
                  <motion.svg 
                    width="12" 
                    height="12" 
                    viewBox="0 0 12 12" 
                    fill="none"
                    animate={{ rotate: isCategoryOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </motion.svg>
                  <span className="absolute left-0 -bottom-1 w-full h-px bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </button>

                <AnimatePresence>
                  {isCategoryOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 pt-4"
                    >
                      <div className="bg-parchment/95 backdrop-blur-xl rounded-2xl shadow-lg border border-gold/10 py-3 min-w-[200px]">
                        {categories.length > 0 ? (
                          categories.map((category) => (
                            <Link
                              key={category._id}
                              href={`/products?category=${category.slug}`}
                              className="block px-5 py-2.5 text-sm text-ink/70 hover:text-ink hover:bg-gold/10 transition-colors duration-200"
                            >
                              {category.name}
                            </Link>
                          ))
                        ) : (
                          <span className="block px-5 py-2.5 text-sm text-ink/50">
                            No categories yet
                          </span>
                        )}
                        <div className="border-t border-gold/10 mt-2 pt-2">
                          <Link
                            href="/products"
                            className="block px-5 py-2.5 text-sm font-medium text-gold hover:text-gold-dark transition-colors duration-200"
                          >
                            View All Products
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {navLinks.slice(2).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group relative text-sm font-display tracking-wider uppercase text-ink/80 hover:text-ink transition-colors duration-300"
                >
                  {link.label}
                  <span className="absolute left-0 -bottom-1 w-full h-px bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </Link>
              ))}
            </motion.div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative z-10 md:hidden w-10 h-10 flex items-center justify-center"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              <div className="w-6 h-4 relative flex flex-col justify-between">
                <motion.span
                  animate={{
                    rotate: isOpen ? 45 : 0,
                    y: isOpen ? 6 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-0.5 bg-ink origin-left"
                />
                <motion.span
                  animate={{ opacity: isOpen ? 0 : 1 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-0.5 bg-ink"
                />
                <motion.span
                  animate={{
                    rotate: isOpen ? -45 : 0,
                    y: isOpen ? -6 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-0.5 bg-ink origin-left"
                />
              </div>
            </button>
          </div>
        </nav>

        {/* Scroll indicator line */}
        <motion.div
          className="absolute bottom-0 left-0 h-px bg-gold/30"
          style={{
            width: '100%',
            scaleX: headerOpacity,
            transformOrigin: 'left',
          }}
        />
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-parchment/95 backdrop-blur-lg"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Content */}
            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="relative z-10 flex flex-col items-center justify-center min-h-screen gap-6"
            >
              {navLinks.slice(0, 2).map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-3xl font-serif tracking-wide text-ink hover:text-gold transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {/* Categories in Mobile */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="flex flex-col items-center gap-3"
              >
                <span className="text-3xl font-serif tracking-wide text-ink">Categories</span>
                <div className="flex flex-wrap justify-center gap-2 mt-2">
                  {categories.map((category) => (
                    <Link
                      key={category._id}
                      href={`/products?category=${category.slug}`}
                      onClick={() => setIsOpen(false)}
                      className="px-4 py-2 text-sm bg-gold/10 rounded-full text-ink hover:bg-gold/20 transition-colors duration-200"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </motion.div>

              {navLinks.slice(2).map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: 0.25 + index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-3xl font-serif tracking-wide text-ink hover:text-gold transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// Footer Component
export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-cocoa text-parchment/80">
      {/* Main Footer */}
      <div className="container-luxury py-20 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex flex-col">
              <span className="text-3xl font-serif tracking-wider text-parchment">
                NAWAB
              </span>
              <span className="text-sm tracking-[0.3em] text-gold uppercase">
                KHANA
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-sm text-parchment/60">
              Pure ingredients, royal traditions. From heritage kitchens to modern homes, 
              we bring you the finest selection of dry fruits and artisanal masalas.
            </p>
          </div>

          {/* Links */}
          <div className="md:col-span-3 md:col-start-7">
            <h4 className="text-xs tracking-[0.2em] uppercase text-gold mb-6">
              Explore
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-parchment/60 hover:text-parchment transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <h4 className="text-xs tracking-[0.2em] uppercase text-gold mb-6">
              Connect
            </h4>
            <ul className="space-y-3 text-sm text-parchment/60">
              <li>
                <a
                  href="mailto:hello@nawabkhana.com"
                  className="hover:text-parchment transition-colors duration-300"
                >
                  hello@nawabkhana.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+919323379975"
                  className="hover:text-parchment transition-colors duration-300"
                >
                  +91 93233 79975
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-parchment/10">
        <div className="container-luxury py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-parchment/40">
          <p>© {currentYear} Nawab Khana. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Crafted with <span className="text-gold">♦</span> for connoisseurs
          </p>
        </div>
      </div>
    </footer>
  )
}

