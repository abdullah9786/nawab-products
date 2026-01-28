/**
 * Seed script to create initial admin user
 * 
 * Run with: npx ts-node --compiler-options '{"module":"commonjs"}' scripts/seed-admin.ts
 * Or add to package.json scripts: "seed:admin": "ts-node scripts/seed-admin.ts"
 */

import mongoose from 'mongoose'
import { Admin } from '../lib/db/models'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/nawab-khana'

async function seedAdmin() {
  try {
    console.log('Connecting to MongoDB...')
    await mongoose.connect(MONGODB_URI)
    console.log('Connected to MongoDB')

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: 'admin@nawabkhana.com' })
    
    if (existingAdmin) {
      console.log('Admin user already exists')
      process.exit(0)
    }

    // Create admin user
    const admin = new Admin({
      email: process.env.ADMIN_EMAIL || 'admin@nawabkhana.com',
      password: process.env.ADMIN_PASSWORD || 'NawabAdmin@2024',
      name: 'Admin',
    })

    await admin.save()
    console.log('Admin user created successfully')
    console.log('Email:', admin.email)
    console.log('Password: (as provided in env or default)')

    process.exit(0)
  } catch (error) {
    console.error('Error seeding admin:', error)
    process.exit(1)
  }
}

seedAdmin()

