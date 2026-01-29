import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import dbConnect from '@/lib/db/connection'
import { Product } from '@/lib/db/models'
import { authOptions } from '@/lib/auth/options'
import { serializeDoc } from '@/lib/utils'

// GET all products
export async function GET(request: NextRequest) {
  try {
    await dbConnect()

    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    const limit = searchParams.get('limit')
    const page = searchParams.get('page') || '1'
    const includeInactive = searchParams.get('includeInactive')

    // Build query - include inactive products if requested (for admin)
    const query: Record<string, unknown> = {}
    
    if (includeInactive !== 'true') {
      query.isActive = true
    }
    
    if (category) {
      query.category = category
    }
    
    if (featured === 'true') {
      query.featured = true
    }

    // Pagination
    const pageNum = parseInt(page)
    const limitNum = limit ? parseInt(limit) : 20
    const skip = (pageNum - 1) * limitNum

    const [products, total] = await Promise.all([
      Product.find(query)
        .sort({ featured: -1, createdAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .lean(),
      Product.countDocuments(query),
    ])

    return NextResponse.json({
      success: true,
      data: serializeDoc(products),
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

// POST create new product
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session) {
      console.log('❌ Product creation failed: Unauthorized')
      return NextResponse.json(
        { success: false, error: 'Unauthorized - Please login to admin dashboard' },
        { status: 401 }
      )
    }

    await dbConnect()

    const body = await request.json()
    console.log('📦 Creating product:', body.name)
    console.log('📦 Product data:', JSON.stringify(body, null, 2))

    // Validate required fields
    const requiredFields = ['name', 'slug', 'category', 'description', 'pricingType', 'prices']
    const missingFields = []
    for (const field of requiredFields) {
      if (!body[field]) {
        missingFields.push(field)
      }
    }

    // Check if category is empty string (no categories available)
    if (!body.category || body.category.trim() === '') {
      missingFields.push('category (please create a category first)')
    }

    // Check if prices array is valid
    if (!body.prices || body.prices.length === 0) {
      missingFields.push('prices (at least one price slab is required)')
    }

    if (missingFields.length > 0) {
      console.log(`❌ Missing fields:`, missingFields)
      return NextResponse.json(
        { success: false, error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      )
    }

    // Validate prices have actual values
    const invalidPrices = body.prices.filter((p: { price: number }) => !p.price || p.price <= 0)
    if (invalidPrices.length > 0) {
      return NextResponse.json(
        { success: false, error: 'All price slabs must have a price greater than 0' },
        { status: 400 }
      )
    }

    // Check for duplicate slug
    const existingProduct = await Product.findOne({ slug: body.slug })
    if (existingProduct) {
      console.log('❌ Duplicate slug:', body.slug)
      return NextResponse.json(
        { success: false, error: 'A product with this slug already exists' },
        { status: 400 }
      )
    }

    // Set default image if not provided
    const defaultImage = 'https://images.unsplash.com/photo-1608797178974-15b35a64ede9?w=800&q=80'

    // Clean up prices - remove custom _id fields so Mongoose can auto-generate valid ObjectIds
    const cleanedPrices = body.prices.map((p: { quantity: number; unit: string; price: number }) => ({
      quantity: p.quantity,
      unit: p.unit,
      price: p.price,
    }))

    // Ensure SEO data exists
    const productData = {
      ...body,
      image: body.image || defaultImage,
      prices: cleanedPrices,
      seo: body.seo || {
        title: `${body.name} | NAWAB KHANA`,
        description: body.description?.slice(0, 160) || '',
      },
    }

    // Create product
    const product = new Product(productData)
    await product.save()

    console.log('✅ Product created:', product.name, '/', product.slug)

    return NextResponse.json({
      success: true,
      data: serializeDoc(product),
      message: 'Product created successfully',
    }, { status: 201 })
  } catch (error) {
    console.error('❌ Error creating product:', error)
    
    // Handle Mongoose validation errors
    if (error instanceof Error && error.name === 'ValidationError') {
      const mongooseError = error as { errors?: Record<string, { message: string }> }
      const messages = Object.values(mongooseError.errors || {}).map(e => e.message)
      return NextResponse.json(
        { success: false, error: `Validation failed: ${messages.join(', ')}` },
        { status: 400 }
      )
    }
    
    // Return actual error message for debugging
    const errorMessage = error instanceof Error ? error.message : 'Failed to create product'
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    )
  }
}

