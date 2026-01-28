import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import dbConnect from '@/lib/db/connection'
import { Category } from '@/lib/db/models'
import { authOptions } from '@/lib/auth/options'
import { serializeDoc } from '@/lib/utils'

// GET all categories
export async function GET() {
  try {
    await dbConnect()

    const categories = await Category.find({ isActive: true })
      .sort({ displayOrder: 1, name: 1 })
      .lean()

    return NextResponse.json({
      success: true,
      data: serializeDoc(categories),
    })
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch categories' },
      { status: 500 }
    )
  }
}

// Helper to generate slug
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// POST create new category
export async function POST(request: NextRequest) {
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

    // Validate required fields
    if (!body.name) {
      return NextResponse.json(
        { success: false, error: 'Category name is required' },
        { status: 400 }
      )
    }

    // Generate slug from name if not provided
    const slug = body.slug || generateSlug(body.name)

    // Check for duplicate name or slug
    const existingCategory = await Category.findOne({ 
      $or: [{ name: body.name }, { slug }] 
    })
    if (existingCategory) {
      return NextResponse.json(
        { success: false, error: 'A category with this name already exists' },
        { status: 400 }
      )
    }

    // Create category with generated slug
    const category = new Category({
      ...body,
      slug,
    })
    await category.save()

    console.log('✅ Category created:', category.name, '/', category.slug)

    return NextResponse.json({
      success: true,
      data: serializeDoc(category),
      message: 'Category created successfully',
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating category:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create category' },
      { status: 500 }
    )
  }
}

