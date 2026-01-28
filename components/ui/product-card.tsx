'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { cn, formatPrice } from '@/lib/utils'
import { MagneticCard } from './magnetic-card'
import type { Product } from '@/types'

interface ProductCardProps {
  product: Product
  index?: number
  variant?: 'default' | 'featured' | 'minimal'
  className?: string
}

export function ProductCard({
  product,
  index = 0,
  variant = 'default',
  className,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  
  const minPrice = Math.min(...product.prices.map((p) => p.price))
  const maxPrice = Math.max(...product.prices.map((p) => p.price))
  const priceDisplay = minPrice === maxPrice 
    ? formatPrice(minPrice)
    : `${formatPrice(minPrice)} – ${formatPrice(maxPrice)}`

  return (
    <MagneticCard strength={0.05} className={className}>
      <Link href={`/products/${product.slug}`}>
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{
            duration: 0.8,
            delay: (index % 4) * 0.1,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={cn(
            'group relative overflow-hidden rounded-2xl bg-ivory aspect-[3/4]',
            variant === 'featured' && 'aspect-[4/5]',
            variant === 'minimal' && 'aspect-square'
          )}
        >
          {/* Image */}
          <div className="absolute inset-0">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className={cn(
                'object-cover transition-transform duration-700 ease-luxury',
                isHovered && 'scale-105'
              )}
            />
            
            {/* Gradient overlay - stronger for better text visibility */}
            <div 
              className={cn(
                'absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/30 to-transparent',
                'transition-opacity duration-500',
                isHovered ? 'opacity-100' : 'opacity-90'
              )}
            />
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-6">
            {/* Category - badge style for better visibility */}
            <motion.span
              initial={false}
              animate={{ 
                y: isHovered ? -4 : 0 
              }}
              transition={{ duration: 0.3 }}
              className="inline-block w-fit px-3 py-1 text-xs tracking-[0.15em] uppercase bg-gold/90 text-ink font-semibold mb-3 rounded-full"
            >
              {product.category}
            </motion.span>

            {/* Name */}
            <h3 className="text-xl md:text-2xl font-serif text-parchment leading-tight mb-2 drop-shadow-md">
              {product.name}
            </h3>

            {/* Price - always visible */}
            <motion.div
              initial={false}
              animate={{ 
                opacity: isHovered ? 1 : 0.9,
                y: isHovered ? 0 : 0 
              }}
              transition={{ duration: 0.3, delay: 0.05 }}
              className="flex items-center gap-3"
            >
              <span className="font-display text-parchment font-semibold tracking-wide drop-shadow-sm">
                {priceDisplay}
              </span>
              <motion.span 
                initial={false}
                animate={{ opacity: isHovered ? 1 : 0 }}
                className="flex items-center gap-1 text-xs text-parchment/80"
              >
                View
                <motion.span
                  initial={false}
                  animate={{ x: isHovered ? 4 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  →
                </motion.span>
              </motion.span>
            </motion.div>
          </div>

          {/* Featured badge */}
          {product.featured && (
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1 text-xs tracking-wider uppercase bg-gold/90 text-parchment rounded-full">
                Featured
              </span>
            </div>
          )}
        </motion.article>
      </Link>
    </MagneticCard>
  )
}

// Featured Product Card - Larger, more prominent
interface FeaturedProductCardProps {
  product: Product
  className?: string
}

export function FeaturedProductCard({ product, className }: FeaturedProductCardProps) {
  return (
    <ProductCard
      product={product}
      variant="featured"
      className={cn('md:col-span-2', className)}
    />
  )
}

// Minimal Product Card - For smaller grids
interface MinimalProductCardProps {
  product: Product
  className?: string
}

export function MinimalProductCard({ product, className }: MinimalProductCardProps) {
  const minPrice = Math.min(...product.prices.map((p) => p.price))

  return (
    <Link href={`/products/${product.slug}`} className={className}>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3 }}
        className="group"
      >
        <div className="relative aspect-square rounded-xl overflow-hidden bg-ivory mb-4">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <h4 className="font-serif text-lg text-ink mb-1 group-hover:text-cocoa transition-colors duration-300">
          {product.name}
        </h4>
        <p className="font-display text-sm text-gold">
          From {formatPrice(minPrice)}
        </p>
      </motion.div>
    </Link>
  )
}

