// Product Types
export type PricingType = 'WEIGHT' | 'UNIT'

export interface PriceSlab {
  _id?: string
  unit?: string // 'g', 'kg', 'piece', 'dozen', etc.
  quantity: number
  price: number
}

export interface SEOData {
  title: string
  description: string
  keywords?: string[]
}

export interface Product {
  _id: string
  name: string
  slug: string
  category: string
  description: string
  shortDescription?: string
  image: string
  images?: string[]
  pricingType: PricingType
  prices: PriceSlab[]
  origin?: string
  aroma?: string
  texture?: string
  usageTips?: string
  seo: SEOData
  featured?: boolean
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface ProductFormData {
  name: string
  slug: string
  category: string
  description: string
  shortDescription?: string
  image: string
  images?: string[]
  pricingType: PricingType
  prices: PriceSlab[]
  origin?: string
  aroma?: string
  texture?: string
  usageTips?: string
  seo: SEOData
  featured?: boolean
  isActive: boolean
}

// Category Types
export interface Category {
  _id: string
  name: string
  slug: string
  description?: string
  image?: string
  displayOrder: number
  isActive: boolean
}

// Admin User
export interface AdminUser {
  _id: string
  email: string
  password: string
  name: string
  createdAt: Date
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  success: boolean
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

// JSON-LD Types
export interface ProductJsonLd {
  '@context': 'https://schema.org'
  '@type': 'Product'
  name: string
  description: string
  image: string
  brand: {
    '@type': 'Brand'
    name: string
  }
  offers: {
    '@type': 'AggregateOffer'
    priceCurrency: string
    lowPrice: number
    highPrice: number
    offerCount: number
  }
}

// Component Props Types
export interface MotionProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export interface SectionProps {
  children?: React.ReactNode
  className?: string
  id?: string
}

