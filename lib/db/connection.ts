import mongoose from 'mongoose'

if (!process.env.MONGODB_URI) {
  throw new Error(
    'Please define MONGODB_URI in your .env.local file.\n' +
    'Example: MONGODB_URI=mongodb://localhost:27017/nawab-khana\n' +
    'Or use MongoDB Atlas: mongodb+srv://user:pass@cluster.mongodb.net/nawab-khana'
  )
}

const MONGODB_URI: string = process.env.MONGODB_URI

interface MongooseCache {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined
}

const cached: MongooseCache = global.mongoose || {
  conn: null,
  promise: null,
}

if (!global.mongoose) {
  global.mongoose = cached
}

async function dbConnect(): Promise<typeof mongoose> {
  if (cached.conn) {
    console.log('✅ Using existing MongoDB connection')
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
    }

    console.log('🔄 Connecting to MongoDB...')
    console.log('📍 URI:', MONGODB_URI.replace(/\/\/[^:]+:[^@]+@/, '//***:***@')) // Hide credentials in log
    
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('✅ MongoDB connected successfully!')
      console.log('📦 Database:', mongoose.connection.db?.databaseName || 'unknown')
      return mongoose
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    console.error('❌ MongoDB connection failed:', e instanceof Error ? e.message : e)
    throw e
  }

  return cached.conn
}

// Log connection events
mongoose.connection.on('connected', () => {
  console.log('🟢 MongoDB connection established')
})

mongoose.connection.on('error', (err) => {
  console.error('🔴 MongoDB connection error:', err.message)
})

mongoose.connection.on('disconnected', () => {
  console.log('🟡 MongoDB disconnected')
})

export default dbConnect

