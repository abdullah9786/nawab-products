'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'
import { GlassPanel } from '@/components/ui/glass-panel'
import { formatPrice } from '@/lib/utils'

interface DashboardStats {
  totalProducts: number
  totalCategories: number
  activeProducts: number
  featuredProducts: number
}

interface Product {
  _id: string
  name: string
  prices: { price: number }[]
}

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [topProducts, setTopProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        // Fetch products
        const productsRes = await fetch('/api/products?limit=100')
        const productsData = await productsRes.json()
        
        // Fetch categories
        const categoriesRes = await fetch('/api/categories')
        const categoriesData = await categoriesRes.json()

        if (productsData.success) {
          const products = productsData.data || []
          setStats({
            totalProducts: products.length,
            totalCategories: categoriesData.data?.length || 0,
            activeProducts: products.filter((p: any) => p.isActive).length,
            featuredProducts: products.filter((p: any) => p.featured).length,
          })
          setTopProducts(products.slice(0, 4))
        }
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (session) {
      fetchDashboardData()
    }
  }, [session])

  if (status === 'loading' || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-gold border-t-transparent" />
      </div>
    )
  }

  if (!session) {
    redirect('/admin/login')
  }

  const dashboardStats = [
    { label: 'Total Products', value: stats?.totalProducts || 0, change: 'In database', trend: 'up' },
    { label: 'Categories', value: stats?.totalCategories || 0, change: 'Active', trend: 'up' },
    { label: 'Active Products', value: stats?.activeProducts || 0, change: 'Published', trend: 'up' },
    { label: 'Featured', value: stats?.featuredProducts || 0, change: 'Highlighted', trend: 'up' },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-parchment/70">
          Welcome back, <span className="text-gold">{session.user?.name || 'Admin'}</span>
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <GlassPanel className="p-6 rounded-2xl" animate={false}>
              <p className="text-sm text-muted mb-2">{stat.label}</p>
              <div className="flex items-end justify-between">
                <p className="text-3xl font-serif text-ink">{stat.value}</p>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  stat.trend === 'up' 
                    ? 'bg-emerald-100 text-emerald-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  {stat.change}
                </span>
              </div>
            </GlassPanel>
          </motion.div>
        ))}
      </div>

      {/* Products Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <GlassPanel className="p-6 rounded-2xl" animate={false}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-serif text-ink">Products</h3>
              <Link
                href="/admin/products"
                className="text-sm text-gold hover:text-gold-light transition-colors"
              >
                View All
              </Link>
            </div>
            {topProducts.length > 0 ? (
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div
                    key={product._id}
                    className="flex items-center gap-4"
                  >
                    <span className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-sm font-medium text-gold">
                      {index + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-ink truncate">{product.name}</p>
                      <p className="text-xs text-muted">{product.prices?.length || 0} price options</p>
                    </div>
                    <p className="font-display text-ink">
                      {formatPrice(product.prices?.[0]?.price || 0)}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted mb-4">No products yet</p>
                <Link
                  href="/admin/products/new"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-gold/10 text-gold rounded-full hover:bg-gold/20 transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  Add First Product
                </Link>
              </div>
            )}
          </GlassPanel>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <GlassPanel className="p-6 rounded-2xl" animate={false}>
          <h3 className="text-lg font-serif text-ink mb-6">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Link
              href="/admin/products/new"
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-cocoa/5 hover:bg-cocoa/10 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="text-sm text-ink">Add Product</span>
            </Link>
            <Link
              href="/admin/categories"
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-cocoa/5 hover:bg-cocoa/10 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M3.333 5H16.667M3.333 10H16.667M3.333 15H16.667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="text-sm text-ink">Categories</span>
            </Link>
            <Link
              href="/admin/settings"
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-cocoa/5 hover:bg-cocoa/10 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M10 2.5V4.167M10 15.833V17.5M17.5 10H15.833M4.167 10H2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="text-sm text-ink">Settings</span>
            </Link>
          </div>
        </GlassPanel>
      </motion.div>
    </div>
  )
}

