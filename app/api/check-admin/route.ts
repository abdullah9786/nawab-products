import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db/connection'
import { Admin } from '@/lib/db/models'

// GET /api/check-admin - Check if admin user exists
export async function GET() {
  try {
    await dbConnect()

    const admin = await Admin.findOne({})
    
    if (!admin) {
      return NextResponse.json({
        exists: false,
        message: 'No admin user found! Visit /api/seed to create one.',
      })
    }

    return NextResponse.json({
      exists: true,
      email: admin.email,
      name: admin.name,
      message: 'Admin exists. Try logging in with this email.',
    })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to check admin' },
      { status: 500 }
    )
  }
}

