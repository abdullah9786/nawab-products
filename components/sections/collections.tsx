'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { FadeUp, StaggerContainer, StaggerItem } from '@/components/ui/motion'
import { MagneticCard } from '@/components/ui/magnetic-card'
import { cn } from '@/lib/utils'

// Default placeholder image if category has no image
const DEFAULT_CATEGORY_IMAGE = 'https://images.unsplash.com/photo-1608797178974-15b35a64ede9?w=800&q=80'

interface CategoryData {
  _id: string
  name: string
  slug: string
  description?: string
  image?: string
}

interface CollectionsSectionProps {
  categories?: CategoryData[]
}

export function CollectionsSection({ categories = [] }: CollectionsSectionProps) {
  // Transform categories to collections format
  const collections = categories.map((cat, index) => ({
    id: cat._id,
    name: cat.name,
    description: cat.description || `Explore our ${cat.name} collection`,
    image: cat.image || DEFAULT_CATEGORY_IMAGE,
    href: `/products?category=${cat.slug}`,
    featured: index === 0, // First category is featured
  }))

  // If no categories, show a placeholder
  if (collections.length === 0) {
    return null
  }
  return (
    <section className="py-32 md:py-40 bg-ivory">
      <div className="container-luxury">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <FadeUp>
            <span className="text-xs tracking-[0.3em] uppercase text-gold mb-4 block">
              Signature Collections
            </span>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="text-display-md font-serif text-ink">
              Curated for{' '}
              <span className="text-gradient-gold">Connoisseurs</span>
            </h2>
          </FadeUp>
        </div>

        {/* Collections Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {collections.map((collection, index) => (
            <StaggerItem
              key={collection.id}
              className={cn(
                'relative',
                collection.featured ? 'lg:col-span-7' : 'lg:col-span-5',
                index === 2 && 'lg:col-span-5',
                index === 3 && 'lg:col-span-7'
              )}
            >
              <CollectionCard collection={collection} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* View All Link */}
        <FadeUp delay={0.4}>
          <div className="text-center mt-16">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm font-display tracking-wider uppercase text-cocoa hover:text-gold transition-colors duration-300 group"
            >
              <span>View All Collections</span>
              <motion.span
                className="inline-block"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.3 }}
              >
                →
              </motion.span>
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

interface CollectionCardProps {
  collection: {
    id: string
    name: string
    description: string
    image: string
    href: string
    featured?: boolean
  }
}

function CollectionCard({ collection }: CollectionCardProps) {
  return (
    <MagneticCard strength={0.03}>
      <Link href={collection.href}>
        <motion.div
          whileHover={{ y: -8 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className={cn(
            'group relative overflow-hidden rounded-3xl',
            collection.featured ? 'aspect-[16/10]' : 'aspect-[4/3]'
          )}
        >
          {/* Background Image */}
          <Image
            src={collection.image}
            alt={collection.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 ease-luxury group-hover:scale-105"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/30 to-transparent" />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
            <motion.span
              initial={{ opacity: 0.7 }}
              whileHover={{ opacity: 1 }}
              className="text-xs tracking-[0.2em] uppercase text-gold mb-3"
            >
              Collection
            </motion.span>
            <h3 className="text-2xl md:text-3xl font-serif text-parchment mb-2">
              {collection.name}
            </h3>
            <p className="text-sm text-parchment/70 mb-4 max-w-sm">
              {collection.description}
            </p>
            <div className="flex items-center gap-2 text-sm text-parchment/80 group-hover:text-gold transition-colors duration-300">
              <span>Explore</span>
              <motion.span
                className="inline-block"
                initial={{ x: 0 }}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.3 }}
              >
                →
              </motion.span>
            </div>
          </div>

          {/* Decorative border */}
          <div className="absolute inset-4 border border-parchment/10 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </motion.div>
      </Link>
    </MagneticCard>
  )
}

