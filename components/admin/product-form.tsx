'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { GlassPanel } from '@/components/ui/glass-panel'
import { Button } from '@/components/ui/button'
import { cn, slugify, formatPrice, generateId } from '@/lib/utils'
import type { Product, ProductFormData, PriceSlab, PricingType } from '@/types'

interface CategoryData {
  _id: string
  name: string
  slug: string
}

interface ProductFormProps {
  product?: Product
  categories?: CategoryData[]
  onSubmit: (data: ProductFormData) => Promise<void>
}

const weightUnits = ['g', 'kg']
const unitTypes = ['piece', 'pack', 'dozen']

export function ProductForm({ product, categories = [], onSubmit }: ProductFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // Form state
  const [name, setName] = useState(product?.name || '')
  const [slug, setSlug] = useState(product?.slug || '')
  const [category, setCategory] = useState(product?.category || (categories.length > 0 ? categories[0].name : ''))
  const [description, setDescription] = useState(product?.description || '')
  const [shortDescription, setShortDescription] = useState(product?.shortDescription || '')
  const [image, setImage] = useState(product?.image || '')
  const [pricingType, setPricingType] = useState<PricingType>(product?.pricingType || 'WEIGHT')
  const [prices, setPrices] = useState<PriceSlab[]>(
    product?.prices || [{ _id: generateId(), quantity: 100, unit: 'g', price: 0 }]
  )
  const [origin, setOrigin] = useState(product?.origin || '')
  const [aroma, setAroma] = useState(product?.aroma || '')
  const [texture, setTexture] = useState(product?.texture || '')
  const [usageTips, setUsageTips] = useState(product?.usageTips || '')
  const [seoTitle, setSeoTitle] = useState(product?.seo?.title || '')
  const [seoDescription, setSeoDescription] = useState(product?.seo?.description || '')
  const [featured, setFeatured] = useState(product?.featured || false)
  const [isActive, setIsActive] = useState(product?.isActive ?? true)

  // Auto-generate slug from name
  const handleNameChange = (value: string) => {
    setName(value)
    if (!product) {
      setSlug(slugify(value))
    }
    if (!seoTitle) {
      setSeoTitle(`${value} | NAWAB KHANA`)
    }
  }

  // Add price slab
  const addPriceSlab = () => {
    const defaultUnit = pricingType === 'WEIGHT' ? 'g' : 'piece'
    setPrices([...prices, { _id: generateId(), quantity: 0, unit: defaultUnit, price: 0 }])
  }

  // Remove price slab
  const removePriceSlab = (id: string) => {
    if (prices.length > 1) {
      setPrices(prices.filter(p => p._id !== id))
    }
  }

  // Update price slab
  const updatePriceSlab = (id: string, field: keyof PriceSlab, value: number | string) => {
    setPrices(prices.map(p => 
      p._id === id ? { ...p, [field]: value } : p
    ))
  }

  // Handle pricing type change
  const handlePricingTypeChange = (type: PricingType) => {
    setPricingType(type)
    // Reset units based on pricing type
    const defaultUnit = type === 'WEIGHT' ? 'g' : 'piece'
    setPrices(prices.map(p => ({ ...p, unit: defaultUnit })))
  }

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const formData: ProductFormData = {
        name,
        slug,
        category,
        description,
        shortDescription,
        image,
        pricingType,
        prices,
        origin,
        aroma,
        texture,
        usageTips,
        seo: {
          title: seoTitle || `${name} | NAWAB KHANA`,
          description: seoDescription || description.slice(0, 160),
        },
        featured,
        isActive,
      }

      await onSubmit(formData)
      router.push('/admin/products')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm"
        >
          {error}
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <GlassPanel className="p-6 rounded-2xl" animate={false}>
            <h3 className="text-lg font-serif text-ink mb-6">Basic Information</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-ink mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-parchment/30 border border-cocoa/10 text-ink placeholder:text-muted/50 focus:outline-none focus:border-gold transition-colors duration-300"
                  placeholder="e.g., Kashmiri Saffron"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-ink mb-2">
                  URL Slug *
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(slugify(e.target.value))}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-parchment/30 border border-cocoa/10 text-ink placeholder:text-muted/50 focus:outline-none focus:border-gold transition-colors duration-300"
                  placeholder="e.g., kashmiri-saffron"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-ink mb-2">
                  Category *
                </label>
                {categories.length > 0 ? (
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-parchment/30 border border-cocoa/10 text-ink focus:outline-none focus:border-gold transition-colors duration-300"
                  >
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                ) : (
                  <div className="w-full px-4 py-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 text-sm">
                    No categories available. Please create a category first in{' '}
                    <a href="/admin/categories" className="underline font-medium">Admin → Categories</a>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-ink mb-2">
                  Short Description
                </label>
                <input
                  type="text"
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  maxLength={300}
                  className="w-full px-4 py-3 rounded-xl bg-parchment/30 border border-cocoa/10 text-ink placeholder:text-muted/50 focus:outline-none focus:border-gold transition-colors duration-300"
                  placeholder="Brief description for product cards"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-ink mb-2">
                  Full Description *
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl bg-parchment/30 border border-cocoa/10 text-ink placeholder:text-muted/50 focus:outline-none focus:border-gold transition-colors duration-300 resize-none"
                  placeholder="Detailed product description..."
                />
              </div>
            </div>
          </GlassPanel>

          {/* Pricing */}
          <GlassPanel className="p-6 rounded-2xl" animate={false}>
            <h3 className="text-lg font-serif text-ink mb-6">Pricing</h3>

            {/* Pricing Type Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-ink mb-3">
                Pricing Type *
              </label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => handlePricingTypeChange('WEIGHT')}
                  className={cn(
                    'px-6 py-3 rounded-full text-sm font-display transition-all duration-300',
                    pricingType === 'WEIGHT'
                      ? 'bg-cocoa text-parchment'
                      : 'bg-parchment/30 text-muted hover:text-ink border border-cocoa/10'
                  )}
                >
                  By Weight (g/kg)
                </button>
                <button
                  type="button"
                  onClick={() => handlePricingTypeChange('UNIT')}
                  className={cn(
                    'px-6 py-3 rounded-full text-sm font-display transition-all duration-300',
                    pricingType === 'UNIT'
                      ? 'bg-cocoa text-parchment'
                      : 'bg-parchment/30 text-muted hover:text-ink border border-cocoa/10'
                  )}
                >
                  By Unit (pieces)
                </button>
              </div>
            </div>

            {/* Price Slabs */}
            <div className="space-y-4">
              <AnimatePresence>
                {prices.map((price, index) => (
                  <motion.div
                    key={price._id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-parchment/20"
                  >
                    <div className="flex-1 grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs text-muted mb-1">Quantity</label>
                        <input
                          type="number"
                          value={price.quantity}
                          onChange={(e) => updatePriceSlab(price._id!, 'quantity', parseInt(e.target.value) || 0)}
                          min="0"
                          className="w-full px-3 py-2 rounded-lg bg-white/50 border border-cocoa/10 text-ink focus:outline-none focus:border-gold"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-muted mb-1">Unit</label>
                        <select
                          value={price.unit}
                          onChange={(e) => updatePriceSlab(price._id!, 'unit', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-white/50 border border-cocoa/10 text-ink focus:outline-none focus:border-gold"
                        >
                          {(pricingType === 'WEIGHT' ? weightUnits : unitTypes).map((unit) => (
                            <option key={unit} value={unit}>{unit}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs text-muted mb-1">Price (₹)</label>
                        <input
                          type="number"
                          value={price.price}
                          onChange={(e) => updatePriceSlab(price._id!, 'price', parseInt(e.target.value) || 0)}
                          min="0"
                          className="w-full px-3 py-2 rounded-lg bg-white/50 border border-cocoa/10 text-ink focus:outline-none focus:border-gold"
                        />
                      </div>
                    </div>
                    {prices.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removePriceSlab(price._id!)}
                        className="p-2 rounded-lg hover:bg-red-50 text-muted hover:text-red-600 transition-colors"
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M4 12L12 4M4 4L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                      </button>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              <button
                type="button"
                onClick={addPriceSlab}
                className="w-full py-3 rounded-xl border border-dashed border-cocoa/20 text-sm text-muted hover:text-ink hover:border-gold transition-colors"
              >
                + Add Price Slab
              </button>
            </div>
          </GlassPanel>

          {/* Characteristics */}
          <GlassPanel className="p-6 rounded-2xl" animate={false}>
            <h3 className="text-lg font-serif text-ink mb-6">Characteristics</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-ink mb-2">Origin</label>
                <input
                  type="text"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-parchment/30 border border-cocoa/10 text-ink placeholder:text-muted/50 focus:outline-none focus:border-gold transition-colors duration-300"
                  placeholder="e.g., Kashmir, India"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ink mb-2">Aroma</label>
                <input
                  type="text"
                  value={aroma}
                  onChange={(e) => setAroma(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-parchment/30 border border-cocoa/10 text-ink placeholder:text-muted/50 focus:outline-none focus:border-gold transition-colors duration-300"
                  placeholder="Describe the aroma"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ink mb-2">Texture</label>
                <input
                  type="text"
                  value={texture}
                  onChange={(e) => setTexture(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-parchment/30 border border-cocoa/10 text-ink placeholder:text-muted/50 focus:outline-none focus:border-gold transition-colors duration-300"
                  placeholder="Describe the texture"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-ink mb-2">Usage Tips</label>
                <textarea
                  value={usageTips}
                  onChange={(e) => setUsageTips(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-parchment/30 border border-cocoa/10 text-ink placeholder:text-muted/50 focus:outline-none focus:border-gold transition-colors duration-300 resize-none"
                  placeholder="How to use this product..."
                />
              </div>
            </div>
          </GlassPanel>

          {/* SEO */}
          <GlassPanel className="p-6 rounded-2xl" animate={false}>
            <h3 className="text-lg font-serif text-ink mb-6">SEO</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-ink mb-2">Meta Title</label>
                <input
                  type="text"
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-parchment/30 border border-cocoa/10 text-ink placeholder:text-muted/50 focus:outline-none focus:border-gold transition-colors duration-300"
                  placeholder="SEO title for search engines"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ink mb-2">Meta Description</label>
                <textarea
                  value={seoDescription}
                  onChange={(e) => setSeoDescription(e.target.value)}
                  rows={3}
                  maxLength={160}
                  className="w-full px-4 py-3 rounded-xl bg-parchment/30 border border-cocoa/10 text-ink placeholder:text-muted/50 focus:outline-none focus:border-gold transition-colors duration-300 resize-none"
                  placeholder="Brief description for search results (max 160 chars)"
                />
                <p className="text-xs text-muted mt-1">{seoDescription.length}/160 characters</p>
              </div>
            </div>
          </GlassPanel>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Image */}
          <GlassPanel className="p-6 rounded-2xl" animate={false}>
            <h3 className="text-lg font-serif text-ink mb-6">Product Image</h3>
            
            <div className="space-y-4">
              <div className="aspect-square rounded-xl overflow-hidden bg-parchment/30 border border-cocoa/10">
                {image ? (
                  <Image
                    src={image}
                    alt="Product preview"
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted">
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                      <rect x="6" y="10" width="36" height="28" rx="4" stroke="currentColor" strokeWidth="2"/>
                      <circle cx="18" cy="22" r="4" stroke="currentColor" strokeWidth="2"/>
                      <path d="M6 34L16 24L24 32L32 24L42 34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </div>
              <input
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-parchment/30 border border-cocoa/10 text-ink placeholder:text-muted/50 focus:outline-none focus:border-gold transition-colors duration-300 text-sm"
                placeholder="Image URL"
              />
            </div>
          </GlassPanel>

          {/* Status */}
          <GlassPanel className="p-6 rounded-2xl" animate={false}>
            <h3 className="text-lg font-serif text-ink mb-6">Status</h3>
            
            <div className="space-y-4">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm text-ink">Active</span>
                <button
                  type="button"
                  onClick={() => setIsActive(!isActive)}
                  className={cn(
                    'w-12 h-6 rounded-full transition-colors duration-300 relative',
                    isActive ? 'bg-emerald-500' : 'bg-gray-300'
                  )}
                >
                  <span className={cn(
                    'absolute top-1 w-4 h-4 rounded-full bg-white transition-transform duration-300',
                    isActive ? 'left-7' : 'left-1'
                  )} />
                </button>
              </label>
              
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm text-ink">Featured</span>
                <button
                  type="button"
                  onClick={() => setFeatured(!featured)}
                  className={cn(
                    'w-12 h-6 rounded-full transition-colors duration-300 relative',
                    featured ? 'bg-gold' : 'bg-gray-300'
                  )}
                >
                  <span className={cn(
                    'absolute top-1 w-4 h-4 rounded-full bg-white transition-transform duration-300',
                    featured ? 'left-7' : 'left-1'
                  )} />
                </button>
              </label>
            </div>
          </GlassPanel>

          {/* Actions */}
          <div className="space-y-3">
            <Button
              type="submit"
              variant="gold"
              size="lg"
              isLoading={isLoading}
              className="w-full"
            >
              {product ? 'Update Product' : 'Create Product'}
            </Button>
            <button
              type="button"
              onClick={() => router.back()}
              className="w-full py-3 text-sm text-muted hover:text-ink transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

