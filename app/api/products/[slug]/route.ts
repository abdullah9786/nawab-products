import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import dbConnect from '@/lib/db/connection'
import { Product } from '@/lib/db/models'
import { authOptions } from '@/lib/auth/options'
import { serializeDoc } from '@/lib/utils'

interface RouteParams {
  params: { slug: string }
}

// GET single product by slug
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    await dbConnect()

    // Check if admin is requesting (to fetch inactive products too)
    const { searchParams } = new URL(request.url)
    const includeInactive = searchParams.get('includeInactive') === 'true'

    const query: Record<string, unknown> = { slug: params.slug }
    if (!includeInactive) {
      query.isActive = true
    }

    const product = await Product.findOne(query).lean()

    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: serializeDoc(product),
    })
  } catch (error) {
    console.error('Error fetching product:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch product' },
      { status: 500 }
    )
  }
}

// PUT update product
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    await dbConnect()

    const body = await request.json()

    // Check if product exists
    const existingProduct = await Product.findOne({ slug: params.slug })
    if (!existingProduct) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      )
    }

    // Check for duplicate slug if slug is being changed
    if (body.slug && body.slug !== params.slug) {
      const duplicateSlug = await Product.findOne({ slug: body.slug })
      if (duplicateSlug) {
        return NextResponse.json(
          { success: false, error: 'A product with this slug already exists' },
          { status: 400 }
        )
      }
    }

    // Clean up prices - remove custom _id fields so Mongoose can handle them properly
    let updateData = { ...body, updatedAt: new Date() }
    if (body.prices && Array.isArray(body.prices)) {
      updateData.prices = body.prices.map((p: { quantity: number; unit: string; price: number }) => ({
        quantity: p.quantity,
        unit: p.unit,
        price: p.price,
      }))
    }

    // Update product
    const product = await Product.findOneAndUpdate(
      { slug: params.slug },
      updateData,
      { new: true, runValidators: true }
    ).lean()

    return NextResponse.json({
      success: true,
      data: serializeDoc(product),
      message: 'Product updated successfully',
    })
  } catch (error) {
    console.error('Error updating product:', error)
    
    // Handle Mongoose validation errors
    if (error instanceof Error && error.name === 'ValidationError') {
      const mongooseError = error as { errors?: Record<string, { message: string }> }
      const messages = Object.values(mongooseError.errors || {}).map(e => e.message)
      return NextResponse.json(
        { success: false, error: `Validation failed: ${messages.join(', ')}` },
        { status: 400 }
      )
    }
    
    const errorMessage = error instanceof Error ? error.message : 'Failed to update product'
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    )
  }
}

// DELETE product
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    await dbConnect()

    const product = await Product.findOneAndDelete({ slug: params.slug })

    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Product deleted successfully',
    })
  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete product' },
      { status: 500 }
    )
  }
}

