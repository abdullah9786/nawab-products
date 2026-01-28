import { NextResponse } from 'next/server'
import mongoose from 'mongoose'
import dbConnect from '@/lib/db/connection'
import { Admin } from '@/lib/db/models'

// GET /api/seed - Creates admin user (only works once)
// Visit this URL in browser after setting up MongoDB
export async function GET() {
  console.log('\n🌱 === SEED API CALLED ===')
  
  try {
    console.log('📡 Attempting database connection...')
    await dbConnect()
    
    console.log('✅ Database connected, checking for existing admin...')

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({})
    
    if (existingAdmin) {
      console.log('ℹ️ Admin already exists:', existingAdmin.email)
      return NextResponse.json({
        success: false,
        message: 'Admin user already exists. Login with existing credentials.',
        email: existingAdmin.email,
        dbStatus: 'connected',
        dbName: mongoose.connection.db?.databaseName,
      })
    }

    console.log('🔧 Creating new admin user...')
    console.log('📧 Email:', process.env.ADMIN_EMAIL || 'admin@nawabkhana.com')

    // Create admin user from environment variables
    const admin = new Admin({
      email: process.env.ADMIN_EMAIL || 'admin@nawabkhana.com',
      password: process.env.ADMIN_PASSWORD || 'admin123',
      name: 'Admin',
    })

    await admin.save()
    console.log('✅ Admin user created successfully!')

    return NextResponse.json({
      success: true,
      message: 'Admin user created successfully!',
      email: admin.email,
      hint: 'Now login at /admin/login with your credentials',
      dbStatus: 'connected',
      dbName: mongoose.connection.db?.databaseName,
    })
  } catch (error) {
    console.error('❌ Seed error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to seed admin',
        dbStatus: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
        hint: 'Check your MONGODB_URI in .env.local and make sure your IP is whitelisted in MongoDB Atlas',
      },
      { status: 500 }
    )
  }
}

