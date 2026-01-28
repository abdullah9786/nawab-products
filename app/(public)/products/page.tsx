import { Metadata } from 'next'
import { Navigation, Footer, CursorGlow } from '@/components/ui'
import { ProductsGrid, ProductsGridSkeleton, ProductsHeader, ProductsFilter } from './components'
import dbConnect from '@/lib/db/connection'
import { Product, Category } from '@/lib/db/models'
import { serializeDoc } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Our Collection | Premium Dry Fruits & Masalas',
  description:
    'Explore our curated collection of premium dry fruits, artisanal masalas, saffron, and wild honey. Each product is sourced from heritage regions and crafted with tradition.',
  openGraph: {
    title: 'Our Collection | NAWAB KHANA',
    description:
      'Explore our curated collection of premium dry fruits and artisanal masalas.',
  },
}

interface ProductsPageProps {
  searchParams: { category?: string; sort?: string }
}

async function getCategories() {
  await dbConnect()
  const categories = await Category.find({ isActive: true })
    .sort({ displayOrder: 1, name: 1 })
    .lean()
  return serializeDoc(categories)
}

async function getProducts(categorySlug?: string, sort?: string) {
  await dbConnect()
  
  // Build query
  const query: Record<string, unknown> = { isActive: true }
  
  // If a category slug is provided, find the category and filter by its name
  if (categorySlug && categorySlug !== 'all') {
    const category = await Category.findOne({ slug: categorySlug, isActive: true }).lean()
    if (category) {
      query.category = category.name
    }
  }
  
  // Build sort
  let sortQuery: Record<string, 1 | -1> = { featured: -1, createdAt: -1 }
  if (sort === 'newest') {
    sortQuery = { createdAt: -1 }
  } else if (sort === 'price-asc') {
    sortQuery = { 'prices.0.price': 1 }
  } else if (sort === 'price-desc') {
    sortQuery = { 'prices.0.price': -1 }
  }
  
  const products = await Product.find(query).sort(sortQuery).lean()
  return serializeDoc(products)
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { category, sort } = searchParams
  
  // Fetch categories and products in parallel
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(category, sort)
  ])

  return (
    <>
      <CursorGlow />
      <Navigation />
      
      <main className="min-h-screen bg-parchment pt-24 md:pt-32">
        {/* Header */}
        <ProductsHeader />
        
        {/* Filters */}
        <section className="container-luxury py-8">
          <ProductsFilter 
            currentCategory={category} 
            currentSort={sort} 
            categories={categories}
          />
        </section>
        
        {/* Products Grid */}
        <section className="container-luxury pb-24 md:pb-32">
          <ProductsGrid products={products} />
        </section>
      </main>
      
      <Footer />
    </>
  )
}

