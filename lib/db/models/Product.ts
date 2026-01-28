import mongoose, { Schema, Document, Model } from 'mongoose'
import type { Product as ProductType, PriceSlab, SEOData } from '@/types'

export interface ProductDocument extends Omit<ProductType, '_id'>, Document {}

const PriceSlabSchema = new Schema<PriceSlab>(
  {
    unit: { type: String },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  { _id: true }
)

const SEOSchema = new Schema<SEOData>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    keywords: [{ type: String }],
  },
  { _id: false }
)

const ProductSchema = new Schema<ProductDocument>(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      maxlength: [200, 'Name cannot exceed 200 characters'],
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      index: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    shortDescription: {
      type: String,
      maxlength: [300, 'Short description cannot exceed 300 characters'],
    },
    image: {
      type: String,
      required: [true, 'Image is required'],
    },
    images: [{ type: String }],
    pricingType: {
      type: String,
      enum: ['WEIGHT', 'UNIT'],
      required: [true, 'Pricing type is required'],
    },
    prices: {
      type: [PriceSlabSchema],
      required: [true, 'At least one price is required'],
      validate: {
        validator: function (v: PriceSlab[]) {
          return v.length > 0
        },
        message: 'At least one price slab is required',
      },
    },
    origin: { type: String },
    aroma: { type: String },
    texture: { type: String },
    usageTips: { type: String },
    seo: {
      type: SEOSchema,
      required: [true, 'SEO data is required'],
    },
    featured: {
      type: Boolean,
      default: false,
      index: true,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

// Indexes for better query performance
ProductSchema.index({ name: 'text', description: 'text' })
ProductSchema.index({ category: 1, isActive: 1 })
ProductSchema.index({ featured: 1, isActive: 1 })
ProductSchema.index({ createdAt: -1 })

// Virtual for minimum price
ProductSchema.virtual('minPrice').get(function () {
  if (!this.prices || this.prices.length === 0) return 0
  return Math.min(...this.prices.map((p) => p.price))
})

// Virtual for maximum price
ProductSchema.virtual('maxPrice').get(function () {
  if (!this.prices || this.prices.length === 0) return 0
  return Math.max(...this.prices.map((p) => p.price))
})

// Pre-save hook to generate slug if not provided
ProductSchema.pre('save', function (next) {
  if (!this.slug && this.name) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }
  next()
})

const Product: Model<ProductDocument> =
  mongoose.models.Product || mongoose.model<ProductDocument>('Product', ProductSchema)

export default Product

