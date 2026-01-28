'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { cn, formatPrice, getUnitLabel } from '@/lib/utils'
import { GlassPanel, FloatingGlassCard } from '@/components/ui/glass-panel'
import { PriceSelector } from '@/components/ui/price-selector'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { FadeUp, Parallax } from '@/components/ui/motion'
import { MinimalProductCard } from '@/components/ui/product-card'
import type { Product, PriceSlab } from '@/types'

interface ProductDetailProps {
  product: Product
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [selectedPrice, setSelectedPrice] = useState<PriceSlab>(product.prices[0])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  const images = product.images?.length ? product.images : [product.image]

  return (
    <section className="container-luxury pb-24 md:pb-32">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
        {/* Left Column - Sticky Image */}
        <div className="lg:col-span-7">
          <div className="lg:sticky lg:top-32">
            {/* Main Image */}
            <Parallax speed={0.1}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-ivory"
              >
                <Image
                  src={images[currentImageIndex]}
                  alt={product.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                  priority
                />
                
                {/* Subtle grain overlay */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply">
                  <div className="grain-overlay" />
                </div>
                
                {/* Gold frame accent */}
                <div className="absolute inset-6 border border-gold/20 rounded-2xl pointer-events-none" />
              </motion.div>
            </Parallax>

            {/* Thumbnail gallery */}
            {images.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex gap-3 mt-6"
              >
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={cn(
                      'relative w-20 h-20 rounded-xl overflow-hidden',
                      'transition-all duration-300',
                      'border-2',
                      currentImageIndex === index
                        ? 'border-gold opacity-100'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    )}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </motion.div>
            )}
          </div>
        </div>

        {/* Right Column - Product Info */}
        <div className="lg:col-span-5">
          <FloatingGlassCard
            className="p-8 md:p-10 rounded-[32px]"
            blur="xl"
            opacity="heavy"
            glow
          >
            {/* Category & Breadcrumb */}
            <FadeUp>
              <div className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-muted mb-4">
                <Link href="/products" className="hover:text-gold transition-colors">
                  Collection
                </Link>
                <span className="text-gold">·</span>
                <span className="text-gold">{product.category}</span>
              </div>
            </FadeUp>

            {/* Product Name */}
            <FadeUp delay={0.1}>
              <h1 className="text-display-md font-serif text-ink mb-4">
                {product.name}
              </h1>
            </FadeUp>

            {/* Short Description */}
            <FadeUp delay={0.15}>
              <p className="text-muted mb-8">
                {product.shortDescription || product.description.slice(0, 150) + '...'}
              </p>
            </FadeUp>

            {/* Price Selector */}
            <FadeUp delay={0.2}>
              <div className="mb-8 py-6 border-y border-gold/10">
                <PriceSelector
                  prices={product.prices}
                  pricingType={product.pricingType}
                  onSelect={setSelectedPrice}
                />
              </div>
            </FadeUp>

            {/* Contact for Order Button */}
            <FadeUp delay={0.25}>
              <motion.a
                href="https://wa.me/919323379975"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full btn-elegant py-5 text-base mb-4 flex items-center justify-center gap-3"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span>Order on WhatsApp — {formatPrice(selectedPrice.price)}</span>
              </motion.a>
            </FadeUp>

            {/* Call Button */}
            <FadeUp delay={0.3}>
              <a 
                href="tel:+919323379975"
                className="w-full btn-elegant-outline py-4 mb-8 flex items-center justify-center gap-2"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <span>Call to Order</span>
              </a>
            </FadeUp>

            {/* Product Details Accordion - all open by default */}
            <FadeUp delay={0.35}>
              <Accordion defaultOpen={['description', 'origin', 'characteristics', 'usage']} allowMultiple>
                <AccordionItem value="description">
                  <AccordionTrigger>About This Product</AccordionTrigger>
                  <AccordionContent>
                    {product.description}
                  </AccordionContent>
                </AccordionItem>

                {product.origin && (
                  <AccordionItem value="origin">
                    <AccordionTrigger>Origin & Sourcing</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-gold">
                              <path d="M8 1L10 5.5L15 6L11.5 9.5L12.5 14.5L8 12L3.5 14.5L4.5 9.5L1 6L6 5.5L8 1Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <div>
                            <p className="font-medium text-ink mb-1">Region of Origin</p>
                            <p className="text-sm">{product.origin}</p>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                )}

                {(product.aroma || product.texture) && (
                  <AccordionItem value="characteristics">
                    <AccordionTrigger>Characteristics</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        {product.aroma && (
                          <div>
                            <p className="font-medium text-ink mb-1">Aroma</p>
                            <p className="text-sm">{product.aroma}</p>
                          </div>
                        )}
                        {product.texture && (
                          <div>
                            <p className="font-medium text-ink mb-1">Texture</p>
                            <p className="text-sm">{product.texture}</p>
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                )}

                {product.usageTips && (
                  <AccordionItem value="usage">
                    <AccordionTrigger>Usage Tips</AccordionTrigger>
                    <AccordionContent>
                      {product.usageTips}
                    </AccordionContent>
                  </AccordionItem>
                )}
              </Accordion>
            </FadeUp>
          </FloatingGlassCard>
        </div>
      </div>
    </section>
  )
}

// Product Highlights Section
interface ProductHighlightsProps {
  product: Product
}

export function ProductHighlights({ product }: ProductHighlightsProps) {
  const highlights = [
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M14 2L17.5 9.5L26 10.5L20 16.5L21.5 25L14 21L6.5 25L8 16.5L2 10.5L10.5 9.5L14 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: 'Premium Quality',
      description: 'Hand-selected from the finest sources',
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <circle cx="14" cy="14" r="11" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M9 14L12.5 17.5L19 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: '100% Authentic',
      description: 'Certified pure with no additives',
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M4 14H8L11 8L14 20L17 11L20 14H24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: 'Freshness Guaranteed',
      description: 'Vacuum-sealed for optimal freshness',
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M14 4C8.48 4 4 8.48 4 14C4 19.52 8.48 24 14 24C19.52 24 24 19.52 24 14C24 8.48 19.52 4 14 4Z" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M14 8V14L18 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
      title: 'Quick Response',
      description: 'Fast inquiry & consultation',
    },
  ]

  return (
    <section className="bg-ivory py-16 md:py-20">
      <div className="container-luxury">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-14 h-14 rounded-full bg-gold/10 text-gold flex items-center justify-center mx-auto mb-4">
                {item.icon}
              </div>
              <h4 className="font-serif text-ink text-lg mb-2">{item.title}</h4>
              <p className="text-sm text-muted">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Why Choose Us Section
export function WhyChooseSection() {
  return (
    <section className="container-luxury py-20 md:py-28">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="aspect-[4/3] rounded-3xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&q=80"
              alt="Our craft"
              fill
              className="object-cover"
            />
          </div>
          {/* Decorative accent */}
          <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-2xl bg-gold/10 -z-10" />
        </motion.div>

        {/* Content */}
        <div>
          <FadeUp>
            <span className="text-xs tracking-[0.3em] uppercase text-gold mb-4 block">
              The NAWAB KHANA Promise
            </span>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="text-display-sm font-serif text-ink mb-6">
              Crafted with <span className="text-gradient-gold">Passion</span>, Delivered with Care
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-muted mb-8 leading-relaxed">
              Every product in our collection is sourced directly from heritage farms, 
              where traditional cultivation methods have been preserved for generations. 
              We believe in quality over quantity, ensuring each item meets our exacting standards.
            </p>
          </FadeUp>

          <FadeUp delay={0.3}>
            <div className="space-y-4">
              {[
                'Direct sourcing from trusted farmers',
                'Rigorous quality control at every step',
                'Traditional processing methods',
                'Eco-friendly packaging',
              ].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-gold">
                      <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-ink">{item}</span>
                </motion.div>
              ))}
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}

// Contact Info Section
export function ContactInfoSection() {
  const infoItems = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      ),
      title: 'Call Us',
      description: '+91 93233 79975',
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      ),
      title: 'WhatsApp',
      description: 'Quick Response',
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
      title: 'Email',
      description: 'hello@nawabkhana.com',
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M12 2C7.58 2 4 5.58 4 10c0 5.25 8 12 8 12s8-6.75 8-12c0-4.42-3.58-8-8-8z" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      ),
      title: 'Visit Us',
      description: 'Mumbai, India',
    },
  ]

  return (
    <section className="bg-cocoa/5 py-12">
      <div className="container-luxury">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {infoItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex items-center gap-4"
            >
              <div className="text-gold flex-shrink-0">
                {item.icon}
              </div>
              <div>
                <h5 className="font-medium text-ink text-sm">{item.title}</h5>
                <p className="text-xs text-muted">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Customer Reviews Section (Placeholder)
export function CustomerReviews() {
  const reviews = [
    {
      name: 'Priya Sharma',
      location: 'Mumbai',
      rating: 5,
      comment: 'Absolutely exceptional quality! The aroma and freshness is unmatched. Will definitely order again.',
      date: '2 weeks ago',
    },
    {
      name: 'Rajesh Kumar',
      location: 'Delhi',
      rating: 5,
      comment: 'Best dry fruits I have ever tasted. The packaging was premium and delivery was quick.',
      date: '1 month ago',
    },
    {
      name: 'Anita Desai',
      location: 'Bangalore',
      rating: 5,
      comment: 'Perfect for gifting! My family loved it. The quality speaks for itself.',
      date: '3 weeks ago',
    },
  ]

  return (
    <section className="container-luxury py-20 md:py-28">
      <div className="text-center mb-12">
        <FadeUp>
          <span className="text-xs tracking-[0.3em] uppercase text-gold mb-4 block">
            Customer Love
          </span>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="text-display-sm font-serif text-ink">
            What Our Customers Say
          </h2>
        </FadeUp>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((review, index) => (
          <motion.div
            key={review.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <GlassPanel className="p-6 rounded-2xl h-full" animate={false}>
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-gold">
                    <path d="M8 1L10 5.5L15 6L11.5 9.5L12.5 14.5L8 12L3.5 14.5L4.5 9.5L1 6L6 5.5L8 1Z" fill="currentColor"/>
                  </svg>
                ))}
              </div>
              
              {/* Comment */}
              <p className="text-ink mb-6 leading-relaxed">"{review.comment}"</p>
              
              {/* Author */}
              <div className="flex items-center justify-between pt-4 border-t border-gold/10">
                <div>
                  <p className="font-medium text-ink">{review.name}</p>
                  <p className="text-xs text-muted">{review.location}</p>
                </div>
                <span className="text-xs text-muted">{review.date}</span>
              </div>
            </GlassPanel>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

// CTA Banner Section
export function ProductCTABanner() {
  return (
    <section className="bg-cocoa py-16 md:py-20">
      <div className="container-luxury text-center">
        <FadeUp>
          <span className="text-xs tracking-[0.3em] uppercase text-gold mb-4 block">
            Limited Time Offer
          </span>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="text-display-sm font-serif text-parchment mb-4">
            Get 10% Off Your First Order
          </h2>
        </FadeUp>
        <FadeUp delay={0.2}>
          <p className="text-parchment/70 mb-8 max-w-lg mx-auto">
            Join our community of connoisseurs and enjoy exclusive offers, early access to new products, and more.
          </p>
        </FadeUp>
        <FadeUp delay={0.3}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-5 py-3 rounded-full bg-parchment/10 border border-parchment/20 text-parchment placeholder:text-parchment/50 focus:outline-none focus:border-gold transition-colors"
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3 bg-gold text-cocoa font-display tracking-wider rounded-full hover:bg-gold-light transition-colors"
            >
              Subscribe
            </motion.button>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

// Related Products Section
interface RelatedProductsProps {
  products: Product[]
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  return (
    <section className="container-luxury py-24 md:py-32 border-t border-gold/10">
      <FadeUp>
        <span className="text-xs tracking-[0.3em] uppercase text-gold mb-4 block">
          You May Also Like
        </span>
      </FadeUp>
      <FadeUp delay={0.1}>
        <h2 className="text-heading-lg font-serif text-ink mb-12">
          Related Products
        </h2>
      </FadeUp>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <MinimalProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}

