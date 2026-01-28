import { Metadata } from 'next'
import {
  HeroSection,
  HeritageStorySection,
  CollectionsSection,
  ProcessSection,
  BestSellersSection,
  PhilosophySection,
  CTASection,
} from '@/components/sections'
import { Navigation, Footer, CursorGlow } from '@/components/ui'
import dbConnect from '@/lib/db/connection'
import { Product, Category } from '@/lib/db/models'
import { serializeDoc } from '@/lib/utils'
import type { Product as ProductType, Category as CategoryType } from '@/types'

export const metadata: Metadata = {
  title: 'NAWAB KHANA | Luxury Dry Fruits & Masalas',
  description:
    'Experience the finest collection of premium dry fruits and artisanal masalas. Pure ingredients, royal traditions — from heritage kitchens to modern homes.',
  openGraph: {
    title: 'NAWAB KHANA | Luxury Dry Fruits & Masalas',
    description:
      'Experience the finest collection of premium dry fruits and artisanal masalas.',
    images: ['/og-image.jpg'],
  },
}

async function getFeaturedProducts(): Promise<ProductType[]> {
  await dbConnect()
  const products = await Product.find({ isActive: true })
    .sort({ featured: -1, createdAt: -1 })
    .limit(6)
    .lean()
  return serializeDoc(products) as unknown as ProductType[]
}

async function getCategories(): Promise<CategoryType[]> {
  await dbConnect()
  const categories = await Category.find({ isActive: true })
    .sort({ displayOrder: 1, createdAt: -1 })
    .limit(4) // Limit to 4 categories for the collections grid
    .lean()
  return serializeDoc(categories) as unknown as CategoryType[]
}

export default async function HomePage() {
  const [featuredProducts, categories] = await Promise.all([
    getFeaturedProducts(),
    getCategories()
  ])

  return (
    <>
      <CursorGlow />
      <Navigation />
      
      <main>
        {/* Hero Section - Full viewport cinematic intro */}
        <HeroSection />
        
        {/* Heritage Story - Editorial layout */}
        <HeritageStorySection />
        
        {/* Signature Collections - Large cards */}
        <CollectionsSection categories={categories} />
        
        {/* Craft Process - Icons & micro animations */}
        <ProcessSection />
        
        {/* Best Sellers - Art gallery grid */}
        <BestSellersSection products={featuredProducts} />
        
        {/* Philosophy Statement */}
        <PhilosophySection />
        
        {/* Newsletter CTA */}
        <CTASection />
      </main>
      
      <Footer />
    </>
  )
}

