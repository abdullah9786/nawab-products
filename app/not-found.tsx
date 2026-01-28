'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Navigation, Footer } from '@/components/ui'

export default function NotFound() {
  return (
    <>
      <Navigation />
      
      <main className="min-h-screen flex items-center justify-center bg-parchment px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-lg"
        >
          {/* 404 Number */}
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[180px] md:text-[240px] font-serif text-gold/20 leading-none block"
          >
            404
          </motion.span>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="-mt-16 md:-mt-24"
          >
            <h1 className="text-display-md font-serif text-ink mb-4">
              Page Not Found
            </h1>
            <p className="text-muted mb-8">
              The page you&apos;re looking for seems to have wandered off. 
              Perhaps it&apos;s exploring our spice gardens.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/" className="btn-elegant">
                <span>Return Home</span>
              </Link>
              <Link href="/products" className="btn-elegant-outline">
                <span>Browse Collection</span>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </main>
      
      <Footer />
    </>
  )
}

