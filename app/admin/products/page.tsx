'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { GlassPanel } from '@/components/ui/glass-panel'
import { formatPrice } from '@/lib/utils'
import type { Product } from '@/types'

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null)

  const fetchProducts = async () => {
    try {
      // Include inactive products for admin view
      const res = await fetch('/api/products?limit=100&includeInactive=true')
      const data = await res.json()
      if (data.success) {
        setProducts(data.data || [])
      }
    } catch (error) {
      console.error('Failed to fetch products:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleDelete = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return
    
    setDeleteLoading(slug)
    try {
      const res = await fetch(`/api/products/${slug}`, { method: 'DELETE' })
      if (res.ok) {
        setProducts(products.filter(p => p.slug !== slug))
      }
    } catch (error) {
      console.error('Failed to delete product:', error)
    } finally {
      setDeleteLoading(null)
    }
  }

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-gold border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Search & Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <GlassPanel className="p-4 rounded-2xl" animate={false}>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-parchment/30 border border-cocoa/10 text-ink placeholder:text-muted/50 focus:outline-none focus:border-gold transition-colors duration-300"
              />
            </div>
            <div className="flex gap-2">
              <select className="px-4 py-3 rounded-xl bg-parchment/30 border border-cocoa/10 text-ink focus:outline-none focus:border-gold transition-colors duration-300">
                <option value="">All Categories</option>
                <option value="dry-fruits">Dry Fruits</option>
                <option value="masalas">Masalas</option>
                <option value="saffron">Saffron</option>
                <option value="honey">Honey</option>
              </select>
              <select className="px-4 py-3 rounded-xl bg-parchment/30 border border-cocoa/10 text-ink focus:outline-none focus:border-gold transition-colors duration-300">
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </GlassPanel>
      </motion.div>

      {/* Products Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <GlassPanel className="rounded-2xl overflow-hidden" animate={false}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-cocoa/10">
                  <th className="text-left p-4 text-sm font-display tracking-wide text-muted">Product</th>
                  <th className="text-left p-4 text-sm font-display tracking-wide text-muted">Category</th>
                  <th className="text-left p-4 text-sm font-display tracking-wide text-muted">Price</th>
                  <th className="text-left p-4 text-sm font-display tracking-wide text-muted">Status</th>
                  <th className="text-right p-4 text-sm font-display tracking-wide text-muted">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product, index) => (
                  <motion.tr
                    key={product._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="border-b border-cocoa/5 last:border-0 hover:bg-cocoa/5 transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-ivory flex-shrink-0">
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-ink">{product.name}</p>
                          <p className="text-xs text-muted">{product.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-3 py-1 text-xs rounded-full bg-gold/10 text-gold">
                        {product.category}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="font-display text-ink">
                        {formatPrice(product.prices[0].price)}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 text-xs rounded-full ${
                        product.isActive
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {product.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/products/${product.slug}/edit`}
                          className="p-2 rounded-lg hover:bg-cocoa/10 text-muted hover:text-ink transition-colors"
                        >
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M11.333 2L14 4.667L5.333 13.333H2.667V10.667L11.333 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </Link>
                        <button 
                          onClick={() => handleDelete(product.slug)}
                          disabled={deleteLoading === product.slug}
                          className="p-2 rounded-lg hover:bg-red-50 text-muted hover:text-red-600 transition-colors disabled:opacity-50"
                        >
                          {deleteLoading === product.slug ? (
                            <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <path d="M2 4H14M5.333 4V2.667C5.333 2.298 5.632 2 6 2H10C10.368 2 10.667 2.298 10.667 2.667V4M12.667 4V13.333C12.667 13.702 12.368 14 12 14H4C3.632 14 3.333 13.702 3.333 13.333V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center text-gold mx-auto mb-4">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M4 10L16 4L28 10V22L16 28L4 22V10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 14V28" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M4 10L16 14L28 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <p className="text-muted mb-4">
                {searchQuery ? 'No products match your search' : 'No products yet'}
              </p>
              {!searchQuery && (
                <Link
                  href="/admin/products/new"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-display bg-gold text-cocoa rounded-full hover:bg-gold-light transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  Add Your First Product
                </Link>
              )}
            </div>
          )}
        </GlassPanel>
      </motion.div>
    </div>
  )
}

