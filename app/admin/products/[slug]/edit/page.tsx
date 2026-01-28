'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ProductForm } from '@/components/admin/product-form'
import type { Product, ProductFormData } from '@/types'

interface Category {
  _id: string
  name: string
  slug: string
}

export default function EditProductPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string

  const [product, setProduct] = useState<Product | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch product and categories in parallel
        // includeInactive=true allows editing inactive products
        const [productRes, categoriesRes] = await Promise.all([
          fetch(`/api/products/${slug}?includeInactive=true`),
          fetch('/api/categories')
        ])

        const productData = await productRes.json()
        const categoriesData = await categoriesRes.json()

        if (productData.success) {
          setProduct(productData.data)
        } else {
          setError('Product not found')
        }

        if (categoriesData.success) {
          setCategories(categoriesData.data || [])
        }
      } catch (err) {
        console.error('Failed to fetch data:', err)
        setError('Failed to load product')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [slug])

  const handleSubmit = async (data: ProductFormData) => {
    const response = await fetch(`/api/products/${slug}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to update product')
    }

    // If slug changed, redirect to new URL
    if (data.slug !== slug) {
      router.push('/admin/products')
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-gold border-t-transparent" />
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-red-500 mb-4">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M16 10V18M16 22V22.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </div>
        <p className="text-muted mb-4">{error || 'Product not found'}</p>
        <button
          onClick={() => router.push('/admin/products')}
          className="px-5 py-2.5 text-sm font-display bg-gold text-cocoa rounded-full hover:bg-gold-light transition-colors"
        >
          Back to Products
        </button>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-serif text-ink">Edit Product</h2>
        <p className="text-muted text-sm">Update product details for "{product.name}"</p>
      </div>
      <ProductForm 
        product={product} 
        categories={categories} 
        onSubmit={handleSubmit} 
      />
    </div>
  )
}
