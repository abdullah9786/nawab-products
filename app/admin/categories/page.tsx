'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { GlassPanel } from '@/components/ui/glass-panel'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Category {
  _id: string
  name: string
  slug: string
  description?: string
  image?: string
  productCount?: number
  isActive: boolean
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [formData, setFormData] = useState({ name: '', description: '', image: '' })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories')
      const data = await res.json()
      if (data.success) {
        setCategories(data.data || [])
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const handleEdit = (category: Category) => {
    setEditingCategory(category)
    setFormData({ 
      name: category.name, 
      description: category.description || '',
      image: category.image || ''
    })
    setIsModalOpen(true)
  }

  const handleAdd = () => {
    setEditingCategory(null)
    setFormData({ name: '', description: '', image: '' })
    setIsModalOpen(true)
  }

  const handleSave = async () => {
    if (!formData.name.trim()) return
    
    setIsSaving(true)
    try {
      if (editingCategory) {
        // Update existing category
        const res = await fetch(`/api/categories/${editingCategory._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })
        if (res.ok) {
          setCategories(categories.map(c => 
            c._id === editingCategory._id 
              ? { ...c, name: formData.name, description: formData.description, image: formData.image }
              : c
          ))
        }
      } else {
        // Create new category
        const res = await fetch('/api/categories', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })
        const data = await res.json()
        if (data.success) {
          setCategories([...categories, data.data])
        }
      }
      setIsModalOpen(false)
    } catch (error) {
      console.error('Failed to save category:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const toggleActive = (id: string) => {
    setCategories(categories.map(c => 
      c._id === id ? { ...c, isActive: !c.isActive } : c
    ))
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-gold border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <p className="text-parchment/70">Manage product categories</p>
        <Button variant="gold" onClick={handleAdd}>
          + Add Category
        </Button>
      </motion.div>

      {/* Categories Grid */}
      {categories.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <GlassPanel className="p-12 rounded-2xl text-center" animate={false}>
            <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center text-gold mx-auto mb-4">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M5 10H27M5 16H27M5 22H27" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <p className="text-muted mb-4">No categories yet</p>
            <Button variant="gold" onClick={handleAdd}>
              Create First Category
            </Button>
          </GlassPanel>
        </motion.div>
      ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={category._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <GlassPanel className="p-6 rounded-2xl" animate={false}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-serif text-ink">{category.name}</h3>
                  <p className="text-xs text-muted">/{category.slug}</p>
                </div>
                <span className={cn(
                  'px-2 py-1 text-xs rounded-full',
                  category.isActive 
                    ? 'bg-emerald-100 text-emerald-700' 
                    : 'bg-gray-100 text-gray-600'
                )}>
                  {category.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
              
              <p className="text-sm text-muted mb-4 line-clamp-2">
                {category.description || 'No description'}
              </p>
              
              <div className="flex items-center justify-between pt-4 border-t border-cocoa/10">
                <span className="text-sm text-muted">
                  {category.productCount} products
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleActive(category._id)}
                    className="p-2 rounded-lg hover:bg-cocoa/10 text-muted hover:text-ink transition-colors"
                    title={category.isActive ? 'Deactivate' : 'Activate'}
                  >
                    {category.isActive ? (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 3C4.5 3 1.5 8 1.5 8C1.5 8 4.5 13 8 13C11.5 13 14.5 8 14.5 8C14.5 8 11.5 3 8 3Z" stroke="currentColor" strokeWidth="1.5"/>
                        <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5"/>
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M2 2L14 14M6.5 6.5C6 7 5.75 7.5 5.75 8C5.75 9.25 6.75 10.25 8 10.25C8.5 10.25 9 10 9.5 9.5M8 3C11.5 3 14.5 8 14.5 8C14.5 8 13.5 9.5 12 10.75M3.5 5C2.5 6 1.5 8 1.5 8C1.5 8 4.5 13 8 13C9 13 10 12.75 10.75 12.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    )}
                  </button>
                  <button
                    onClick={() => handleEdit(category)}
                    className="p-2 rounded-lg hover:bg-cocoa/10 text-muted hover:text-ink transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M11.333 2L14 4.667L5.333 13.333H2.667V10.667L11.333 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </GlassPanel>
          </motion.div>
        ))}
      </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-10 w-full max-w-md"
          >
            <GlassPanel className="p-6 rounded-2xl" animate={false}>
              <h2 className="text-xl font-serif text-ink mb-6">
                {editingCategory ? 'Edit Category' : 'Add Category'}
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-ink mb-2">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-parchment/30 border border-cocoa/10 text-ink focus:outline-none focus:border-gold"
                    placeholder="Category name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl bg-parchment/30 border border-cocoa/10 text-ink focus:outline-none focus:border-gold resize-none"
                    placeholder="Category description"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink mb-2">Image URL</label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-parchment/30 border border-cocoa/10 text-ink focus:outline-none focus:border-gold"
                    placeholder="https://example.com/image.jpg"
                  />
                  <p className="text-xs text-muted mt-1">
                    Enter a URL for the category image (displayed on homepage)
                  </p>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button variant="outline" onClick={() => setIsModalOpen(false)} className="flex-1" disabled={isSaving}>
                  Cancel
                </Button>
                <Button variant="gold" onClick={handleSave} className="flex-1" isLoading={isSaving}>
                  {editingCategory ? 'Update' : 'Create'}
                </Button>
              </div>
            </GlassPanel>
          </motion.div>
        </div>
      )}
    </div>
  )
}

