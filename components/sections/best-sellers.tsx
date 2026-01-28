'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FadeUp } from '@/components/ui/motion'
import { ProductCard, MinimalProductCard } from '@/components/ui/product-card'
import type { Product } from '@/types'

interface BestSellersSectionProps {
  products: Product[]
}

export function BestSellersSection({ products }: BestSellersSectionProps) {
  return (
    <section className="py-32 md:py-40 bg-ivory">
      <div className="container-luxury">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-20">
          <div>
            <FadeUp>
              <span className="text-xs tracking-[0.3em] uppercase text-gold mb-4 block">
                Best Sellers
              </span>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="text-display-md font-serif text-ink">
                Most <span className="text-gradient-gold">Loved</span>
              </h2>
            </FadeUp>
          </div>
          <FadeUp delay={0.2}>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm font-display tracking-wider uppercase text-cocoa hover:text-gold transition-colors duration-300 group"
            >
              <span>View All Products</span>
              <motion.span
                className="inline-block"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.3 }}
              >
                →
              </motion.span>
            </Link>
          </FadeUp>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {products.slice(0, 6).map((product, index) => (
              <ProductCard
                key={product._id}
                product={product}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center text-gold mx-auto mb-4">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M4 10L16 4L28 10V22L16 28L4 22V10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <p className="text-muted mb-2">No products available yet</p>
            <p className="text-sm text-muted/60">Our collection is being curated. Check back soon!</p>
          </div>
        )}
      </div>
    </section>
  )
}

// Alternative: Horizontal scroll gallery
export function BestSellersGallery({ products }: BestSellersSectionProps) {
  return (
    <section className="py-32 md:py-40 bg-ivory overflow-hidden">
      <div className="container-luxury mb-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <FadeUp>
              <span className="text-xs tracking-[0.3em] uppercase text-gold mb-4 block">
                Best Sellers
              </span>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="text-display-md font-serif text-ink">
                Most <span className="text-gradient-gold">Loved</span>
              </h2>
            </FadeUp>
          </div>
        </div>
      </div>

      {/* Horizontal scroll */}
      {products.length > 0 ? (
        <div className="relative">
          <div className="flex gap-6 overflow-x-auto pb-8 px-6 md:px-12 no-scrollbar snap-x snap-mandatory">
            {products.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex-shrink-0 w-[280px] md:w-[320px] snap-start"
              >
                <MinimalProductCard product={product} />
              </motion.div>
            ))}
          </div>

          {/* Gradient fades */}
          <div className="absolute left-0 top-0 bottom-8 w-12 bg-gradient-to-r from-ivory to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-8 w-12 bg-gradient-to-l from-ivory to-transparent pointer-events-none" />
        </div>
      ) : (
        <div className="container-luxury text-center py-12">
          <p className="text-muted">No products available yet</p>
        </div>
      )}
    </section>
  )
}
