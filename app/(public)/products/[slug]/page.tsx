import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Navigation, Footer, CursorGlow } from '@/components/ui'
import { 
  ProductDetail, 
  ProductHighlights,
  WhyChooseSection,
  ContactInfoSection,
  CustomerReviews,
  ProductCTABanner,
  RelatedProducts 
} from './components'
import dbConnect from '@/lib/db/connection'
import { Product as ProductModel } from '@/lib/db/models'
import { serializeDoc } from '@/lib/utils'
import type { Product } from '@/types'

async function getProduct(slug: string): Promise<Product | null> {
  await dbConnect()
  const product = await ProductModel.findOne({ slug, isActive: true }).lean()
  return product ? (serializeDoc(product) as unknown as Product) : null
}

async function getRelatedProducts(category: string, excludeSlug: string): Promise<Product[]> {
  await dbConnect()
  const products = await ProductModel.find({ 
    category, 
    slug: { $ne: excludeSlug },
    isActive: true 
  }).limit(4).lean()
  return serializeDoc(products) as unknown as Product[]
}

interface ProductPageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(params.slug)
  
  if (!product) {
    return {
      title: 'Product Not Found',
    }
  }

  return {
    title: product.seo.title,
    description: product.seo.description,
    openGraph: {
      title: product.seo.title,
      description: product.seo.description,
      images: [product.image],
      type: 'website',
    },
  }
}

export async function generateStaticParams() {
  await dbConnect()
  const products = await ProductModel.find({ isActive: true }).select('slug').lean()
  return products.map((product) => ({
    slug: product.slug,
  }))
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.slug)

  if (!product) {
    notFound()
  }

  const relatedProducts = await getRelatedProducts(product.category, product.slug)

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    brand: {
      '@type': 'Brand',
      name: 'NAWAB KHANA',
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'INR',
      lowPrice: Math.min(...product.prices.map(p => p.price)),
      highPrice: Math.max(...product.prices.map(p => p.price)),
      offerCount: product.prices.length,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <CursorGlow />
      <Navigation />
      
      <main className="min-h-screen bg-parchment pt-24 md:pt-32">
        <ProductDetail product={product} />
        
        {/* Product Highlights */}
        <ProductHighlights product={product} />
        
        {/* Why Choose Us */}
        <WhyChooseSection />
        
        {/* Customer Reviews */}
        <CustomerReviews />
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <RelatedProducts products={relatedProducts} />
        )}
        
        {/* CTA Banner */}
        <ProductCTABanner />
        
        {/* Contact Info Strip */}
        <ContactInfoSection />
      </main>
      
      <Footer />
    </>
  )
}

