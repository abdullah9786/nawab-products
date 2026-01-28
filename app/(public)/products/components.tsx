'use client'

import { motion } from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'
import { FadeUp, StaggerContainer, StaggerItem } from '@/components/ui/motion'
import { ProductCard } from '@/components/ui/product-card'
import { cn } from '@/lib/utils'
import type { Product } from '@/types'

interface CategoryData {
  _id: string
  name: string
  slug: string
}

const sortOptions = [
  { id: 'featured', name: 'Featured' },
  { id: 'newest', name: 'Newest' },
  { id: 'price-asc', name: 'Price: Low to High' },
  { id: 'price-desc', name: 'Price: High to Low' },
]

// Header component
export function ProductsHeader() {
  return (
    <section className="container-luxury py-16 md:py-20">
      <FadeUp>
        <span className="text-xs tracking-[0.3em] uppercase text-gold mb-4 block">
          Our Collection
        </span>
      </FadeUp>
      <FadeUp delay={0.1}>
        <h1 className="text-display-lg font-serif text-ink mb-4">
          Curated <span className="text-gradient-gold">Excellence</span>
        </h1>
      </FadeUp>
      <FadeUp delay={0.2}>
        <p className="text-muted max-w-xl">
          Each product in our collection is sourced from heritage regions, 
          crafted with tradition, and delivered with care.
        </p>
      </FadeUp>
    </section>
  )
}

// Filter component
interface ProductsFilterProps {
  currentCategory?: string
  currentSort?: string
  categories?: CategoryData[]
}

export function ProductsFilter({ currentCategory, currentSort, categories = [] }: ProductsFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Build filter options with "All Products" at the beginning
  const filterCategories = [
    { id: 'all', name: 'All Products', slug: 'all' },
    ...categories.map(cat => ({ id: cat.slug, name: cat.name, slug: cat.slug }))
  ]

  const handleCategoryChange = (categorySlug: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (categorySlug === 'all') {
      params.delete('category')
    } else {
      params.set('category', categorySlug)
    }
    router.push(`/products?${params.toString()}`)
  }

  const handleSortChange = (sortId: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('sort', sortId)
    router.push(`/products?${params.toString()}`)
  }

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {filterCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryChange(category.slug)}
            className={cn(
              'px-4 py-2 text-sm font-display tracking-wide rounded-full',
              'transition-all duration-300 ease-luxury',
              'border',
              (currentCategory === category.slug || (!currentCategory && category.slug === 'all'))
                ? 'bg-cocoa text-parchment border-cocoa'
                : 'bg-transparent text-muted border-cocoa/20 hover:border-gold/50 hover:text-cocoa'
            )}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Sort */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted">Sort by:</span>
        <select
          value={currentSort || 'featured'}
          onChange={(e) => handleSortChange(e.target.value)}
          className="px-4 py-2 text-sm font-display bg-transparent border border-cocoa/20 rounded-full text-ink cursor-pointer focus:outline-none focus:border-gold transition-colors duration-300"
        >
          {sortOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

// Products Grid component
interface ProductsGridProps {
  products: Product[]
}

export function ProductsGrid({ products }: ProductsGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center text-gold mx-auto mb-4">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M4 10L16 4L28 10V22L16 28L4 22V10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <p className="text-muted mb-2">No products available yet</p>
        <p className="text-sm text-muted/60">Check back soon for our curated collection</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {products.map((product, index) => (
        <ProductCard
          key={product._id}
          product={product}
          index={index}
        />
      ))}
    </div>
  )
}

// Loading skeleton
export function ProductsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="aspect-[3/4] rounded-2xl bg-ivory animate-pulse"
        />
      ))}
    </div>
  )
}

